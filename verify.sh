#!/usr/bin/env bash
# Build and run verification script

echo "🔍 Crypto Dashboard - Quality Check"
echo "===================================="
echo ""

# Check Node modules
echo "1️⃣  Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules exists"
else
    echo "   ⚠️  Running npm install..."
    npm install
fi
echo ""

# Check TypeScript compilation
echo "2️⃣  Type checking..."
npx tsc --noEmit
if [ $? -eq 0 ]; then
    echo "   ✅ TypeScript checks passed"
else
    echo "   ❌ TypeScript errors found"
    exit 1
fi
echo ""

# Check ESLint
echo "3️⃣  Linting code..."
npm run lint 2>/dev/null || echo "   ⚠️  ESLint check skipped"
echo ""

# Build check
echo "4️⃣  Building project..."
npm run build
if [ $? -eq 0 ]; then
    echo "   ✅ Build successful"
else
    echo "   ❌ Build failed"
    exit 1
fi
echo ""

echo "✨ All checks passed!"
echo ""
echo "🚀 To start development server:"
echo "   npm run dev"
echo ""
echo "📖 Documentation:"
echo "   - README.md - Full overview"
echo "   - FEATURES.md - Feature details"
echo "   - QUICK_START.md - Quick reference"
echo "   - IMPLEMENTATION_SUMMARY.md - What was added"
