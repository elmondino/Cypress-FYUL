# 🚀 Quick Reference Guide

## Architecture Understanding - Start Here!

### 📖 Reading Order (Fastest Path to Understanding)

Follow this exact order to understand the framework in ~30 minutes:

```
1. LEARNING_GUIDE.md          ← START HERE (comprehensive guide)
2. ARCHITECTURE.md            ← See the big picture
3. FIXES_SUMMARY.md           ← Understand what was fixed
4. cypress.config.ts          ← Configuration explained
5. cypress/support/e2e.ts     ← Global setup
6. cypress/pages/BasePage.ts  ← Page Object foundation
7. cypress/e2e/about/about.cy.ts ← Simple test example
```

### 🎯 By Goal

**"I want to understand the architecture"**
→ Read [ARCHITECTURE.md](ARCHITECTURE.md) + [LEARNING_GUIDE.md](LEARNING_GUIDE.md)

**"I want to run tests"**
→ Run `npm test` then `npm run report:open`

**"I want to see tests in action"**
→ Run `npm run open`

**"I want to fix GitHub Actions"**
→ Read [FIXES_SUMMARY.md](FIXES_SUMMARY.md)

**"I want to write tests"**
→ Copy [cypress/e2e/about/about.cy.ts](cypress/e2e/about/about.cy.ts) as template

---

## 📊 Reports

### Generate & View Reports

```bash
# Auto-generates after tests
npm test

# Open report
npm run report:open

# Manual generation
npm run report:merge
npm run report:generate
```

**Report Location**: `cypress/reports/html/index.html`

---

## 🎮 Commands

### Running Tests

```bash
npm test                    # All tests, headless
npm run open                # Interactive UI
npm run test:chrome         # Chrome only
npm run test:firefox        # Firefox only
npm run test:about          # About page only
npm run test:mobile         # 375x667 viewport
```

### Reports

```bash
npm run report:open         # Open HTML report
npm run report:merge        # Merge JSON reports
npm run report:generate     # Generate HTML
```

### Maintenance

```bash
npm run clean               # Remove all artifacts
npm run clean:reports       # Remove reports only
npm run lint                # Check code quality
npm run typecheck           # TypeScript validation
```

---

## 🗂️ Key Files

### Configuration
- **cypress.config.ts** - Main config (environments, timeouts, reporters)
- **package.json** - Dependencies & npm scripts
- **tsconfig.json** - TypeScript settings

### Tests
- **cypress/e2e/** - All test files (*.cy.ts)
- **cypress/fixtures/testData.json** - Test data

### Page Objects
- **cypress/pages/BasePage.ts** - Base class
- **cypress/pages/HomePage.ts** - Example page object

### Support
- **cypress/support/e2e.ts** - Global setup
- **cypress/support/commands.ts** - Custom commands
- **cypress/support/intercepts.ts** - Network mocking

### CI/CD
- **.github/workflows/cypress.yml** - GitHub Actions
- **azure-pipelines.yml** - Azure DevOps

### Documentation
- **LEARNING_GUIDE.md** - Complete learning path ⭐
- **ARCHITECTURE.md** - System architecture
- **FIXES_SUMMARY.md** - What was fixed
- **README.md** - Quick start

---

## 🐛 Troubleshooting

### Reports Not Generating?
```bash
# Check support file has import
grep "mochawesome-reporter/register" cypress/support/e2e.ts

# Manually generate
npm run report:merge && npm run report:generate
```

### GitHub Actions Failing?
- Check [FIXES_SUMMARY.md](FIXES_SUMMARY.md)
- Verify workflow has permissions
- Ensure no Cypress Dashboard recording

### Tests Failing?
```bash
# Clean artifacts
npm run clean

# Run with UI to debug
npm run open

# Check console errors in browser DevTools
```

---

## 🏗️ Architecture Layers

```
┌─────────────────────────────────────────┐
│  Tests (.cy.ts)                         │  ← What to test
├─────────────────────────────────────────┤
│  Page Objects (.ts)                     │  ← How to interact
├─────────────────────────────────────────┤
│  Support (commands, intercepts)         │  ← Reusable utilities
├─────────────────────────────────────────┤
│  Fixtures (testData.json)               │  ← Test data
├─────────────────────────────────────────┤
│  Config (cypress.config.ts)             │  ← Configuration
└─────────────────────────────────────────┘
```

---

## 🎓 Learning Path

### Beginner (30 min)
1. Read [LEARNING_GUIDE.md](LEARNING_GUIDE.md)
2. Run `npm run open`
3. Watch tests execute
4. View report: `npm run report:open`

### Intermediate (1 hour)
1. Read [cypress.config.ts](cypress.config.ts) comments
2. Read [BasePage.ts](cypress/pages/BasePage.ts)
3. Modify [about.cy.ts](cypress/e2e/about/about.cy.ts)
4. Add a new test

### Advanced (2+ hours)
1. Create new page object
2. Write custom command
3. Setup network intercepts
4. Integrate Percy visual testing

---

## 📈 What Was Fixed

All issues from your report are now resolved:

✅ Empty reports folder → Reports now generate  
✅ GitHub Actions permission errors → Permissions added  
✅ Artifact warnings → `if-no-files-found` configured  
✅ XML results error → Removed (using HTML reports)  

Details: [FIXES_SUMMARY.md](FIXES_SUMMARY.md)

---

## 💡 Pro Tips

1. **Use the UI** - `npm run open` is better than `npm test` for learning
2. **Read Comments** - Every file has extensive documentation
3. **Hover in VSCode** - TypeScript shows method documentation
4. **Check Reports** - HTML reports show what happened
5. **Use DevTools** - Open browser console in Cypress UI

---

## 🔗 Important Links

- [Cypress Docs](https://docs.cypress.io)
- [Mochawesome Docs](https://github.com/adamgruber/mochawesome)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [GitHub Actions Docs](https://docs.github.com/actions)

---

**Need Help?**

1. Check [LEARNING_GUIDE.md](LEARNING_GUIDE.md) first
2. Read inline comments in code files
3. Review [FIXES_SUMMARY.md](FIXES_SUMMARY.md) for common issues
4. Check [ARCHITECTURE.md](ARCHITECTURE.md) for structure

**Happy Testing! 🎉**
