# 📚 Cypress Framework Learning Guide

## Quick Start to Understanding This Project

### 1️⃣ **Start with Configuration** (Foundation)

#### [package.json](package.json)
**Purpose**: Defines all dependencies and available commands  
**Key things to notice**:
- Scripts section shows all available `npm run` commands
- Dependencies show what tools are used (Cypress, TypeScript, Mochawesome)
- `npm run test` - Run all tests headless
- `npm run open` - Open Cypress UI for interactive development

#### [cypress.config.ts](cypress.config.ts)
**Purpose**: Main Cypress configuration  
**Key things to notice**:
- Lines 1-30: Detailed explanation of what this file does
- Lines 60-90: Environment setup (production/staging/development)
- Lines 100-200: Viewport, timeouts, and retry settings
- Lines 300-340: Reporter configuration (Mochawesome for HTML reports)
- Lines 350-400: Node.js plugins and tasks

**Try this**: Change `viewportWidth` to `375` to simulate mobile, run tests to see the difference

---

### 2️⃣ **Understand the Data Layer**

#### [cypress/fixtures/testData.json](cypress/fixtures/testData.json)
**Purpose**: Centralized test data  
**Key concept**: Rather than hardcoding URLs and data in tests, we store them here  
**Benefits**: Change data in ONE place, all tests update automatically

---

### 3️⃣ **Learn the Support Layer** (Reusable Tools)

#### [cypress/support/e2e.ts](cypress/support/e2e.ts)
**Purpose**: Global setup that runs before EVERY test  
**Key things to notice**:
- Lines 1-35: Explains what this file does and when it runs
- Lines 40-60: Imports custom commands
- Lines 80-120: Global beforeEach (clears cookies, sets up intercepts)
- Lines 140-180: Error handling for third-party scripts

#### [cypress/support/commands.ts](cypress/support/commands.ts)
**Purpose**: Custom Cypress commands you can use in tests  
**Available commands**:
- `cy.waitForPageReady()` - Wait for page to fully load
- `cy.getByTestId('id')` - Get element by data-testid attribute
- `cy.checkPerformance()` - Assert page load time
- `cy.validateSEO()` - Check meta tags and SEO elements

#### [cypress/support/intercepts.ts](cypress/support/intercepts.ts)
**Purpose**: Mock/stub network requests  
**Why?**: Prevents third-party analytics/scripts from causing test failures

---

### 4️⃣ **Master the Page Object Pattern**

#### [cypress/pages/BasePage.ts](cypress/pages/BasePage.ts)
**Purpose**: Foundation class that all page objects inherit from  
**Key things to notice**:
- Lines 1-50: Detailed explanation of Page Object Model pattern
- `abstract` keyword means this class is a blueprint, not used directly
- Every method returns `this` for method chaining
- Common methods: `visit()`, `verifyPageLoaded()`, `screenshot()`

**Key Concept - Method Chaining**:
```typescript
// Instead of this:
homePage.visit();
homePage.verifyPageLoaded();
homePage.verifyHero();

// You can do this:
homePage
  .visit()
  .verifyPageLoaded()
  .verifyHero();
```

#### [cypress/pages/HomePage.ts](cypress/pages/HomePage.ts)
**Purpose**: Represents the Home page  
**Pattern**: Extends BasePage, defines page-specific methods  
**Notice**: Selectors are stored as class properties, methods use those selectors

#### [cypress/pages/index.ts](cypress/pages/index.ts)
**Purpose**: Barrel export - lets you import all pages from one place  
**Usage**: `import { HomePage, AboutPage } from '../../pages'`

---

### 5️⃣ **Read the Tests** (See it in Action)

#### [cypress/e2e/about/about.cy.ts](cypress/e2e/about/about.cy.ts) ⭐ **START HERE**
**Purpose**: Simple test example - great for beginners  
**Structure**:
```typescript
describe('About Page', () => {          // Test suite
  const aboutPage = new AboutPage();    // Create page object
  
  beforeEach(() => {                    // Runs before each test
    aboutPage.visit();                  // Navigate to page
  });
  
  it('should load successfully', () => { // Individual test
    aboutPage.verifyPageLoaded();       // Call page method
  });
});
```

#### [cypress/e2e/home/home.cy.ts](cypress/e2e/home/home.cy.ts)
**Purpose**: More complex tests with multiple verifications  
**Notice**: Uses the same pattern but tests more features

#### [cypress/e2e/visual/visual.cy.ts](cypress/e2e/visual/visual.cy.ts)
**Purpose**: Percy visual regression testing  
**Requires**: Percy account and `PERCY_TOKEN` environment variable

---

### 6️⃣ **Understand CI/CD**

#### [.github/workflows/cypress.yml](.github/workflows/cypress.yml)
**Purpose**: Automated testing on GitHub Actions  
**What it does**:
- Runs tests on every push/pull request
- Tests across Chrome, Firefox, and Edge
- Uploads screenshots, videos, and reports as artifacts
- Parallel execution (3 containers per browser)

---

## 🧪 How to Generate Reports

Reports were empty because the Mochawesome reporter needed to be imported and the report merge/generate scripts were missing. **All of this has been fixed!**

### Generate Reports Automatically

1. **Run tests** (reports are generated automatically via `posttest` script):
   ```bash
   npm test
   ```

2. **Check the reports folder**:
   ```
   cypress/reports/
   ├── .jsons/               # Individual test JSON files
   ├── mochawesome.json      # Merged JSON
   └── html/                 # HTML report (open in browser)
       └── index.html        # ⭐ Open this file!
   ```

3. **View the report**:
   ```bash
   npm run report:open
   ```
   Or manually navigate to `cypress/reports/html/index.html` and open it in your browser

### Manual Report Generation (if needed)

```bash
# Merge JSON reports
npm run report:merge

# Generate HTML from merged JSON
npm run report:generate

# Open the report
npm run report:open
```

### What Was Fixed

✅ **1. Added to [cypress/support/e2e.ts](cypress/support/e2e.ts)**:
```typescript
import 'cypress-mochawesome-reporter/register';
```
This registers the Mochawesome reporter so it can capture test results.

✅ **2. Added report scripts to [package.json](package.json)**:
```json
"report:merge": "mochawesome-merge cypress/reports/.jsons/*.json -o cypress/reports/mochawesome.json",
"report:generate": "marge cypress/reports/mochawesome.json -f index -o cypress/reports/html --charts",
"report:open": "start cypress/reports/html/index.html",
"posttest": "npm run report:merge && npm run report:generate"
```
The `posttest` script automatically runs after tests complete, generating the HTML report.

### Report Features

The HTML report includes:
- ✅ Pass/fail statistics with charts
- ✅ Execution time per test
- ✅ Screenshots embedded (on failures)
- ✅ Suite and test details
- ✅ Browser information
- ✅ Shareable single HTML file

---

## 🔧 GitHub Actions Issues - What Was Fixed

### Problems
1. **Permission errors**: "Resource not accessible by integration"
2. **Missing artifacts warnings**: No files found for reports/videos/screenshots

### Solutions Applied

✅ **1. Added proper permissions** ([.github/workflows/cypress.yml](.github/workflows/cypress.yml)):
```yaml
permissions:
  contents: read
  actions: read
  checks: write
```

✅ **2. Removed Cypress Dashboard recording** (requires paid account):
```yaml
# REMOVED: record: true, parallel: true
# These features require a Cypress Dashboard subscription
```

✅ **3. Added `if-no-files-found: ignore`** to artifact uploads:
```yaml
- uses: actions/upload-artifact@v4
  with:
    if-no-files-found: ignore  # Don't fail if no files
```

✅ **4. Removed XML results publishing** (Mochawesome generates HTML/JSON, not XML):
```yaml
# REMOVED: EnricoMi/publish-unit-test-result-action
# This expected JUnit XML format, but we use Mochawesome
```

✅ **5. Made artifacts unique per matrix job**:
```yaml
name: cypress-reports-${{ matrix.browser }}-${{ matrix.containers }}
# Prevents artifact name collisions
```

---

## 🚀 Quick Testing Guide

### Run Tests Locally

```bash
# Install dependencies
npm install

# Run all tests (headless)
npm test

# Open Cypress UI (interactive)
npm run open

# Run specific browser
npm run test:chrome
npm run test:firefox
npm run test:edge

# Run specific test suite
npm run test:home
npm run test:about
npm run test:leadership

# Run with different viewport
npm run test:mobile      # 375x667
npm run test:tablet      # 768x1024
npm run test:desktop     # 1920x1080

# Run against different environment
npm run test:staging     # staging.fyul.com
npm run test:dev         # localhost:3000
```

### View Results

After running tests:

1. **Reports**: `cypress/reports/html/index.html` (open in browser)
2. **Videos**: `cypress/videos/` (MP4 files)
3. **Screenshots**: `cypress/screenshots/` (PNG files, only on failures)

### Clean Up

```bash
# Remove all generated files
npm run clean

# Remove only reports
npm run clean:reports
```

---

## 💡 Pro Tips for Learning

1. **Start Simple**: Run `npm run open`, open the About test, watch it execute step-by-step
2. **Read Code Comments**: Every file has detailed explanations at the top
3. **Experiment**: Change values in `cypress.config.ts` and see what happens
4. **Use TypeScript**: Hover over methods in VSCode to see documentation
5. **Check Console**: Open browser DevTools in Cypress to see console logs
6. **Read Errors**: Cypress errors are VERY descriptive and tell you exactly what's wrong

---

## 📖 Architecture Flow

```
User Request → Test File (.cy.ts)
              ↓
          Page Object (.ts)
              ↓
          BasePage Methods
              ↓
          Custom Commands (support/)
              ↓
          Cypress API
              ↓
          Browser
```

---

## 🎯 Common Questions

**Q: Why use Page Objects?**  
A: Changes to the UI require updating ONE file (page object), not 50 test files.

**Q: Why TypeScript instead of JavaScript?**  
A: Catches errors at compile time, provides autocomplete, makes code self-documenting.

**Q: Why stub network requests?**  
A: Third-party scripts (analytics, ads) can fail and cause flaky tests. We don't test their code.

**Q: What's the difference between `cypress run` and `cypress open`?**  
A: `run` is headless (CI/CD), `open` is interactive (development).

**Q: How do I debug a failing test?**  
A: Use `npm run open`, click the test, watch it run, use `.debug()` or browser DevTools.

---

## 📚 Next Steps

1. ✅ Read [ARCHITECTURE.md](ARCHITECTURE.md) - See the big picture
2. ✅ Run `npm run open` - See Cypress in action
3. ✅ Modify [cypress/e2e/about/about.cy.ts](cypress/e2e/about/about.cy.ts) - Add a new test
4. ✅ Create your own page object
5. ✅ Write a custom command
6. ✅ Push to GitHub and watch the Actions run

---

## 🐛 Troubleshooting

### Reports not generating?
- Check that `import 'cypress-mochawesome-reporter/register'` is in `cypress/support/e2e.ts` ✅
- Verify `reporter: 'cypress-mochawesome-reporter'` is in `cypress.config.ts` ✅

### GitHub Actions failing?
- Check the workflow file has proper permissions ✅
- Ensure `CYPRESS_RECORD_KEY` secret is NOT required (removed recording) ✅
- Verify artifact names are unique per matrix job ✅

### Tests failing locally?
- Run `npm run clean` to remove old artifacts
- Check your internet connection (tests hit fyul.com)
- Verify baseUrl in `cypress.config.ts` is correct
- Check console for JavaScript errors

---

**Happy Testing! 🎉**
