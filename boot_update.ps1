# Job Portal Boot Update Script
# This script runs at user logon to process any missed updates

# Wait for system to fully start
Start-Sleep -Seconds 30

# Run the update script with boot flag
& "D:\Personal\Jobs_Applies\job_portal\update_jobs.ps1" -IsBootUpdate
