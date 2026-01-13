# FYUL.com - Enterprise Cypress Testing Framework

[![Cypress Tests](https://img.shields.io/badge/cypress-passing-brightgreen.svg)](https://www.cypress.io/)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Test Reports](#test-reports)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

## 🎯 Overview

This is an **enterprise-grade Cypress testing framework** for comprehensive end-to-end testing of [FYUL.com](https://www.fyul.com). The framework follows industry best practices and implements a robust Page Object Model (POM) architecture.

### Test Coverage

- ✅ **Home Page** - Hero section, brands, navigation
- ✅ **About Page** - Company information
- ✅ **Leadership Page** - Team information
- ✅ **Privacy Policy Page** - Legal content
- ✅ **Cross-browser Testing** - Chrome, Firefox, Edge
- ✅ **Responsive Design** - Mobile, Tablet, Desktop
- ✅ **Accessibility** - WCAG compliance checks
- ✅ **SEO Validation** - Meta tags, titles, descriptions
- ✅ **Performance Testing** - Load times, metrics
- ✅ **Security Testing** - HTTPS, headers, CSP

## ✨ Features

### Architecture
- 🏗️ **Page Object Model (POM)** - Maintainable and reusable code
- 🔧 **Custom Commands** - Extended Cypress functionality
- 📊 **Advanced Reporting** - Mochawesome HTML reports with screenshots
- 🔄 **Retry Logic** - Intelligent test retry mechanisms
- 🎨 **Visual Regression** - Screenshot comparison
- ♿ **Accessibility Testing** - Built-in a11y checks

### Quality Features
- 🔒 **Security Testing** - HTTPS validation, XSS prevention
- 🎯 **SEO Testing** - Meta tags, structured data
- 📱 **Responsive Testing** - Multiple viewport configurations
- 🌐 **Cross-browser Testing** - Chrome, Firefox, Edge support
- ⚡ **Performance Monitoring** - Page load metrics

### Development Experience
- 📝 **TypeScript Ready** - Type-safe test writing
- 🔍 **ESLint Integration** - Code quality enforcement
- 🐳 **Docker Support** - Containerized test execution
- 🚀 **CI/CD Ready** - GitHub Actions, GitLab CI, Azure DevOps
- 📦 **Modular Design** - Easy to extend and maintain

## 📦 Prerequisites

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Git**: Latest version

## 🚀 Installation

### 1. Clone the repository (if applicable)
```bash
git clone <repository-url>
cd Cypress
```

### 2. Install dependencies
```bash
npm install
```

### 3. Verify installation
```bash
npx cypress verify
```

## 📁 Project Structure

```
Cypress/
├── .github/
│   └── workflows/
│       └── cypress.yml          # GitHub Actions CI/CD
├── cypress/
│   ├── e2e/                     # Test specifications
│   │   ├── home/                # Home page tests
│   │   │   └── home.cy.js
│   │   ├── about/               # About page tests
│   │   │   └── about.cy.js
│   │   ├── leadership/          # Leadership page tests
│   │   │   └── leadership.cy.js
│   │   ├── privacy/             # Privacy policy tests
│   │   │   └── privacy-policy.cy.js
│   │   ├── integration/         # Integration tests
│   │   │   └── site-wide.cy.js
│   │   ├── security/            # Security tests
│   │   │   └── security.cy.js
│   │   └── cross-browser/       # Browser compatibility tests
│   │       └── compatibility.cy.js
│   ├── fixtures/                # Test data
│   │   ├── example.json
│   │   └── testData.js
│   ├── pages/                   # Page Object Models
│   │   ├── HomePage.js
│   │   ├── AboutPage.js
│   │   ├── LeadershipPage.js
│   │   └── PrivacyPolicyPage.js
│   ├── support/                 # Support files
│   │   ├── commands/            # Custom commands
│   │   │   ├── navigation.js
│   │   │   ├── assertions.js
│   │   │   └── accessibility.js
│   │   ├── utils/               # Helper utilities
│   │   │   ├── helpers.js
│   │   │   └── logger.js
│   │   ├── commands.js          # Global commands
│   │   └── e2e.js              # Global hooks
│   ├── screenshots/             # Test screenshots (gitignored)
│   ├── videos/                  # Test videos (gitignored)
│   └── reports/                 # Test reports (gitignored)
├── cypress.config.js            # Cypress configuration
├── package.json                 # Dependencies and scripts
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── .gitlab-ci.yml              # GitLab CI/CD
└── azure-pipelines.yml         # Azure DevOps CI/CD
```

## 🧪 Running Tests

### Interactive Mode (Cypress Test Runner)

```bash
# Open Cypress Test Runner
npm run open

# Open with specific browser
npm run open:chrome
npm run open:firefox
npm run open:edge
```

### Headless Mode (CI/Command Line)

```bash
# Run all tests
npm test

# Run tests in specific browser
npm run test:chrome
npm run test:firefox
npm run test:edge

# Run specific test suite
npm run test:home
npm run test:about
npm run test:leadership
npm run test:privacy
npm run test:integration
npm run test:security

# Run tests for specific viewport
npm run test:mobile
npm run test:tablet
npm run test:desktop
```

### Parallel Execution

```bash
# Run tests in parallel (requires Cypress Dashboard)
npm run test:parallel
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
CYPRESS_BASE_URL=https://www.fyul.com
CYPRESS_ENVIRONMENT=production
CYPRESS_RECORD_KEY=your_record_key_here
CYPRESS_DEBUG=false
```

### Cypress Configuration

Edit `cypress.config.js` to customize:

```javascript
{
  baseUrl: 'https://www.fyul.com',
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: true,
  screenshotOnRunFailure: true,
  retries: {
    runMode: 2,
    openMode: 0
  }
}
```

### Test Timeouts

- **defaultCommandTimeout**: 10000ms
- **pageLoadTimeout**: 60000ms
- **requestTimeout**: 10000ms
- **responseTimeout**: 30000ms

## 📊 Test Reports

### Viewing Reports

After running tests, reports are generated in the `cypress/reports/` directory.

```bash
# Generate and view HTML report
npm run report

# Merge JSON reports
npm run report:merge

# Generate HTML from merged JSON
npm run report:generate
```

### Report Location

- **HTML Reports**: `cypress/reports/index.html`
- **JSON Reports**: `cypress/reports/*.json`
- **Screenshots**: `cypress/screenshots/`
- **Videos**: `cypress/videos/`

### CI/CD Reports

Reports are automatically uploaded as artifacts in CI/CD pipelines:
- GitHub Actions: Available in workflow run artifacts
- GitLab CI: Available in job artifacts
- Azure DevOps: Published as pipeline artifacts

## 🔄 CI/CD Integration

### GitHub Actions

The `.github/workflows/cypress.yml` file is pre-configured for:
- Multi-browser testing (Chrome, Firefox, Edge)
- Parallel execution
- Automatic artifact upload
- Scheduled daily runs

### GitLab CI

The `.gitlab-ci.yml` file supports:
- Multi-stage pipeline
- Browser matrix testing
- GitLab Pages for reports
- Caching for faster builds

### Azure DevOps

The `azure-pipelines.yml` file includes:
- Multi-job configuration
- Test result publishing
- Artifact management
- Scheduled triggers

## 🎯 Best Practices

### Writing Tests

1. **Use Page Object Model**: Keep selectors and actions in page objects
2. **Write Descriptive Tests**: Clear test names and assertions
3. **Avoid Hard Waits**: Use Cypress's built-in retry logic
4. **Keep Tests Independent**: Each test should run in isolation
5. **Use Custom Commands**: Reuse common operations

### Example Test

```javascript
import HomePage from '../../pages/HomePage';

describe('Home Page Tests', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it('should display hero section', () => {
    homePage
      .verifyPageLoaded()
      .verifyHeroSection()
      .verifyBrandsSection();
  });
});
```

### Debugging Tests

```bash
# Run with headed browser
npm run test:headed

# Open specific spec in Test Runner
npx cypress open --spec "cypress/e2e/home/home.cy.js"

# Enable debug mode
CYPRESS_DEBUG=true npm test
```

## 🧹 Maintenance

### Clean Up

```bash
# Clean all generated files
npm run clean

# Clean only reports
npm run clean:reports
```

### Update Dependencies

```bash
# Update all dependencies
npm update

# Update Cypress
npm install cypress@latest --save-dev
```

## 🔍 Code Quality

### Linting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix
```

## 📈 Test Metrics

The framework tracks:
- ✅ **Test Pass/Fail Rate**
- ⏱️ **Execution Time**
- 🎯 **Code Coverage** (when configured)
- 📊 **Performance Metrics**
- 🐛 **Flaky Test Detection**

## 🤝 Contributing

1. Create a feature branch
2. Write tests following the established patterns
3. Run linting and tests
4. Submit a pull request

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)

## 📝 License

MIT License - See LICENSE file for details

## 👥 Support

For questions or issues:
- Create an issue in the repository
- Contact the QA team
- Review the Cypress documentation

---

**Built with ❤️ using Cypress**
