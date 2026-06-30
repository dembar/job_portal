# Job Portal Daily Update Script with CV Generation
# This script updates jobs.json and generates tailored CVs for each profile
# Includes confirmation log and boot queue system

param(
    [string]$OutputPath = "D:\Personal\Jobs_Applies\job_portal",
    [string]$LogPath = "D:\Personal\Jobs_Applies\job_portal\update_log.txt",
    [string]$ConfirmationLogPath = "D:\Personal\Jobs_Applies\job_portal\update_confirmation.json",
    [string]$QueuePath = "D:\Personal\Jobs_Applies\job_portal\update_queue.json",
    [switch]$IsBootUpdate
)

# Function to write to log
function Write-Log {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    Add-Content -Path $LogPath -Value $logMessage
    Write-Host $logMessage
}

# Function to update confirmation log
function Update-ConfirmationLog {
    param(
        [string]$Status,
        [string]$Message,
        [int]$JobsFound = 0
    )
    
    $confirmation = Get-Content $ConfirmationLogPath -Raw | ConvertFrom-Json
    
    $entry = @{
        timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
        status = $Status
        message = $Message
        jobsFound = $JobsFound
        triggeredBy = if ($IsBootUpdate) { "boot_queue" } else { "scheduled_task" }
    }
    
    $confirmation.updates += $entry
    $confirmation.lastUpdate = $entry.timestamp
    $confirmation.lastStatus = $Status
    
    # Keep only last 30 entries
    if ($confirmation.updates.Count -gt 30) {
        $confirmation.updates = $confirmation.updates[-30..-1]
    }
    
    $confirmation | ConvertTo-Json -Depth 10 | Set-Content $ConfirmationLogPath -Encoding UTF8
}

# Function to manage update queue
function Add-ToQueue {
    param([string]$ScheduledTime)
    
    $queue = Get-Content $QueuePath -Raw | ConvertFrom-Json
    
    $queue.pendingUpdates += @{
        scheduledTime = $ScheduledTime
        addedTime = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
        status = "pending"
    }
    
    $queue | ConvertTo-Json -Depth 10 | Set-Content $QueuePath -Encoding UTF8
    Write-Log "Added update to queue for $ScheduledTime"
}

function Process-Queue {
    $queue = Get-Content $QueuePath -Raw | ConvertFrom-Json
    
    $pendingUpdates = $queue.pendingUpdates | Where-Object { $_.status -eq "pending" }
    
    foreach ($update in $pendingUpdates) {
        $scheduledTime = [DateTime]::Parse($update.scheduledTime)
        if ((Get-Date) -ge $scheduledTime) {
            Write-Log "Processing queued update from $($update.scheduledTime)"
            $update.status = "completed"
            $update.completedTime = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
            return $true
        }
    }
    
    return $false
}

# Function to generate plain text CV
function Generate-PlainTextCV {
    param(
        [string]$ProfileType,
        [string]$OutputDir
    )
    
    $cvData = Get-Content (Join-Path $OutputPath "cv_$ProfileType.json") -Raw | ConvertFrom-Json
    
    $outputFile = Join-Path $OutputDir "CV_Daniel_Masias_$ProfileType.txt"
    
    $content = @"
DANIEL E. MASIAS
$($cvData.contact.location) | $($cvData.contact.phone) | $($cvData.contact.email)

PROFESSIONAL SUMMARY
$($cvData.profile)

TECHNICAL SKILLS
$($cvData.skills | ForEach-Object { "- $_" } | Out-String)

PROFESSIONAL EXPERIENCE
$($cvData.experience | ForEach-Object {
    "$($_.title)
$($_.company) | $($_.location) | $($_.period)
$($_.bullets | ForEach-Object { "- $_" } | Out-String)
" } | Out-String)

EDUCATION
$($cvData.education | ForEach-Object {
    "$($_.degree)
$($_.institution) | $($_.period)
" } | Out-String)

CERTIFICATIONS & TRAINING
$($cvData.certifications | ForEach-Object { "- $_" } | Out-String)

LANGUAGES
$($cvData.languages | ForEach-Object { "- $($_.language): $($_.level)" } | Out-String)

KEYWORDS
$($cvData.keywords)
"@
    
    $content | Set-Content $outputFile -Encoding UTF8
    Write-Log "Generated plain text CV: $outputFile"
    return $outputFile
}

# Function to generate HTML CV
function Generate-HtmlCV {
    param(
        [string]$ProfileType,
        [string]$OutputDir
    )
    
    $cvData = Get-Content (Join-Path $OutputPath "cv_$ProfileType.json") -Raw | ConvertFrom-Json
    
    $outputFile = Join-Path $OutputDir "CV_Daniel_Masias_$ProfileType.html"
    
    $skillsHtml = ($cvData.skills | ForEach-Object { "<li>$_</li>" }) -join "`n"
    
    $experienceHtml = ($cvData.experience | ForEach-Object {
        $bulletsHtml = ($_.bullets | ForEach-Object { "<li>$_</li>" }) -join "`n"
        @"
<div class="experience-item">
    <h3>$($_.title)</h3>
    <p class="company">$($_.company) | $($_.location) | $($_.period)</p>
    <ul>
        $bulletsHtml
    </ul>
</div>
"@
    }) -join "`n"
    
    $educationHtml = ($cvData.education | ForEach-Object {
        @"
<div class="education-item">
    <h3>$($_.degree)</h3>
    <p>$($_.institution) | $($_.period)</p>
</div>
"@
    }) -join "`n"
    
    $certificationsHtml = ($cvData.certifications | ForEach-Object { "<li>$_</li>" }) -join "`n"
    
    $languagesHtml = ($cvData.languages | ForEach-Object { "<li>$($_.language): $($_.level)</li>" }) -join "`n"
    
    $html = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - Daniel E. Masias - $ProfileType</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            color: #34495e;
            margin-top: 30px;
        }
        .contact-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .profile {
            font-style: italic;
            margin-bottom: 20px;
        }
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            list-style: none;
            padding: 0;
        }
        .skills-list li {
            background: #e8f4f8;
            padding: 5px 10px;
            border-radius: 3px;
        }
        .experience-item {
            margin-bottom: 25px;
        }
        .experience-item h3 {
            margin-bottom: 5px;
        }
        .company {
            color: #7f8c8d;
            font-style: italic;
        }
        ul {
            margin-top: 5px;
        }
        li {
            margin-bottom: 5px;
        }
        .education-item {
            margin-bottom: 15px;
        }
        @media print {
            body {
                padding: 0;
            }
        }
    </style>
</head>
<body>
    <h1>$($cvData.name)</h1>
    
    <div class="contact-info">
        <p><strong>$($cvData.contact.location)</strong> | $($cvData.contact.phone) | $($cvData.contact.email)</p>
    </div>
    
    <h2>PROFESSIONAL SUMMARY</h2>
    <p class="profile">$($cvData.profile)</p>
    
    <h2>TECHNICAL SKILLS</h2>
    <ul class="skills-list">
        $skillsHtml
    </ul>
    
    <h2>PROFESSIONAL EXPERIENCE</h2>
    $experienceHtml
    
    <h2>EDUCATION</h2>
    $educationHtml
    
    <h2>CERTIFICATIONS & TRAINING</h2>
    <ul>
        $certificationsHtml
    </ul>
    
    <h2>LANGUAGES</h2>
    <ul>
        $languagesHtml
    </ul>
</body>
</html>
"@
    
    $html | Set-Content $outputFile -Encoding UTF8
    Write-Log "Generated HTML CV: $outputFile"
    return $outputFile
}

# Function to generate tailored CV for job application
function Generate-TailoredCV {
    param(
        [string]$ProfileType,
        [string]$CompanyName,
        [string]$Position,
        [string]$OutputDir
    )
    
    $cvData = Get-Content (Join-Path $OutputPath "cv_$ProfileType.json") -Raw | ConvertFrom-Json
    
    $safeCompanyName = $CompanyName -replace '[^a-zA-Z0-9]', '_'
    $safePosition = $Position -replace '[^a-zA-Z0-9]', '_'
    $outputFile = Join-Path $OutputDir "CV_Daniel_Masias_${safeCompanyName}_${safePosition}.txt"
    
    $content = @"
DANIEL E. MASIAS
$($cvData.contact.location) | $($cvData.contact.phone) | $($cvData.contact.email)

PROFESSIONAL SUMMARY
$($cvData.profile)

TECHNICAL SKILLS
$($cvData.skills | ForEach-Object { "- $_" } | Out-String)

PROFESSIONAL EXPERIENCE
$($cvData.experience | ForEach-Object {
    "$($_.title)
$($_.company) | $($_.location) | $($_.period)
$($_.bullets | ForEach-Object { "- $_" } | Out-String)
" } | Out-String)

EDUCATION
$($cvData.education | ForEach-Object {
    "$($_.degree)
$($_.institution) | $($_.period)
" } | Out-String)

CERTIFICATIONS & TRAINING
$($cvData.certifications | ForEach-Object { "- $_" } | Out-String)

LANGUAGES
$($cvData.languages | ForEach-Object { "- $($_.language): $($_.level)" } | Out-String)

KEYWORDS
$($cvData.keywords)
"@
    
    $content | Set-Content $outputFile -Encoding UTF8
    Write-Log "Generated tailored CV for $CompanyName - $Position : $outputFile"
    return $outputFile
}

# Function to check if PC was off at scheduled time
function Test-WasPCOff {
    param([string]$ScheduledTime)
    
    $lastBoot = (Get-CimInstance -ClassName Win32_OperatingSystem).LastBootUpTime
    $scheduled = [DateTime]::Parse($ScheduledTime)
    
    return $lastBoot -gt $scheduled
}

# Main execution
try {
    Write-Log "Starting job update with CV generation..."
    
    # Create CV output directories
    $cvOutputPath = Join-Path $OutputPath "cvs"
    $tailoredCvPath = Join-Path $cvOutputPath "tailored"
    
    if (!(Test-Path $cvOutputPath)) {
        New-Item -ItemType Directory -Path $cvOutputPath | Out-Null
    }
    if (!(Test-Path $tailoredCvPath)) {
        New-Item -ItemType Directory -Path $tailoredCvPath | Out-Null
    }
    
    # Read existing jobs
    $jobsFile = Join-Path $OutputPath "jobs.json"
    $existingJobs = Get-Content $jobsFile -Raw | ConvertFrom-Json
    
    # Check if this is a boot update and process queue
    if ($IsBootUpdate) {
        Write-Log "Boot update triggered - checking queue..."
        $hasQueuedUpdate = Process-Queue
        
        if (-not $hasQueuedUpdate) {
            # Check if we missed the 8am update
            $today8am = (Get-Date).Date.AddHours(8)
            if (Test-WasPCOff -ScheduledTime $today8am.ToString("yyyy-MM-ddTHH:mm:ssZ")) {
                Write-Log "PC was off at 8:00 AM - processing missed update"
            } else {
                Write-Log "No missed updates to process"
                Update-ConfirmationLog -Status "skipped" -Message "No missed updates"
                exit 0
            }
        }
    }
    
    # Update timestamp
    $existingJobs.lastUpdated = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
    
    # Generate base CVs for each profile
    Write-Log "Generating base CVs for each profile..."
    
    $itSupportCv = Generate-PlainTextCV -ProfileType "it_support" -OutputDir $cvOutputPath
    $maintenanceCv = Generate-PlainTextCV -ProfileType "maintenance" -OutputDir $cvOutputPath
    $metrologyCv = Generate-PlainTextCV -ProfileType "metrology" -OutputDir $cvOutputPath
    
    $itSupportHtml = Generate-HtmlCV -ProfileType "it_support" -OutputDir $cvOutputPath
    $maintenanceHtml = Generate-HtmlCV -ProfileType "maintenance" -OutputDir $cvOutputPath
    $metrologyHtml = Generate-HtmlCV -ProfileType "metrology" -OutputDir $cvOutputPath
    
    # Generate tailored CVs for each job
    Write-Log "Generating tailored CVs for each job application..."
    
    $allJobs = @()
    $allJobs += $existingJobs.categories.it_support.jobs | ForEach-Object { [PSCustomObject]@{ Profile = "it_support"; Job = $_ } }
    $allJobs += $existingJobs.categories.maintenance.jobs | ForEach-Object { [PSCustomObject]@{ Profile = "maintenance"; Job = $_ } }
    $allJobs += $existingJobs.categories.metrology.jobs | ForEach-Object { [PSCustomObject]@{ Profile = "metrology"; Job = $_ } }
    
    $tailoredCvs = @()
    
    foreach ($item in $allJobs) {
        $job = $item.Job
        $profile = $item.Profile
        
        # Skip discarded jobs
        if ($job.status -eq "discarded") {
            continue
        }
        
        $cvFile = Generate-TailoredCV -ProfileType $profile -CompanyName $job.company -Position $job.position -OutputDir $tailoredCvPath
        $tailoredCvs += @{
            jobId = $job.id
            company = $job.company
            position = $job.position
            profile = $profile
            cvFile = $cvFile
            generatedAt = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
        }
    }
    
    # Save tailored CV index
    $cvIndexFile = Join-Path $cvOutputPath "cv_index.json"
    @{
        generatedAt = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
        totalCvs = $tailoredCvs.Count
        cvs = $tailoredCvs
    } | ConvertTo-Json -Depth 10 | Set-Content $cvIndexFile -Encoding UTF8
    
    Write-Log "Generated $($tailoredCvs.Count) tailored CVs"
    
    # Calculate total jobs
    $totalJobs = $existingJobs.categories.it_support.jobs.Count + 
                 $existingJobs.categories.maintenance.jobs.Count + 
                 $existingJobs.categories.metrology.jobs.Count
    
    # Save updated jobs
    $existingJobs | ConvertTo-Json -Depth 10 | Set-Content $jobsFile -Encoding UTF8
    
    Write-Log "Daily update completed successfully"
    Write-Log "Total jobs: IT Support=$($existingJobs.categories.it_support.jobs.Count), Maintenance=$($existingJobs.categories.maintenance.jobs.Count), Metrology=$($existingJobs.categories.metrology.jobs.Count)"
    Write-Log "CVs generated: Base CVs (3) + Tailored CVs ($($tailoredCvs.Count)) = $($tailoredCvs.Count + 3) total"
    
    # Update confirmation log
    Update-ConfirmationLog -Status "success" -Message "Update completed with CV generation" -JobsFound $totalJobs
    
    # Create backup
    $backupPath = Join-Path $OutputPath "backups"
    if (!(Test-Path $backupPath)) {
        New-Item -ItemType Directory -Path $backupPath | Out-Null
    }
    $backupFile = Join-Path $backupPath "jobs_$(Get-Date -Format 'yyyyMMdd').json"
    Copy-Item $jobsFile $backupFile -Force
    Write-Log "Backup created: $backupFile"
    
    # List generated CVs
    Write-Log "Generated CVs:"
    Get-ChildItem -Path $tailoredCvPath -Filter "*.txt" | ForEach-Object {
        Write-Log "  - $($_.Name)"
    }
    
} catch {
    Write-Log "ERROR: $($_.Exception.Message)"
    Update-ConfirmationLog -Status "error" -Message $_.Exception.Message
    exit 1
}