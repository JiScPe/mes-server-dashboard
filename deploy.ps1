param(
    [Parameter(Mandatory=$true)]
    [string]$Server
)

# =========================
# CONFIGURATION
# =========================
$ErrorActionPreference = "Stop"

$BuildRoot        = Resolve-Path "."
$StandalonePath   = "$BuildRoot\.next\standalone"
$StaticPath       = "$BuildRoot\.next\static"
$PublicPath       = "$BuildRoot\public"
$ServerListSrc    = "$BuildRoot\dist\lib\utils\server-list.js"
$SshTerminalSrc   = "$BuildRoot\dist\server\ws\ssh-terminal.js"

# Remote paths (on IIS machine)
$IISPath          = "C:\inetpub\wwwroot\sandbox"
$DeployTarget     = "$IISPath\standalone"
$DeployTemp       = "$IISPath\_deploy_tmp"
$DeployBackup     = "$IISPath\_backup_prev"
$RemoteZip        = "$IISPath\deploy.zip"

$LocalZip         = "$BuildRoot\next-deploy.zip"

Write-Host "=== Remote Next.js Standalone Deploy ===" -ForegroundColor Cyan

# =========================
# 1️⃣ CLEAN + BUILD (LOCAL)
# =========================
Write-Host "[1/7] Clean install + build..." -ForegroundColor Yellow

if (Test-Path ".next") { Remove-Item ".next" -Recurse -Force }
if (Test-Path "node_modules") { Remove-Item "node_modules" -Recurse -Force }

npm ci
npm run build

if (!(Test-Path "$StandalonePath\server.js")) {
    throw "Standalone build failed - server.js not found."
}

# =========================
# 2️⃣ PREPARE ARTIFACT (LOCAL)
# =========================
Write-Host "[2/7] Preparing standalone artifact..." -ForegroundColor Yellow

$LocalTemp = "$BuildRoot\_artifact_tmp"
if (Test-Path $LocalTemp) { Remove-Item $LocalTemp -Recurse -Force }
New-Item -ItemType Directory -Path $LocalTemp | Out-Null

robocopy $StandalonePath $LocalTemp /E /NFL /NDL /NJH /NJS /NC /NS

if (Test-Path $StaticPath) {
    robocopy $StaticPath "$LocalTemp\.next\static" /E /NFL /NDL /NJH /NJS /NC /NS
}

if (Test-Path $PublicPath) {
    robocopy $PublicPath "$LocalTemp\public" /E /NFL /NDL /NJH /NJS /NC /NS
}

New-Item -ItemType Directory -Force -Path "$LocalTemp\lib\utils" | Out-Null
Copy-Item $ServerListSrc "$LocalTemp\lib\utils\server-list.js" -Force
Copy-Item $SshTerminalSrc "$LocalTemp\ssh-terminal.js" -Force

Push-Location $LocalTemp
npm prune --production
Pop-Location

# =========================
# 3️⃣ CREATE ZIP (LOCAL)
# =========================
Write-Host "[3/7] Packaging artifact..." -ForegroundColor Yellow

if (Test-Path $LocalZip) { Remove-Item $LocalZip -Force }
Compress-Archive -Path "$LocalTemp\*" -DestinationPath $LocalZip

# =========================
# 4️⃣ CONNECT TO SERVER
# =========================
Write-Host "[4/7] Connecting to remote server..." -ForegroundColor Yellow

$Credential = Get-Credential
$Session = New-PSSession -ComputerName $Server -Credential $Credential

# =========================
# 5️⃣ UPLOAD ARTIFACT
# =========================
Write-Host "[5/7] Uploading artifact..." -ForegroundColor Yellow

Copy-Item $LocalZip -Destination $RemoteZip -ToSession $Session -Force

# =========================
# 6️⃣ REMOTE DEPLOY
# =========================
Write-Host "[6/7] Executing remote deployment..." -ForegroundColor Yellow

Invoke-Command -Session $Session -ScriptBlock {

    param($DeployTarget, $DeployTemp, $DeployBackup, $RemoteZip)

    Write-Host "Stopping app (app_offline)..." -ForegroundColor Cyan
    New-Item "$DeployTarget\app_offline.htm" -ItemType File -Force | Out-Null
    Start-Sleep -Seconds 2

    if (Test-Path $DeployTemp) { Remove-Item $DeployTemp -Recurse -Force }
    New-Item -ItemType Directory -Path $DeployTemp | Out-Null

    Write-Host "Extracting artifact..." -ForegroundColor Cyan
    Expand-Archive $RemoteZip -DestinationPath $DeployTemp -Force

    if (Test-Path $DeployBackup) { Remove-Item $DeployBackup -Recurse -Force }
    if (Test-Path $DeployTarget) {
        Rename-Item $DeployTarget $DeployBackup
    }

    Rename-Item $DeployTemp $DeployTarget

    Remove-Item "$DeployTarget\app_offline.htm" -ErrorAction SilentlyContinue

    Write-Host "Setting permissions..." -ForegroundColor Cyan
    icacls $DeployTarget /grant "IIS_IUSRS:(OI)(CI)RX" /T | Out-Null
    icacls $DeployTarget /grant "IUSR:(OI)(CI)RX" /T | Out-Null

} -ArgumentList $DeployTarget, $DeployTemp, $DeployBackup, $RemoteZip

# =========================
# 7️⃣ FINISH
# =========================
Write-Host "[7/7] Deployment complete!" -ForegroundColor Green
Write-Host "Server: $Server" -ForegroundColor Gray
Write-Host "Path: $DeployTarget" -ForegroundColor Gray

Remove-PSSession $Session