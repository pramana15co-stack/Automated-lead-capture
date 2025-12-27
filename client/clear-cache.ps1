# Clear build cache for Windows PowerShell
Write-Host "Clearing build cache..." -ForegroundColor Yellow

if (Test-Path "build") {
    Remove-Item -Recurse -Force "build"
    Write-Host "✓ Removed build folder" -ForegroundColor Green
}

if (Test-Path ".eslintcache") {
    Remove-Item -Force ".eslintcache"
    Write-Host "✓ Removed .eslintcache" -ForegroundColor Green
}

if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache"
    Write-Host "✓ Removed node_modules cache" -ForegroundColor Green
}

Write-Host "`nCache cleared! Now run: npm run build" -ForegroundColor Cyan



