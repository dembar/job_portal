#!/bin/bash
# daily_update.sh - Wrapper script for daily job portal update v2
# Creates a venv if needed, installs deps, runs the scraper
#
# Deploy to: /var/www/html/scripts/daily_update.sh
# Cron: 0 8 * * * /var/www/html/scripts/daily_update.sh

set -euo pipefail

# Paths
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PYTHON_SCRIPT="$SCRIPT_DIR/daily_update.py"
VENV_DIR="$SCRIPT_DIR/venv"
VENV_PYTHON="$VENV_DIR/bin/python3"
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

# Create venv if it doesn't exist
if [ ! -f "$VENV_PYTHON" ]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') [INFO] Creating virtual environment..." >> "$LOG_FILE"
    python3 -m venv "$VENV_DIR" 2>> "$LOG_FILE"
    "$VENV_DIR/bin/pip" install --upgrade pip --quiet 2>> "$LOG_FILE"
fi

# Ensure dependencies are installed
"$VENV_PYTHON" -c "import requests; from bs4 import BeautifulSoup; import feedparser" 2>/dev/null || {
    echo "$(date '+%Y-%m-%d %H:%M:%S') [INFO] Installing dependencies into venv..." >> "$LOG_FILE"
    "$VENV_DIR/bin/pip" install --quiet requests beautifulsoup4 feedparser 2>> "$LOG_FILE"
}

# Run the update using the venv python
if "$VENV_PYTHON" "$PYTHON_SCRIPT" "$@" >> "$LOG_FILE" 2>&1; then
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
