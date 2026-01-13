# Troubleshooting Guide

## Common Issues and Solutions

### Installation Issues

#### Issue: Cypress binary not found
```bash
Error: The Cypress binary was not found
```

**Solution:**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
npx cypress install
```

#### Issue: Permission denied during installation
**Solution:**
```bash
# On Linux/Mac
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config

# On Windows (run as Administrator)
npm install --global windows-build-tools
```

### Test Execution Issues

#### Issue: Tests timeout frequently
```
CypressError: Timed out retrying after 10000ms
```

**Solutions:**
1. Increase timeout in `cypress.config.js`:
```javascript
defaultCommandTimeout: 15000,
pageLoadTimeout: 90000
```

2. Use explicit waits:
```javascript
cy.get('.element', { timeout: 20000 })
```

3. Wait for network requests:
```javascript
cy.intercept('GET', '/api/**').as('apiCall')
cy.wait('@apiCall')
```

#### Issue: Element not found
```
CypressError: Timed out retrying: Expected to find element
```

**Solutions:**
1. Verify selector is correct:
```javascript
// Use Cypress Studio or Chrome DevTools to verify selector
cy.get('[data-testid="element"]')
```

2. Wait for element to be visible:
```javascript
cy.get('.element').should('be.visible')
```

3. Check if element is in iframe:
```javascript
cy.get('iframe').then(($iframe) => {
  const $body = $iframe.contents().find('body')
  cy.wrap($body).find('.element')
})
```

#### Issue: Tests are flaky
**Solutions:**
1. Remove hard waits (`cy.wait(5000)`):
```javascript
// Bad
cy.wait(5000)

// Good
cy.get('.element').should('be.visible')
```

2. Use retry logic:
```javascript
cy.get('.element', { timeout: 10000 })
  .should('be.visible')
  .and('contain', 'text')
```

3. Disable animations:
```javascript
cy.visit('/', {
  onBeforeLoad: (win) => {
    win.document.body.style.animation = 'none'
  }
})
```

### Browser Issues

#### Issue: Chrome not launching
**Solution:**
```bash
# Update Chrome
# On Ubuntu
sudo apt-get update
sudo apt-get install google-chrome-stable

# Verify Cypress can detect browsers
npx cypress info
```

#### Issue: Firefox not supported
**Solution:**
```bash
# Install Firefox
# On Ubuntu
sudo apt-get install firefox

# Specify Firefox binary
npx cypress run --browser firefox
```

#### Issue: Headless mode failures
**Solution:**
```bash
# Run in headed mode for debugging
npx cypress run --headed --no-exit

# Or use headed mode in config
{
  "chromeWebSecurity": false,
  "video": false
}
```

### CI/CD Issues

#### Issue: GitHub Actions failing
**Check the following:**
1. Node version matches `package.json` engines
2. Cache is working correctly
3. Secrets are configured (CYPRESS_RECORD_KEY)

**Solution:**
```yaml
# Add debugging
- name: Debug
  run: |
    node --version
    npm --version
    npx cypress info
```

#### Issue: GitLab CI timeout
**Solution:**
```yaml
# Increase timeout in .gitlab-ci.yml
test:chrome:
  timeout: 30 minutes
  script:
    - npx cypress run --browser chrome
```

#### Issue: Azure DevOps parallel execution failing
**Solution:**
```yaml
# Ensure proper job dependencies
- job: FirefoxTests
  dependsOn: []  # Run independently
```

### Performance Issues

#### Issue: Tests running slowly
**Solutions:**
1. Reduce video quality:
```javascript
// cypress.config.js
{
  video: true,
  videoCompression: 32  // Lower number = less compression = faster
}
```

2. Disable videos:
```javascript
{
  video: false
}
```

3. Run specific tests:
```bash
npm run test:home  # Only home page tests
```

4. Use parallel execution:
```bash
npm run test:parallel
```

#### Issue: High memory usage
**Solutions:**
1. Limit browser instances:
```bash
cypress run --browser chrome --config numTestsKeptInMemory=0
```

2. Close browsers between specs:
```javascript
// cypress.config.js
{
  testIsolation: true
}
```

### Reporting Issues

#### Issue: Reports not generating
**Solution:**
```bash
# Ensure reporter is installed
npm install cypress-mochawesome-reporter --save-dev

# Verify config
# cypress.config.js
reporter: 'cypress-mochawesome-reporter'
```

#### Issue: Screenshots not saved
**Solution:**
```javascript
// cypress.config.js
{
  screenshotsFolder: 'cypress/screenshots',
  screenshotOnRunFailure: true
}

// Ensure folder exists
mkdir -p cypress/screenshots
```

### Network Issues

#### Issue: CORS errors
**Solution:**
```javascript
// cypress.config.js
{
  chromeWebSecurity: false
}
```

#### Issue: SSL certificate errors
**Solution:**
```bash
# Ignore SSL errors (use cautiously)
NODE_TLS_REJECT_UNAUTHORIZED=0 npx cypress run
```

#### Issue: External requests failing
**Solution:**
```javascript
// Stub external requests
cy.intercept('GET', 'https://external-api.com/**', {
  statusCode: 200,
  body: { data: 'mocked' }
})
```

### Page Object Issues

#### Issue: Page object methods not working
**Solution:**
```javascript
// Ensure you're returning 'this' for chaining
verifyElement() {
  cy.get('.element').should('be.visible')
  return this  // Enable method chaining
}
```

#### Issue: Import errors
**Solution:**
```javascript
// Use correct import syntax
import HomePage from '../../pages/HomePage'

// Not
import HomePage from '../../pages/HomePage.js'
```

### Selector Issues

#### Issue: Selector changes frequently
**Solutions:**
1. Use data attributes:
```html
<button data-testid="submit-button">Submit</button>
```
```javascript
cy.get('[data-testid="submit-button"]')
```

2. Use semantic selectors:
```javascript
// Bad
cy.get('.btn.btn-primary.btn-lg')

// Good
cy.get('button[type="submit"]')
cy.contains('button', 'Submit')
```

3. Use contains with regex:
```javascript
cy.contains(/submit|send|confirm/i)
```

### Accessibility Testing Issues

#### Issue: a11y checks too strict
**Solution:**
```javascript
// Allow certain errors
cy.checkA11yBasics()  // Our custom basic checks

// Or use specific selectors
cy.get('.specific-section').within(() => {
  cy.checkA11yBasics()
})
```

### Environment-Specific Issues

#### Issue: Different behavior in CI vs local
**Solutions:**
1. Use environment variables:
```javascript
const isCI = Cypress.env('CI')
if (isCI) {
  // CI-specific behavior
}
```

2. Add debugging:
```javascript
cy.log('Environment:', Cypress.env('environment'))
cy.log('Base URL:', Cypress.config('baseUrl'))
```

## Debugging Tips

### Enable Debug Mode
```bash
# Enable Cypress debug logs
DEBUG=cypress:* npx cypress run

# Enable specific modules
DEBUG=cypress:server:* npx cypress run
```

### Use Cypress Studio
```bash
# Enable Cypress Studio in config
{
  experimentalStudio: true
}
```

### Browser DevTools
```javascript
// Pause test for debugging
cy.pause()

// Debug in browser
cy.debug()

// Log to console
cy.then(() => {
  debugger  // Will pause if DevTools open
})
```

### Screenshot Everything
```javascript
// Take screenshots at each step
cy.screenshot('step-1-page-load')
cy.get('.element').screenshot('step-2-element')
```

### Verbose Logging
```javascript
// Add logs throughout test
cy.log('Starting test')
cy.get('.element').then(($el) => {
  cy.log('Element found:', $el.text())
})
```

## Getting Help

### Resources
1. [Cypress Documentation](https://docs.cypress.io/)
2. [Cypress Discord](https://discord.com/invite/cypress)
3. [Stack Overflow](https://stackoverflow.com/questions/tagged/cypress)
4. [GitHub Discussions](https://github.com/cypress-io/cypress/discussions)

### Reporting Bugs
1. Check existing issues
2. Provide minimal reproduction
3. Include Cypress version
4. Include browser and OS info
5. Attach screenshots/videos

### Team Support
- Create issue in repository
- Tag with `help-wanted` or `bug`
- Include error messages and logs
- Describe steps to reproduce

---

**Last Updated**: January 2026
