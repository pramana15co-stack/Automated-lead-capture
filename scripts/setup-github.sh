#!/bin/bash

# GitHub Setup Script
# This script helps you push your project to GitHub

echo "🚀 GitHub Setup Script"
echo "======================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
    echo ""
fi

# Check if .env exists and warn
if [ -f ".env" ]; then
    echo "⚠️  WARNING: .env file detected"
    echo "   Make sure .env is in .gitignore (it should be)"
    echo ""
fi

# Check if remote exists
if git remote | grep -q "origin"; then
    echo "ℹ️  Remote 'origin' already exists"
    echo "   Current remote URL:"
    git remote get-url origin
    echo ""
    read -p "Do you want to update it? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter your GitHub repository URL: " repo_url
        git remote set-url origin "$repo_url"
        echo "✅ Remote updated"
    fi
else
    echo "📝 No remote repository configured"
    read -p "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): " repo_url
    git remote add origin "$repo_url"
    echo "✅ Remote added"
    echo ""
fi

# Check current branch
current_branch=$(git branch --show-current)
echo "📍 Current branch: $current_branch"

# Ask to rename to main if needed
if [ "$current_branch" != "main" ] && [ "$current_branch" != "master" ]; then
    read -p "Rename branch to 'main'? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git branch -M main
        echo "✅ Branch renamed to 'main'"
    fi
fi

echo ""
echo "📋 Files to be committed:"
git status --short

echo ""
read -p "Add all files and create initial commit? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add .
    read -p "Enter commit message (or press Enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Initial commit: Lead Capture & Automation System"
    fi
    git commit -m "$commit_msg"
    echo "✅ Files committed"
    echo ""
    
    read -p "Push to GitHub now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        branch=$(git branch --show-current)
        git push -u origin "$branch"
        echo ""
        echo "🎉 Successfully pushed to GitHub!"
        echo ""
        echo "Next steps:"
        echo "1. Go to your GitHub repository"
        echo "2. Set up deployment (see GITHUB_SETUP.md)"
        echo "3. Add environment variables in your hosting platform"
    fi
fi

echo ""
echo "✅ Setup complete!"


