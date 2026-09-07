#!/usr/bin/env python3
"""
Job Portal local web server.

Serves the static dashboard (index.html, app.js, styles.css, jobs.json, cvs/...)
AND exposes POST /api/status so the browser can persist application status
changes (applied / interview / rejected / discarded / notes) to
application_log.json on disk.

Without this, status marked in the dashboard only lives in the browser's
localStorage and daily_update.py (which reads application_log.json to skip
jobs you've already applied to or discarded) never sees it.

Usage:
    python3 server.py [--host 0.0.0.0] [--port 8080]

Stdlib only - no dependencies required.
"""

import argparse
import json
import threading
from datetime import datetime, timezone
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

PROJECT_DIR = Path(__file__).parent.parent.resolve()
APP_LOG_FILE = PROJECT_DIR / "application_log.json"
_LOCK = threading.Lock()

ALLOWED_STATUSES = {"not_applied", "applied", "interview", "rejected", "discarded"}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_DIR), **kwargs)

    def end_headers(self):
        # Local network only tool - harmless to allow same-device/other-tab callers.
        self.send_header("Access-Control-Allow-Origin", "*")
        # Always revalidate: app.js/index.html/jobs.json change via git pull / cron,
        # and a stale cached copy is a confusing way to "lose" a fix.
        self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()

    def log_message(self, fmt, *args):
        # Default logging goes to stderr, which systemd/journald captures fine.
        super().log_message(fmt, *args)

    def do_POST(self):
        if self.path == "/api/status":
            self._handle_status_update()
        else:
            self.send_error(404, "Not found")

    def _handle_status_update(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            if length <= 0 or length > 20000:
                self.send_error(400, "Invalid content length")
                return
            body = self.rfile.read(length)
            payload = json.loads(body)

            job_id = payload.get("jobId")
            if not job_id or not isinstance(job_id, str):
                self.send_error(400, "Missing jobId")
                return

            status = payload.get("status")
            if status is not None and status not in ALLOWED_STATUSES:
                self.send_error(400, f"Invalid status: {status}")
                return

            notes = payload.get("notes")
            now = datetime.now(timezone.utc).isoformat()

            with _LOCK:
                data = self._load_log()
                applications = data.setdefault("applications", {})
                entry = applications.get(job_id, {})
                if status is not None:
                    entry["status"] = status
                if notes is not None:
                    entry["notes"] = str(notes)[:5000]
                entry["updatedAt"] = now
                applications[job_id] = entry
                data["lastUpdated"] = now
                self._save_log(data)

            self._send_json(200, {"ok": True, "application": entry})
        except json.JSONDecodeError:
            self.send_error(400, "Invalid JSON")
        except Exception as e:
            self.send_error(500, str(e))

    def _load_log(self):
        try:
            # utf-8-sig tolerates a BOM (files ever touched by PowerShell have one).
            with open(APP_LOG_FILE, "r", encoding="utf-8-sig") as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return {"applications": {}, "lastUpdated": None}

    def _save_log(self, data):
        tmp = APP_LOG_FILE.with_suffix(".json.tmp")
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        tmp.replace(APP_LOG_FILE)

    def _send_json(self, status_code, obj):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main():
    parser = argparse.ArgumentParser(description="Job Portal static + status API server")
    parser.add_argument("--host", default="0.0.0.0", help="Bind address (default: 0.0.0.0)")
    parser.add_argument("--port", type=int, default=8080, help="Port (default: 8080)")
    args = parser.parse_args()

    server = ThreadingHTTPServer((args.host, args.port), Handler)
    print(f"Job Portal serving {PROJECT_DIR} on http://{args.host}:{args.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down.")


if __name__ == "__main__":
    main()
