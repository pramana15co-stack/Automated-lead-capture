#!/bin/bash
# Clear build cache for Mac/Linux

echo "Clearing build cache..."

if [ -d "build" ]; then
    rm -rf build
    echo "✓ Removed build folder"
fi

if [ -f ".eslintcache" ]; then
    rm -f .eslintcache
    echo "✓ Removed .eslintcache"
fi

if [ -d "node_modules/.cache" ]; then
    rm -rf node_modules/.cache
    echo "✓ Removed node_modules cache"
fi

echo ""
echo "Cache cleared! Now run: npm run build"


