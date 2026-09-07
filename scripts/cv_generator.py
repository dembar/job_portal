#!/usr/bin/env python3
"""
CV generator - Python port of the old Windows-only update_jobs.ps1 CV logic,
so the Raspberry Pi (Linux, no PowerShell) can produce the same plain-text,
HTML, and per-job tailored CVs as part of the daily update.

Usage (standalone):
    python3 cv_generator.py

Normally called from daily_update.py after jobs.json is refreshed.
"""

import json
import re
from datetime import datetime, timezone
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_DIR = SCRIPT_DIR.parent
CV_OUTPUT_DIR = PROJECT_DIR / "cvs"
TAILORED_CV_DIR = CV_OUTPUT_DIR / "tailored"

PROFILES = ("it_support", "maintenance", "metrology")


def _load_cv_data(profile: str) -> dict:
    path = PROJECT_DIR / f"cv_{profile}.json"
    # utf-8-sig tolerates a BOM (PowerShell-written files have one); no-op otherwise.
    with open(path, "r", encoding="utf-8-sig") as f:
        return json.load(f)


def _render_plain_text(cv_data: dict) -> str:
    skills = "\n".join(f"- {s}" for s in cv_data["skills"])

    experience_blocks = []
    for exp in cv_data["experience"]:
        bullets = "\n".join(f"- {b}" for b in exp["bullets"])
        experience_blocks.append(
            f"{exp['title']}\n{exp['company']} | {exp['location']} | {exp['period']}\n{bullets}\n"
        )
    experience = "\n".join(experience_blocks)

    education_blocks = []
    for edu in cv_data["education"]:
        education_blocks.append(f"{edu['degree']}\n{edu['institution']} | {edu['period']}\n")
    education = "\n".join(education_blocks)

    certifications = "\n".join(f"- {c}" for c in cv_data["certifications"])
    languages = "\n".join(f"- {l['language']}: {l['level']}" for l in cv_data["languages"])

    return f"""DANIEL E. MASIAS
{cv_data['contact']['location']} | {cv_data['contact']['phone']} | {cv_data['contact']['email']}

PROFESSIONAL SUMMARY
{cv_data['profile']}

TECHNICAL SKILLS
{skills}

PROFESSIONAL EXPERIENCE
{experience}

EDUCATION
{education}

CERTIFICATIONS & TRAINING
{certifications}

LANGUAGES
{languages}

KEYWORDS
{cv_data['keywords']}
"""


def _render_html(cv_data: dict, profile_type: str) -> str:
    skills_html = "\n".join(f"<li>{s}</li>" for s in cv_data["skills"])

    experience_html = "\n".join(
        f"""<div class="experience-item">
    <h3>{exp['title']}</h3>
    <p class="company">{exp['company']} | {exp['location']} | {exp['period']}</p>
    <ul>
        {''.join(f'<li>{b}</li>' for b in exp['bullets'])}
    </ul>
</div>"""
        for exp in cv_data["experience"]
    )

    education_html = "\n".join(
        f"""<div class="education-item">
    <h3>{edu['degree']}</h3>
    <p>{edu['institution']} | {edu['period']}</p>
</div>"""
        for edu in cv_data["education"]
    )

    certifications_html = "\n".join(f"<li>{c}</li>" for c in cv_data["certifications"])
    languages_html = "\n".join(f"<li>{l['language']}: {l['level']}</li>" for l in cv_data["languages"])

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - Daniel E. Masias - {profile_type}</title>
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }}
        h1 {{ color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }}
        h2 {{ color: #34495e; margin-top: 30px; }}
        .contact-info {{ background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; }}
        .profile {{ font-style: italic; margin-bottom: 20px; }}
        .skills-list {{ display: flex; flex-wrap: wrap; gap: 10px; list-style: none; padding: 0; }}
        .skills-list li {{ background: #e8f4f8; padding: 5px 10px; border-radius: 3px; }}
        .experience-item {{ margin-bottom: 25px; }}
        .experience-item h3 {{ margin-bottom: 5px; }}
        .company {{ color: #7f8c8d; font-style: italic; }}
        ul {{ margin-top: 5px; }}
        li {{ margin-bottom: 5px; }}
        .education-item {{ margin-bottom: 15px; }}
        @media print {{ body {{ padding: 0; }} }}
    </style>
</head>
<body>
    <h1>{cv_data['name']}</h1>

    <div class="contact-info">
        <p><strong>{cv_data['contact']['location']}</strong> | {cv_data['contact']['phone']} | {cv_data['contact']['email']}</p>
    </div>

    <h2>PROFESSIONAL SUMMARY</h2>
    <p class="profile">{cv_data['profile']}</p>

    <h2>TECHNICAL SKILLS</h2>
    <ul class="skills-list">
        {skills_html}
    </ul>

    <h2>PROFESSIONAL EXPERIENCE</h2>
    {experience_html}

    <h2>EDUCATION</h2>
    {education_html}

    <h2>CERTIFICATIONS & TRAINING</h2>
    <ul>
        {certifications_html}
    </ul>

    <h2>LANGUAGES</h2>
    <ul>
        {languages_html}
    </ul>
</body>
</html>
"""


def _safe_filename_part(text: str) -> str:
    return re.sub(r"[^a-zA-Z0-9]", "_", text)


def generate_all(jobs_data: dict, app_log: dict, log=None) -> dict:
    """Generate base CVs (per profile) + tailored CVs (per non-discarded job).

    Returns the cv_index dict that gets written to cvs/cv_index.json.
    """
    def _log(msg):
        if log:
            log.info(msg)

    CV_OUTPUT_DIR.mkdir(exist_ok=True)
    TAILORED_CV_DIR.mkdir(exist_ok=True)

    for profile in PROFILES:
        cv_data = _load_cv_data(profile)

        txt_path = CV_OUTPUT_DIR / f"CV_Daniel_Masias_{profile}.txt"
        txt_path.write_text(_render_plain_text(cv_data), encoding="utf-8")
        _log(f"Generated plain text CV: {txt_path}")

        html_path = CV_OUTPUT_DIR / f"CV_Daniel_Masias_{profile}.html"
        html_path.write_text(_render_html(cv_data, profile), encoding="utf-8")
        _log(f"Generated HTML CV: {html_path}")

    tailored_cvs = []
    for category, cat_data in jobs_data.get("categories", {}).items():
        profile = category if category in PROFILES else "it_support"
        cv_data = _load_cv_data(profile)

        for job in cat_data.get("jobs", []):
            job_id = job.get("id", "")
            status = app_log.get(job_id, {}).get("status", "")
            if status == "discarded":
                continue

            company = job.get("company", "Unknown")
            position = job.get("position", "Unknown")
            filename = f"CV_Daniel_Masias_{_safe_filename_part(company)}_{_safe_filename_part(position)}.txt"
            out_path = TAILORED_CV_DIR / filename
            out_path.write_text(_render_plain_text(cv_data), encoding="utf-8")
            _log(f"Generated tailored CV for {company} - {position} : {out_path}")

            tailored_cvs.append({
                "jobId": job_id,
                "company": company,
                "position": position,
                "profile": profile,
                "cvFile": str(out_path),
                "generatedAt": datetime.now(timezone.utc).isoformat(),
            })

    cv_index = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "totalCvs": len(tailored_cvs),
        "cvs": tailored_cvs,
    }
    with open(CV_OUTPUT_DIR / "cv_index.json", "w", encoding="utf-8") as f:
        json.dump(cv_index, f, indent=2, ensure_ascii=False)

    _log(f"Generated {len(tailored_cvs)} tailored CVs")
    return cv_index


if __name__ == "__main__":
    jobs_path = PROJECT_DIR / "jobs.json"
    app_log_path = PROJECT_DIR / "application_log.json"

    with open(jobs_path, "r", encoding="utf-8-sig") as f:
        jobs_data = json.load(f)

    try:
        with open(app_log_path, "r", encoding="utf-8-sig") as f:
            app_log = json.load(f).get("applications", {})
    except (FileNotFoundError, json.JSONDecodeError):
        app_log = {}

    index = generate_all(jobs_data, app_log)
    print(f"Generated {index['totalCvs']} tailored CVs + {len(PROFILES)} base CVs (txt+html).")
