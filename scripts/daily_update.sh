#!/bin/bash
# daily_update.sh - Wrapper script for daily job portal update v2
# Runs the Python scraper with RSS feeds, Google CSE, and fallback scrapers
#
# Deploy to: /var/www/html/scripts/daily_update.sh
# Cron: 0 8 * * * /var/www/html/scripts/daily_update.sh

set -euo pipefail

# Paths
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PYTHON_SCRIPT="$SCRIPT_DIR/daily_update.py"
LOG_DIR="$PROJECT_DIR/logs"
LOG_FILE="$LOG_DIR/update.log"
LOCK_FILE="/tmp/job_portal_update.lock"

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# Prevent concurrent runs
if [ -f "$LOCK_FILE" ]; then
    pid=$(cat "$LOCK_FILE" 2>/dev/null || echo "")
    if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
        echo "$(date '+%Y-%m-%d %H:%M:%S') [WARNING] Update already running (PID: $pid), skipping." >> "$LOG_FILE"
        exit 0
    fi
    rm -f "$LOCK_FILE"
fi

echo $$ > "$LOCK_FILE"
trap "rm -f $LOCK_FILE" EXIT

echo "$(date '+%Y-%m-%d %H:%M:%S') [INFO] === Daily update v2 started ===" >> "$LOG_FILE"

# Check and install Python dependencies
MISSING_DEPS=""
python3 -c "import requests" 2>/dev/null || MISSING_DEPS="$MISSING_DEPS requests"
python3 -c "from bs4 import BeautifulSoup" 2>/dev/null || MISSING_DEPS="$MISSING_DEPS beautifulsoup4"
python3 -c "import feedparser" 2>/dev/null || MISSING_DEPS="$MISSING_DEPS feedparser"

if [ -n "$MISSING_DEPS" ]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') [INFO] Installing missing packages:$MISSING_DEPS" >> "$LOG_FILE"
    pip3 install --quiet $MISSING_DEPS 2>> "$LOG_FILE"
fi

# Run the update
# Pass all arguments to the Python script (e.g., --dry-run, --source, --verbose)
if python3 "$PYTHON_SCRIPT" "$@" >> "$LOG_FILE" 2>&1; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') [INFO] === Daily update completed successfully ===" >> "$LOG_FILE"
else
    echo "$(date '+%Y-%m-%d %H:%M:%S') [ERROR] === Daily update failed ===" >> "$LOG_FILE"
fi

# Rotate log if > 1MB
if [ -f "$LOG_FILE" ]; then
    FILE_SIZE=$(stat -f%z "$LOG_FILE" 2>/dev/null || stat -c%s "$LOG_FILE" 2>/dev/null || echo "0")
    if [ "$FILE_SIZE" -gt 1048576 ]; then
        mv "$LOG_FILE" "$LOG_FILE.$(date +%Y%m%d%H%M%S)"
        gzip "$LOG_FILE."* 2>/dev/null || true
        echo "$(date '+%Y-%m-%d %H:%M:%S') [INFO] Log rotated" >> "$LOG_FILE"
    fi
fi
