# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Verify Installation (1 min)

Check that everything is installed:

```bash
cd C:\code\Cypress
node --version      # Should be >= 18.0.0
npm --version       # Should be >= 9.0.0
npx cypress verify  # Should say "Cypress is installed"
```

### Step 2: Run Your First Test (2 min)

#### Option A: Open Cypress Test Runner (Recommended for First Time)

```bash
npm run open
```

This will:
1. Open the Cypress GUI
2. Show all available tests
3. Let you click and run individual tests
4. Show real-time execution in browser

#### Option B: Run Tests Headlessly

```bash
npm test
```

This will:
1. Run all tests in headless mode
2. Generate reports in `cypress/reports/`
3. Save videos in `cypress/videos/`
4. Save screenshots on failures in `cypress/screenshots/`

### Step 3: View Test Results (2 min)

After running tests, check:

```bash
# Open the HTML report
start cypress\reports\html\index.html

# Or view in console output
```

## 📋 Common Commands Cheat Sheet

### Running Tests

```bash
# Interactive mode
npm run open                 # Open Cypress Test Runner
npm run open:chrome          # Open with Chrome
npm run open:firefox         # Open with Firefox
npm run open:edge            # Open with Edge

# Headless mode
npm test                     # Run all tests
npm run test:chrome          # Run in Chrome
npm run test:firefox         # Run in Firefox
npm run test:edge            # Run in Edge

# Specific tests
npm run test:home            # Home page tests only
npm run test:about           # About page tests only
npm run test:leadership      # Leadership page tests only
npm run test:privacy         # Privacy policy tests only
npm run test:integration     # Integration tests
npm run test:security        # Security tests

# Responsive testing
npm run test:mobile          # Mobile viewport (375x667)
npm run test:tablet          # Tablet viewport (768x1024)
npm run test:desktop         # Desktop viewport (1920x1080)
```

### Maintenance

```bash
npm run clean                # Clean all generated files
npm run clean:reports        # Clean only reports
npm run lint                 # Check code quality
npm run lint:fix             # Fix linting issues
```

## 📊 Understanding Test Results

### Test Statuses

- ✅ **Passed**: Test completed successfully
- ❌ **Failed**: Test found an issue
- ⏭️ **Skipped**: Test was not run
- 🔄 **Pending**: Test is not yet implemented

### Where to Find Results

1. **Console Output**: Real-time results in terminal
2. **HTML Reports**: `cypress/reports/html/index.html`
3. **Screenshots**: `cypress/screenshots/` (failures only)
4. **Videos**: `cypress/videos/` (all tests)

## 🎯 Your First Custom Test

Let's create a simple test:

### 1. Create a new test file

```javascript
// cypress/e2e/my-first-test/example.cy.js

describe('My First Test', () => {
  it('visits FYUL.com and checks title', () => {
    cy.visit('https://www.fyul.com')
    cy.title().should('include', 'FYUL')
  })
})
```

### 2. Run it

```bash
npx cypress run --spec "cypress/e2e/my-first-test/example.cy.js"
```

### 3. Watch it pass! ✅

## 📚 Test Organization

The framework includes tests for:

| Test Suite | File Location | What It Tests |
|------------|---------------|---------------|
| Home Page | `cypress/e2e/home/` | Homepage functionality |
| About Page | `cypress/e2e/about/` | About page content |
| Leadership | `cypress/e2e/leadership/` | Leadership page |
| Privacy | `cypress/e2e/privacy/` | Privacy policy page |
| Integration | `cypress/e2e/integration/` | Cross-page flows |
| Security | `cypress/e2e/security/` | Security checks |
| Cross-Browser | `cypress/e2e/cross-browser/` | Browser compatibility |

## 🔍 Debugging Tests

### Method 1: Use Cypress Test Runner

```bash
npm run open
```

Then:
1. Click on a test
2. Watch it run in real browser
3. Use Chrome DevTools
4. Click on commands to see snapshots

### Method 2: Add Debug Points

```javascript
it('my test', () => {
  cy.visit('/')
  cy.pause()  // Test will pause here
  cy.get('.element').click()
})
```

### Method 3: Use cy.debug()

```javascript
it('my test', () => {
  cy.visit('/')
  cy.get('.element').debug()  // Logs element to console
})
```

### Method 4: Screenshots

```javascript
it('my test', () => {
  cy.visit('/')
  cy.screenshot('before-click')
  cy.get('.element').click()
  cy.screenshot('after-click')
})
```

## 🎨 Using Page Objects

The framework uses Page Object Model for maintainability:

```javascript
// Import the page object
import HomePage from '../../pages/HomePage'

describe('Test with Page Object', () => {
  const homePage = new HomePage()

  it('should use page object methods', () => {
    homePage
      .visit()                    // Navigate to page
      .verifyPageLoaded()         // Check page loaded
      .verifyHeroSection()        // Check hero section
      .verifyBrandsSection()      // Check brands section
  })
})
```

## 🛠️ Customization

### Change Base URL

Edit `cypress.config.js`:

```javascript
{
  baseUrl: 'https://staging.fyul.com',  // Change this
}
```

### Change Viewport

```javascript
{
  viewportWidth: 1280,    // Change these
  viewportHeight: 720,
}
```

### Disable Videos

```javascript
{
  video: false,  // Faster execution
}
```

## 📈 Next Steps

1. **Explore Existing Tests**: Check `cypress/e2e/` folder
2. **Read Documentation**: See `README.md` for full details
3. **Write Custom Tests**: Follow patterns in existing tests
4. **Set Up CI/CD**: Use `.github/workflows/cypress.yml`
5. **Customize Reports**: Modify `cypress.config.js` reporter options

## 🆘 Need Help?

- **Troubleshooting**: See `docs/TROUBLESHOOTING.md`
- **Contributing**: See `docs/CONTRIBUTING.md`
- **Test Plan**: See `docs/TEST_PLAN.md`
- **Cypress Docs**: https://docs.cypress.io/

## 📞 Quick Troubleshooting

### Tests failing with timeout?
```bash
# Increase timeout in cypress.config.js
defaultCommandTimeout: 15000
```

### Can't find Cypress binary?
```bash
npx cypress install
```

### Element not found?
```javascript
// Use better waits
cy.get('.element', { timeout: 10000 })
  .should('be.visible')
```

### Browser not launching?
```bash
# Check browsers
npx cypress info

# Try specific browser
npm run test:chrome
```

## ✅ Verification Checklist

Before running tests, ensure:

- [ ] Node.js >= 18.0.0 installed
- [ ] npm dependencies installed (`npm install`)
- [ ] Cypress binary verified (`npx cypress verify`)
- [ ] Internet connection active (for live site testing)
- [ ] Browser installed (Chrome recommended)

## 🎉 Success!

You're ready to start testing! Run your first test:

```bash
npm run open
```

Then click on any test file to watch it run!

---

**Need more help?** Check the full documentation in `README.md`

**Happy Testing! 🚀**
