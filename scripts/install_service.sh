#!/bin/bash
# install_service.sh - Install and start the job-portal systemd service.
# This runs server.py (static site + /api/status persistence) continuously,
# restarting it on crash or reboot, so the dashboard is always reachable and
# status changes always get saved to application_log.json for daily_update.py
# to read.
#
# Run this once on the Pi, from inside the scripts/ directory:
#   bash install_service.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
UNIT_SRC="$SCRIPT_DIR/job-portal.service"
UNIT_DST="/etc/systemd/system/job-portal.service"
CURRENT_USER="$(whoami)"
PYTHON_BIN="$(command -v python3)"

if [ "$EUID" -ne 0 ]; then
    echo "Re-run with sudo: sudo bash install_service.sh"
    exit 1
fi

echo "Installing job-portal.service for user '$SUDO_USER' at $PROJECT_DIR ..."

sed -e "s#/var/www/html#$PROJECT_DIR#g" \
    -e "s#/usr/bin/python3#$PYTHON_BIN#g" \
    -e "s#User=pi#User=${SUDO_USER:-$CURRENT_USER}#g" \
    "$UNIT_SRC" > "$UNIT_DST"

systemctl daemon-reload
systemctl enable job-portal.service
systemctl restart job-portal.service

echo ""
echo "Done. Check status with:"
echo "  systemctl status job-portal.service"
echo "  journalctl -u job-portal -f"
