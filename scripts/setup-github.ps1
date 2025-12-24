# GitHub Setup Script for Windows PowerShell
# This script helps you push your project to GitHub

Write-Host "🚀 GitHub Setup Script" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
    Write-Host ""
}

# Check if .env exists and warn
if (Test-Path ".env") {
    Write-Host "⚠️  WARNING: .env file detected" -ForegroundColor Yellow
    Write-Host "   Make sure .env is in .gitignore (it should be)" -ForegroundColor Yellow
    Write-Host ""
}

# Check if remote exists
$remoteExists = git remote | Select-String "origin"
if ($remoteExists) {
    Write-Host "ℹ️  Remote 'origin' already exists" -ForegroundColor Cyan
    Write-Host "   Current remote URL:"
    git remote get-url origin
    Write-Host ""
    $update = Read-Host "Do you want to update it? (y/n)"
    if ($update -eq "y" -or $update -eq "Y") {
        $repoUrl = Read-Host "Enter your GitHub repository URL"
        git remote set-url origin $repoUrl
        Write-Host "✅ Remote updated" -ForegroundColor Green
    }
} else {
    Write-Host "📝 No remote repository configured" -ForegroundColor Yellow
    $repoUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git)"
    git remote add origin $repoUrl
    Write-Host "✅ Remote added" -ForegroundColor Green
    Write-Host ""
}

# Check current branch
$currentBranch = git branch --show-current
Write-Host "📍 Current branch: $currentBranch" -ForegroundColor Cyan

# Ask to rename to main if needed
if ($currentBranch -ne "main" -and $currentBranch -ne "master") {
    $rename = Read-Host "Rename branch to 'main'? (y/n)"
    if ($rename -eq "y" -or $rename -eq "Y") {
        git branch -M main
        Write-Host "✅ Branch renamed to 'main'" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "📋 Files to be committed:"
git status --short

Write-Host ""
$addFiles = Read-Host "Add all files and create initial commit? (y/n)"
if ($addFiles -eq "y" -or $addFiles -eq "Y") {
    git add .
    $commitMsg = Read-Host "Enter commit message (or press Enter for default)"
    if ([string]::IsNullOrWhiteSpace($commitMsg)) {
        $commitMsg = "Initial commit: Lead Capture & Automation System"
    }
    git commit -m $commitMsg
    Write-Host "✅ Files committed" -ForegroundColor Green
    Write-Host ""
    
    $push = Read-Host "Push to GitHub now? (y/n)"
    if ($push -eq "y" -or $push -eq "Y") {
        $branch = git branch --show-current
        git push -u origin $branch
        Write-Host ""
        Write-Host "🎉 Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:"
        Write-Host "1. Go to your GitHub repository"
        Write-Host "2. Set up deployment (see GITHUB_SETUP.md)"
        Write-Host "3. Add environment variables in your hosting platform"
    }
}

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green

