# Job Portal Status Checker
# This script checks the status of updates and displays the confirmation log

param(
    [string]$OutputPath = "D:\Personal\Jobs_Applies\job_portal",
    [switch]$ShowLog,
    [switch]$CheckQueue
)

$confirmationLogPath = Join-Path $OutputPath "update_confirmation.json"
$queuePath = Join-Path $OutputPath "update_queue.json"

# Function to display confirmation log
function Show-ConfirmationLog {
    if (Test-Path $confirmationLogPath) {
        $log = Get-Content $confirmationLogPath -Raw | ConvertFrom-Json
        
        Write-Host "`n=== Job Portal Update Status ===" -ForegroundColor Cyan
        Write-Host "Last Update: $($log.lastUpdate)" -ForegroundColor $(if ($log.lastStatus -eq "success") { "Green" } else { "Red" })
        Write-Host "Last Status: $($log.lastStatus)" -ForegroundColor $(if ($log.lastStatus -eq "success") { "Green" } else { "Red" })
        
        if ($log.updates.Count -gt 0) {
            Write-Host "`nRecent Updates:" -ForegroundColor Yellow
            $log.updates | Select-Object -Last 5 | ForEach-Object {
                $statusColor = switch ($_.status) {
                    "success" { "Green" }
                    "error" { "Red" }
                    "skipped" { "Yellow" }
                    default { "White" }
                }
                Write-Host "  $($_.timestamp) - $($_.status) ($($_.triggeredBy))" -ForegroundColor $statusColor
            }
        }
    } else {
        Write-Host "No confirmation log found." -ForegroundColor Red
    }
}

# Function to display queue status
function Show-QueueStatus {
    if (Test-Path $queuePath) {
        $queue = Get-Content $queuePath -Raw | ConvertFrom-Json
        
        Write-Host "`n=== Update Queue ===" -ForegroundColor Cyan
        if ($queue.pendingUpdates.Count -gt 0) {
            Write-Host "Pending Updates:" -ForegroundColor Yellow
            $queue.pendingUpdates | ForEach-Object {
                Write-Host "  Scheduled: $($_.scheduledTime) - Status: $($_.status)" -ForegroundColor White
            }
        } else {
            Write-Host "No pending updates in queue." -ForegroundColor Green
        }
    } else {
        Write-Host "No queue file found." -ForegroundColor Red
    }
}

# Main execution
if ($ShowLog) {
    Show-ConfirmationLog
} elseif ($CheckQueue) {
    Show-QueueStatus
} else {
    Show-ConfirmationLog
    Show-QueueStatus
}
