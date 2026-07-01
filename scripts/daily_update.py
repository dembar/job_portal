#!/usr/bin/env python3
"""
Daily Job Portal Update Script v2
Enhanced with RSS feeds, Google Custom Search API, and modular source architecture.

Usage:
    python3 daily_update.py [--dry-run] [--source google_cse] [--source rss] [--verbose]

Setup:
    1. pip3 install requests beautifulsoup4 feedparser
    2. Edit config.json to add Google API key (optional)
    3. Run: python3 daily_update.py
"""

import json
import os
import sys
import time
import hashlib
import logging
import re
import argparse
from datetime import datetime, timezone, timedelta
from urllib.parse import quote_plus, urljoin, urlencode
from pathlib import Path
from abc import ABC, abstractmethod
from typing import List, Dict, Optional, Set, Tuple
from dataclasses import dataclass, field, asdict

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("ERROR: Missing dependencies. Run:")
    print("  pip3 install requests beautifulsoup4 feedparser")
    sys.exit(1)

try:
    import feedparser
    HAS_FEEDPARSER = True
except ImportError:
    HAS_FEEDPARSER = False
    print("WARNING: feedparser not installed. RSS sources disabled.")
    print("  pip3 install feedparser")

# ============================================================================
# Configuration
# ============================================================================

SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_DIR = SCRIPT_DIR.parent
JOBS_FILE = PROJECT_DIR / "jobs.json"
APP_LOG_FILE = PROJECT_DIR / "application_log.json"
CONFIG_FILE = SCRIPT_DIR / "config.json"
LOG_DIR = PROJECT_DIR / "logs"
LOG_FILE = LOG_DIR / "update.log"
SOURCE_HEALTH_FILE = LOG_DIR / "source_health.json"

USER_AGENT = "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# ============================================================================
# Logging Setup
# ============================================================================

LOG_DIR.mkdir(exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
log = logging.getLogger("daily_update")

# ============================================================================
# Data Classes
# ============================================================================

@dataclass
class Job:
    """Standardized job listing."""
    id: str
    company: str
    position: str
    location: str
    type: str  # "remote" or "kitchener"
    salary: str = "Not listed"
    salaryMin: int = 0
    website: str = ""
    careerPage: str = ""
    applyUrl: str = ""
    description: str = ""
    requirements: List[str] = field(default_factory=list)
    postedDate: str = ""
    verified: bool = False
    score: int = 75
    source: str = ""

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class SourceHealth:
    """Track health/status of each data source."""
    name: str
    total_queries: int = 0
    successful_queries: int = 0
    failed_queries: int = 0
    jobs_found: int = 0
    last_success: str = ""
    last_failure: str = ""
    consecutive_failures: int = 0
    is_disabled: bool = False
    disabled_reason: str = ""

    @property
    def success_rate(self) -> float:
        if self.total_queries == 0:
            return 0.0
        return self.successful_queries / self.total_queries

    def record_success(self, jobs_count: int):
        self.total_queries += 1
        self.successful_queries += 1
        self.jobs_found += jobs_count
        self.last_success = datetime.now(timezone.utc).isoformat()
        self.consecutive_failures = 0

    def record_failure(self, reason: str = ""):
        self.total_queries += 1
        self.failed_queries += 1
        self.last_failure = datetime.now(timezone.utc).isoformat()
        self.consecutive_failures += 1
        if self.consecutive_failures >= 5:
            self.is_disabled = True
            self.disabled_reason = f"Too many consecutive failures: {reason}"

    def to_dict(self) -> dict:
        return asdict(self)


# ============================================================================
# Abstract Source Base Class
# ============================================================================

class JobSource(ABC):
    """Base class for job data sources."""

    def __init__(self, name: str, config: dict, settings: dict):
        self.name = name
        self.config = config
        self.settings = settings
        self.health = SourceHealth(name=name)
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-CA,en;q=0.9",
        })

    @abstractmethod
    def fetch_jobs(self, query: str, category: str) -> List[Job]:
        """Fetch jobs for a given query. Returns list of Job objects."""
        pass

    def is_enabled(self) -> bool:
        return self.config.get("enabled", False)

    def get_daily_limit(self) -> int:
        return self.config.get("daily_limit", 10)

    def fetch_page(self, url: str) -> Optional[str]:
        """Fetch a page with error handling."""
        try:
            delay = self.settings.get("request_delay_seconds", 2)
            time.sleep(delay)
            resp = self.session.get(url, timeout=15, allow_redirects=True)
            resp.raise_for_status()
            return resp.text
        except requests.RequestException as e:
            log.warning(f"[{self.name}] Failed to fetch {url}: {e}")
            return None

    def _generate_id(self, company: str, position: str) -> str:
        key = f"{company.lower().strip()}|{position.lower().strip()}"
        return hashlib.md5(key.encode()).hexdigest()[:12]


# ============================================================================
# Google Custom Search API Source
# ============================================================================

class GoogleCSESource(JobSource):
    """Google Custom Search API for job listings."""

    BASE_URL = "https://www.googleapis.com/customsearch/v1"

    def __init__(self, config: dict, settings: dict):
        super().__init__("google_cse", config, settings)
        self.api_key = config.get("api_key", "")
        self.cx = config.get("cx", "")
        self.queries_today = 0

    def is_enabled(self) -> bool:
        return self.config.get("enabled", False) and bool(self.api_key) and bool(self.cx)

    def fetch_jobs(self, query: str, category: str) -> List[Job]:
        jobs = []
        if not self.is_enabled():
            log.debug(f"[{self.name}] Skipped - not configured")
            return jobs

        if self.queries_today >= self.get_daily_limit():
            log.warning(f"[{self.name}] Daily limit reached ({self.get_daily_limit()})")
            return jobs

        # Build search query with location
        location = self.settings.get("location", "Kitchener, ON, Canada")
        search_query = f"{query} jobs near {location}"

        params = {
            "key": self.api_key,
            "cx": self.cx,
            "q": search_query,
            "num": min(10, self.settings.get("max_results_per_source", 20)),
            "dateRestrict": "w1",  # Last week only
            "hl": "en",
            "gl": "ca",
        }

        log.info(f"[{self.name}] Searching: {search_query}")
        self.queries_today += 1

        try:
            delay = self.settings.get("request_delay_seconds", 2)
            time.sleep(delay)
            resp = self.session.get(self.BASE_URL, params=params, timeout=15)
            resp.raise_for_status()
            data = resp.json()

            for item in data.get("items", []):
                job = self._parse_search_result(item, category)
                if job:
                    jobs.append(job)

            self.health.record_success(len(jobs))
            log.info(f"[{self.name}] Found {len(jobs)} jobs for '{query}'")

        except requests.RequestException as e:
            self.health.record_failure(str(e))
            log.error(f"[{self.name}] API error: {e}")
        except (KeyError, json.JSONDecodeError) as e:
            self.health.record_failure(str(e))
            log.error(f"[{self.name}] Parse error: {e}")

        return jobs

    def _parse_search_result(self, item: dict, category: str) -> Optional[Job]:
        """Parse a Google CSE search result into a Job."""
        try:
            title = item.get("title", "")
            link = item.get("link", "")
            snippet = item.get("snippet", "")

            # Try to extract company and position from title
            # Common formats: "Position at Company | Location" or "Company - Position"
            company = "Unknown"
            position = title

            for separator in [" at ", " - ", " | ", " @ "]:
                if separator in title:
                    parts = title.split(separator, 1)
                    position = parts[0].strip()
                    company = parts[1].strip()
                    break

            # Clean up location from title if present
            for loc_pattern in [", ON", ", Ontario", ", Canada", "Kitchener", "Waterloo", "Remote"]:
                if loc_pattern in company:
                    company = company.split(loc_pattern)[0].strip()

            if not position or position == "Unknown":
                return None

            job_id = self._generate_id(company, position)
            location = self._extract_location_from_snippet(snippet)

            return Job(
                id=job_id,
                company=company,
                position=position,
                location=location,
                type=self._classify_location(location),
                description=snippet[:200] if snippet else f"Position at {company}",
                careerPage=link,
                applyUrl=link,
                website=f"https://{company.lower().replace(' ', '').replace('&', 'and')}.com",
                postedDate=datetime.now().strftime("%Y-%m-%d"),
                source="google_cse",
                score=80,
            )
        except Exception as e:
            log.debug(f"[{self.name}] Error parsing result: {e}")
            return None

    def _extract_location_from_snippet(self, snippet: str) -> str:
        """Try to extract location from search snippet."""
        loc_patterns = [
            r"(Kitchener[\w\s,]*ON[\w\s]*)",
            r"(Waterloo[\w\s,]*ON[\w\s]*)",
            r"(Remote[\w\s,-]*Canada[\w\s]*)",
            r"((?:Kitchener|Waterloo|Cambridge)[\w\s,]*Ontario[\w\s]*)",
        ]
        for pattern in loc_patterns:
            match = re.search(pattern, snippet, re.IGNORECASE)
            if match:
                return match.group(1).strip()[:50]
        return self.settings.get("location", "Kitchener, ON")

    def _classify_location(self, location: str) -> str:
        loc = location.lower()
        if any(w in loc for w in ["remote", "virtual", "anywhere", "work from home"]):
            return "remote"
        return "kitchener"


# ============================================================================
# RSS Feed Source
# ============================================================================

class RSSFeedSource(JobSource):
    """RSS feed aggregator for job listings."""

    # Curated list of RSS feeds for Canadian job boards
    FEED_URLS = {
        "it_support": [
            "https://ca.indeed.com/rss?q=IT+Support&l=Kitchener%2C+ON&sort=date",
            "https://ca.indeed.com/rss?q=Technical+Support&l=Kitchener%2C+ON&sort=date",
            "https://ca.indeed.com/rss?q=Help+Desk&l=Kitchener%2C+ON&sort=date",
            "https://ca.indeed.com/rss?q=IT+Support&l=Waterloo%2C+ON&sort=date",
            "https://ca.indeed.com/rss?q=Technical+Support+remote&l=Canada&sort=date",
        ],
        "maintenance": [
            "https://ca.indeed.com/rss?q=Maintenance+Technician&l=Kitchener%2C+ON&sort=date",
            "https://ca.indeed.com/rss?q=Millwright&l=Kitchener%2C+ON&sort=date",
            "https://ca.indeed.com/rss?q=Automation+Technician&l=Kitchener%2C+ON&sort=date",
            "https://ca.indeed.com/rss?q=Maintenance+Technician&l=Waterloo%2C+ON&sort=date",
        ],
        "metrology": [
            "https://ca.indeed.com/rss?q=Metrology&l=Kitchener%2C+ON&sort=date",
            "https://ca.indeed.com/rss?q=Calibration+Technician&l=Kitchener%2C+ON&sort=date",
            "https://ca.indeed.com/rss?q=Metrology&l=Canada&sort=date",
            "https://ca.indeed.com/rss?q=Quality+Inspection&l=Kitchener%2C+ON&sort=date",
        ],
    }

    def __init__(self, config: dict, settings: dict):
        super().__init__("rss_feeds", config, settings)
        if not HAS_FEEDPARSER:
            self.config["enabled"] = False

    def fetch_jobs(self, query: str, category: str) -> List[Job]:
        """Fetch jobs from RSS feeds for a category."""
        jobs = []
        if not self.is_enabled():
            return jobs

        feeds = self.FEED_URLS.get(category, [])
        for feed_url in feeds:
            feed_jobs = self._parse_feed(feed_url, category)
            jobs.extend(feed_jobs)

        return jobs

    def _parse_feed(self, feed_url: str, category: str) -> List[Job]:
        """Parse a single RSS feed."""
        jobs = []
        log.info(f"[{self.name}] Fetching RSS: {feed_url[:80]}...")

        try:
            delay = self.settings.get("request_delay_seconds", 2)
            time.sleep(delay)

            # Use requests to fetch feed content (better error handling)
            resp = self.session.get(feed_url, timeout=15)
            resp.raise_for_status()

            feed = feedparser.parse(resp.text)

            if feed.bozo and not feed.entries:
                log.warning(f"[{self.name}] Feed parse error: {feed.bozo_exception}")
                return jobs

            for entry in feed.entries[:self.settings.get("max_results_per_source", 20)]:
                job = self._parse_entry(entry, category)
                if job:
                    jobs.append(job)

            self.health.record_success(len(jobs))
            log.info(f"[{self.name}] Found {len(jobs)} jobs from RSS feed")

        except requests.RequestException as e:
            self.health.record_failure(str(e))
            log.warning(f"[{self.name}] Failed to fetch RSS: {e}")
        except Exception as e:
            self.health.record_failure(str(e))
            log.warning(f"[{self.name}] Error parsing RSS: {e}")

        return jobs

    def _parse_entry(self, entry, category: str) -> Optional[Job]:
        """Parse an RSS entry into a Job."""
        try:
            title = entry.get("title", "").strip()
            if not title:
                return None

            # Indeed RSS format: "Position - Company - Location"
            company = "Unknown"
            position = title
            location = self.settings.get("location", "Kitchener, ON")

            # Try different title formats
            for separator in [" - ", " | ", " @ ", " at "]:
                if separator in title:
                    parts = [p.strip() for p in title.split(separator)]
                    if len(parts) >= 2:
                        position = parts[0]
                        company = parts[1]
                        if len(parts) >= 3:
                            location = parts[2]
                    break

            # Get link
            link = entry.get("link", "")

            # Get description
            description = ""
            if "summary" in entry:
                description = BeautifulSoup(entry.summary, "html.parser").get_text(strip=True)[:200]
            elif "description" in entry:
                description = BeautifulSoup(entry.description, "html.parser").get_text(strip=True)[:200]

            # Get published date
            posted_date = ""
            if "published_parsed" in entry and entry.published_parsed:
                try:
                    posted_date = datetime(*entry.published_parsed[:6]).strftime("%Y-%m-%d")
                except:
                    posted_date = datetime.now().strftime("%Y-%m-%d")
            else:
                posted_date = datetime.now().strftime("%Y-%m-%d")

            job_id = self._generate_id(company, position)

            return Job(
                id=job_id,
                company=company,
                position=position,
                location=location,
                type=self._classify_location(location),
                description=description or f"Position at {company} in {location}",
                careerPage=link,
                applyUrl=link,
                website=f"https://{company.lower().replace(' ', '').replace('&', 'and')}.com",
                postedDate=posted_date,
                source="rss",
                score=78,
            )
        except Exception as e:
            log.debug(f"[{self.name}] Error parsing entry: {e}")
            return None

    def _classify_location(self, location: str) -> str:
        loc = location.lower()
        if any(w in loc for w in ["remote", "virtual", "anywhere", "work from home"]):
            return "remote"
        return "kitchener"


# ============================================================================
# Indeed Scraper Source (Fallback)
# ============================================================================

class IndeedSource(JobSource):
    """Direct Indeed.ca scraping (fallback source)."""

    def fetch_jobs(self, query: str, category: str) -> List[Job]:
        jobs = []
        if not self.is_enabled():
            return jobs

        url = f"https://ca.indeed.com/jobs?q={quote_plus(query)}&l=Kitchener%2C+ON&sort=date"
        log.info(f"[{self.name}] Scraping: {query}")

        html = self.fetch_page(url)
        if not html:
            self.health.record_failure("Page fetch failed")
            return jobs

        soup = BeautifulSoup(html, "html.parser")
        for card in soup.select("div.job_seen_beacon, div.jobsearch-SerpJobCard, li div.result"):
            try:
                job = self._parse_card(card)
                if job:
                    jobs.append(job)
            except Exception as e:
                log.debug(f"[{self.name}] Error parsing card: {e}")
                continue

        if jobs:
            self.health.record_success(len(jobs))
        else:
            self.health.record_failure("No jobs parsed (may be blocked)")

        log.info(f"[{self.name}] Found {len(jobs)} jobs for '{query}'")
        return jobs

    def _parse_card(self, card) -> Optional[Job]:
        title_el = card.select_one("h2.jobTitle a, a.jcs-JobTitle, span.jobTitle")
        company_el = card.select_one("span.companyName, span.company")
        location_el = card.select_one("div.companyLocation, span.location")
        salary_el = card.select_one("div.salary-snippet-container, span.estimated-salary")

        if not title_el or not company_el:
            return None

        position = title_el.get_text(strip=True)
        company = company_el.get_text(strip=True)
        location = location_el.get_text(strip=True) if location_el else "Kitchener, ON"
        salary = salary_el.get_text(strip=True) if salary_el else "Not listed"

        link = title_el.get("href", "")
        if link and not link.startswith("http"):
            link = urljoin("https://ca.indeed.com", link)

        job_id = self._generate_id(company, position)

        return Job(
            id=job_id,
            company=company,
            position=position,
            location=location,
            type=self._classify_location(location),
            salary=salary,
            salaryMin=self._extract_salary_min(salary),
            careerPage=link,
            applyUrl=link,
            website=f"https://{company.lower().replace(' ', '')}.com",
            description=f"Position at {company} in {location}",
            postedDate=datetime.now().strftime("%Y-%m-%d"),
            source="indeed",
            score=75,
        )

    def _classify_location(self, location: str) -> str:
        loc = location.lower()
        if any(w in loc for w in ["remote", "virtual", "anywhere", "work from home"]):
            return "remote"
        return "kitchener"

    def _extract_salary_min(self, salary_text: str) -> int:
        if not salary_text or salary_text == "Not listed":
            return 0
        numbers = re.findall(r"\$?([\d,]+)", salary_text)
        if numbers:
            return int(numbers[0].replace(",", ""))
        return 0


# ============================================================================
# LinkedIn Scraper Source (Fallback)
# ============================================================================

class LinkedInSource(JobSource):
    """LinkedIn public job search scraping (fallback source)."""

    def fetch_jobs(self, query: str, category: str) -> List[Job]:
        jobs = []
        if not self.is_enabled():
            return jobs

        url = f"https://www.linkedin.com/jobs/search?keywords={quote_plus(query)}&location=Kitchener%2C+Ontario%2C+Canada&sortBy=DD"
        log.info(f"[{self.name}] Scraping: {query}")

        html = self.fetch_page(url)
        if not html:
            self.health.record_failure("Page fetch failed")
            return jobs

        soup = BeautifulSoup(html, "html.parser")
        for card in soup.select("li.lift-card, div.base-card, li.job-result-card"):
            try:
                job = self._parse_card(card)
                if job:
                    jobs.append(job)
            except Exception as e:
                log.debug(f"[{self.name}] Error parsing card: {e}")
                continue

        if jobs:
            self.health.record_success(len(jobs))
        else:
            self.health.record_failure("No jobs parsed (may be blocked)")

        log.info(f"[{self.name}] Found {len(jobs)} jobs for '{query}'")
        return jobs

    def _parse_card(self, card) -> Optional[Job]:
        title_el = card.select_one("h3.base-search-card__title, h3.job-search-card__title")
        company_el = card.select_one("h4.base-search-card__subtitle, a.hidden-nested-link")
        location_el = card.select_one("span.job-result-card__location, span.job-search-card__location")
        link_el = card.select_one("a.base-card__full-link, a[data-tracking-control-name='public_jobs_jserp-result']")

        if not title_el or not company_el:
            return None

        position = title_el.get_text(strip=True)
        company = company_el.get_text(strip=True)
        location = location_el.get_text(strip=True) if location_el else "Kitchener, ON"
        link = link_el.get("href", "") if link_el else ""

        job_id = self._generate_id(company, position)

        return Job(
            id=job_id,
            company=company,
            position=position,
            location=location,
            type=self._classify_location(location),
            careerPage=link.split("?")[0] if link else "",
            applyUrl=link.split("?")[0] if link else "",
            website=f"https://{company.lower().replace(' ', '')}.com",
            description=f"Position at {company} in {location}",
            postedDate=datetime.now().strftime("%Y-%m-%d"),
            source="linkedin",
            score=75,
        )

    def _classify_location(self, location: str) -> str:
        loc = location.lower()
        if any(w in loc for w in ["remote", "virtual", "anywhere", "work from home"]):
            return "remote"
        return "kitchener"


# ============================================================================
# Glassdoor Scraper Source (Fallback)
# ============================================================================

class GlassdoorSource(JobSource):
    """Glassdoor scraping (fallback source)."""

    def fetch_jobs(self, query: str, category: str) -> List[Job]:
        jobs = []
        if not self.is_enabled():
            return jobs

        url = f"https://www.glassdoor.ca/Job/kitchener-{quote_plus(query.lower().replace(' ', '-'))}-jobs-SRCH_IL.0,9_IC2140477_KO10,30.htm"
        log.info(f"[{self.name}] Scraping: {query}")

        html = self.fetch_page(url)
        if not html:
            self.health.record_failure("Page fetch failed")
            return jobs

        soup = BeautifulSoup(html, "html.parser")
        for card in soup.select("li.JobsList_jobListItem__wjTHv, li[data-test='jobListing']"):
            try:
                job = self._parse_card(card)
                if job:
                    jobs.append(job)
            except Exception as e:
                log.debug(f"[{self.name}] Error parsing card: {e}")
                continue

        if jobs:
            self.health.record_success(len(jobs))
        else:
            self.health.record_failure("No jobs parsed (may be blocked)")

        log.info(f"[{self.name}] Found {len(jobs)} jobs for '{query}'")
        return jobs

    def _parse_card(self, card) -> Optional[Job]:
        title_el = card.select_one("a[data-test='job-title'], a.JobCard_jobTitle__GLyJ1")
        company_el = card.select_one("span.EmployerProfile_compactEmployerName__LE242, a.employer-profile__compact-employer-link")
        location_el = card.select_one("div[data-test='emp-location'], span.JobCard_location__rCz3x")

        if not title_el:
            return None

        position = title_el.get_text(strip=True)
        company = company_el.get_text(strip=True) if company_el else "Unknown"
        location = location_el.get_text(strip=True) if location_el else "Kitchener, ON"
        link = title_el.get("href", "")
        if link and not link.startswith("http"):
            link = urljoin("https://www.glassdoor.ca", link)

        job_id = self._generate_id(company, position)

        return Job(
            id=job_id,
            company=company,
            position=position,
            location=location,
            type=self._classify_location(location),
            careerPage=link,
            applyUrl=link,
            website=f"https://{company.lower().replace(' ', '')}.com",
            description=f"Position at {company} in {location}",
            postedDate=datetime.now().strftime("%Y-%m-%d"),
            source="glassdoor",
            score=75,
        )

    def _classify_location(self, location: str) -> str:
        loc = location.lower()
        if any(w in loc for w in ["remote", "virtual", "anywhere", "work from home"]):
            return "remote"
        return "kitchener"


# ============================================================================
# Helper Functions
# ============================================================================

def load_json(filepath: Path) -> dict:
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def save_json(filepath: Path, data: dict):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)


def load_application_log() -> dict:
    data = load_json(APP_LOG_FILE)
    return data.get("applications", {})


def should_skip_job(job_id: str, app_log: dict) -> bool:
    if job_id in app_log:
        status = app_log[job_id].get("status", "")
        if status in ("discarded", "rejected", "applied", "interview"):
            return True
    return False


def get_existing_job_ids(jobs_data: dict) -> Tuple[Set[str], Set[str]]:
    ids = set()
    combos = set()
    for cat_data in jobs_data.get("categories", {}).values():
        for job in cat_data.get("jobs", []):
            ids.add(job.get("id", ""))
            combo = f"{job.get('company', '').lower()}|{job.get('position', '').lower()}"
            combos.add(combo)
    return ids, combos


def is_relevant_job(job: Job, category: str) -> bool:
    position = job.position.lower()
    category_keywords = {
        "it_support": ["support", "help desk", "technical support", "it support", "service desk", "desktop", "sysadmin", "system administrator"],
        "maintenance": ["maintenance", "millwright", "technician", "mechanical", "electrical", "automation", "plc", "industrial"],
        "metrology": ["metrology", "calibration", "measurement", "quality", "inspection", "cmm", "dimensional", "gd&t"],
    }
    keywords = category_keywords.get(category, [])
    return any(kw in position for kw in keywords)


def load_source_health() -> Dict[str, SourceHealth]:
    data = load_json(SOURCE_HEALTH_FILE)
    health_map = {}
    for name, hdata in data.items():
        h = SourceHealth(name=name)
        for k, v in hdata.items():
            if hasattr(h, k):
                setattr(h, k, v)
        health_map[name] = h
    return health_map


def save_source_health(health_map: Dict[str, SourceHealth]):
    data = {name: h.to_dict() for name, h in health_map.items()}
    save_json(SOURCE_HEALTH_FILE, data)


# ============================================================================
# Main Update Routine
# ============================================================================

def run_update(dry_run: bool = False, specific_source: str = None, verbose: bool = False):
    if verbose:
        log.setLevel(logging.DEBUG)

    log.info("=" * 60)
    log.info("Starting daily job update v2")
    log.info(f"Mode: {'DRY RUN' if dry_run else 'LIVE'}")
    if specific_source:
        log.info(f"Source filter: {specific_source}")
    log.info("=" * 60)

    # Load config
    config = load_json(CONFIG_FILE)
    if not config:
        log.error(f"Config file not found: {CONFIG_FILE}")
        log.info("Using default configuration")
        config = {"sources": {}, "search_queries": {}, "settings": {}}

    sources_config = config.get("sources", {})
    search_queries = config.get("search_queries", {})
    settings = config.get("settings", {})

    # Initialize sources
    source_classes = {
        "google_cse": GoogleCSESource,
        "rss_feeds": RSSFeedSource,
        "indeed": IndeedSource,
        "linkedin": LinkedInSource,
        "glassdoor": GlassdoorSource,
    }

    sources = []
    for name, cls in source_classes.items():
        src_config = sources_config.get(name, {"enabled": False})
        if specific_source and name != specific_source:
            continue
        source = cls(src_config, settings)
        if source.is_enabled():
            sources.append(source)
            log.info(f"Source enabled: {name}")
        else:
            log.info(f"Source disabled: {name}")

    if not sources:
        log.error("No sources enabled! Edit config.json to enable at least one source.")
        return 0

    # Load existing data
    jobs_data = load_json(JOBS_FILE)
    if not jobs_data:
        jobs_data = {"lastUpdated": "", "categories": {}}
        for cat in ["it_support", "maintenance", "metrology"]:
            jobs_data["categories"][cat] = {"name": "", "icon": "", "jobs": []}

    existing_ids, existing_combos = get_existing_job_ids(jobs_data)
    app_log = load_application_log()

    log.info(f"Existing jobs: {len(existing_ids)}")
    log.info(f"Applications tracked: {len(app_log)}")

    new_jobs_added = 0
    skipped_existing = 0
    skipped_applied = 0
    source_stats = {}

    for category, queries in search_queries.items():
        log.info(f"\n--- Processing category: {category} ---")
        cat_data = jobs_data["categories"].get(category, {"name": category, "icon": "", "jobs": []})
        cat_jobs = cat_data.get("jobs", [])

        for source in sources:
            source_name = source.name
            if source_name not in source_stats:
                source_stats[source_name] = {"found": 0, "added": 0}

            for query in queries:
                try:
                    scraped_jobs = source.fetch_jobs(query, category)
                    source_stats[source_name]["found"] += len(scraped_jobs)

                    for job in scraped_jobs:
                        if not is_relevant_job(job, category):
                            continue

                        combo = f"{job.company.lower()}|{job.position.lower()}"
                        if job.id in existing_ids or combo in existing_combos:
                            skipped_existing += 1
                            continue

                        if should_skip_job(job.id, app_log):
                            skipped_applied += 1
                            log.info(f"Skipping (applied/discarded): {job.company} - {job.position}")
                            continue

                        cat_jobs.append(job)
                        existing_ids.add(job.id)
                        existing_combos.add(combo)
                        new_jobs_added += 1
                        source_stats[source_name]["added"] += 1
                        log.info(f"NEW: {job.company} - {job.position} [{source_name}]")

                except Exception as e:
                    log.error(f"[{source_name}] Error processing query '{query}': {e}")
                    continue

        cat_data["jobs"] = cat_jobs
        jobs_data["categories"][category] = cat_data

    # Update timestamp
    jobs_data["lastUpdated"] = datetime.now(timezone.utc).isoformat()

    # Save
    if not dry_run:
        save_json(JOBS_FILE, jobs_data)
        save_source_health({s.name: s.health for s in sources})
        log.info(f"\nSaved updated jobs.json and source health")
    else:
        log.info(f"\n[DRY RUN] Would save jobs.json")

    # Summary
    log.info("\n" + "=" * 60)
    log.info("UPDATE SUMMARY")
    log.info(f"  New jobs added:      {new_jobs_added}")
    log.info(f"  Skipped (existing):  {skipped_existing}")
    log.info(f"  Skipped (applied):   {skipped_applied}")
    log.info(f"  Total jobs now:      {sum(len(c.get('jobs', [])) for c in jobs_data['categories'].values())}")
    log.info("\nSOURCE STATS:")
    for name, stats in source_stats.items():
        log.info(f"  {name}: {stats['found']} found, {stats['added']} added")
    log.info("\nSOURCE HEALTH:")
    for source in sources:
        h = source.health
        status = "OK" if not h.is_disabled else f"DISABLED: {h.disabled_reason}"
        log.info(f"  {h.name}: {h.successful_queries}/{h.total_queries} queries, "
                 f"{h.jobs_found} jobs, {status}")
    log.info("=" * 60)

    return new_jobs_added


# ============================================================================
# CLI Entry Point
# ============================================================================

def main():
    parser = argparse.ArgumentParser(
        description="Daily Job Portal Update Script v2",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 daily_update.py                    # Run all enabled sources
  python3 daily_update.py --dry-run          # Preview without saving
  python3 daily_update.py --source rss_feeds # Only use RSS feeds
  python3 daily_update.py --source google_cse --verbose  # Debug Google API
  python3 daily_update.py --reset-health     # Reset source health tracking
        """
    )
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without saving")
    parser.add_argument("--source", choices=["google_cse", "rss_feeds", "indeed", "linkedin", "glassdoor"],
                        help="Run only a specific source")
    parser.add_argument("--verbose", "-v", action="store_true", help="Enable debug logging")
    parser.add_argument("--reset-health", action="store_true", help="Reset source health tracking")

    args = parser.parse_args()

    if args.reset_health:
        save_source_health({})
        print("Source health tracking reset.")
        return

    try:
        added = run_update(
            dry_run=args.dry_run,
            specific_source=args.source,
            verbose=args.verbose,
        )
        sys.exit(0 if added >= 0 else 1)
    except Exception as e:
        log.error(f"Update failed: {e}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
