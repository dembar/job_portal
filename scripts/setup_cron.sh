#!/bin/bash
# setup_cron.sh - Install the daily update cron job and verify setup
# Run this once on the Pi to set up the 8:00 AM daily schedule

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DAILY_UPDATE="$SCRIPT_DIR/daily_update.sh"
CONFIG_FILE="$SCRIPT_DIR/config.json"
LOG_DIR="$PROJECT_DIR/logs"

echo "=========================================="
echo "  Job Portal Daily Update - Setup"
echo "=========================================="
echo ""

# Make scripts executable
chmod +x "$DAILY_UPDATE"
chmod +x "$SCRIPT_DIR/daily_update.py"

# Check Python
echo "Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: python3 not found. Install with:"
    echo "  sudo apt install python3 python3-pip"
    exit 1
fi
echo "  Python3: $(python3 --version)"

# Install dependencies
echo ""
echo "Installing Python dependencies..."
pip3 install --quiet requests beautifulsoup4 feedparser 2>/dev/null || {
    echo "  Trying with --user flag..."
    pip3 install --quiet --user requests beautifulsoup4 feedparser
}

# Verify dependencies
echo "Verifying dependencies..."
python3 -c "import requests; from bs4 import BeautifulSoup; import feedparser" 2>/dev/null && {
    echo "  All dependencies OK"
} || {
    echo "  WARNING: Some dependencies may be missing"
}

# Check config
echo ""
if [ -f "$CONFIG_FILE" ]; then
    echo "Config file found: $CONFIG_FILE"
    
    # Check if Google CSE is configured
    if python3 -c "
import json
with open('$CONFIG_FILE') as f:
    c = json.load(f)
    g = c.get('sources', {}).get('google_cse', {})
    if g.get('enabled') and g.get('api_key') and g.get('cx'):
        print('  Google Custom Search API: CONFIGURED')
    else:
        print('  Google Custom Search API: NOT CONFIGURED (optional)')
        print('  To enable: Edit config.json and add your API key and CX')
        print('  Get API key: https://console.cloud.google.com/apis/credentials')
        print('  Create CX:   https://cse.google.com/cse/all')
" 2>/dev/null; then
        true
    fi
else
    echo "WARNING: Config file not found at $CONFIG_FILE"
fi

# Ensure log directory
mkdir -p "$LOG_DIR"

# Test run (dry run)
echo ""
echo "Running dry-run test..."
if python3 "$SCRIPT_DIR/daily_update.py" --dry-run --source rss_feeds 2>/dev/null; then
    echo "  Dry-run test: PASSED"
else
    echo "  Dry-run test: FAILED (check logs)"
fi

# Install cron job
echo ""
CRON_LINE="0 8 * * * $DAILY_UPDATE"
if crontab -l 2>/dev/null | grep -qF "$DAILY_UPDATE"; then
    echo "Cron job already installed:"
    crontab -l | grep "$DAILY_UPDATE"
else
    (crontab -l 2>/dev/null; echo "$CRON_LINE") | crontab -
    echo "Cron job installed successfully!"
fi

echo ""
echo "=========================================="
echo "  Setup Complete!"
echo "=========================================="
echo ""
echo "Schedule: Every day at 8:00 AM"
echo "Script:   $DAILY_UPDATE"
echo "Log:      $LOG_DIR/update.log"
echo "Config:   $CONFIG_FILE"
echo ""
echo "Manual commands:"
echo "  Run now:        bash $DAILY_UPDATE"
echo "  Dry run:        bash $DAILY_UPDATE --dry-run"
echo "  RSS only:       bash $DAILY_UPDATE --source rss_feeds"
echo "  Google only:    bash $DAILY_UPDATE --source google_cse"
echo "  Verbose:        bash $DAILY_UPDATE --verbose"
echo "  View log:       tail -f $LOG_DIR/update.log"
echo "  Check cron:     crontab -l"
echo ""
