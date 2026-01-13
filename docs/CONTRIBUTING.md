# Contributing Guide

## Welcome! 👋

Thank you for considering contributing to the FYUL.com Cypress Testing Framework. This document will help you get started.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Writing Tests](#writing-tests)
5. [Code Style](#code-style)
6. [Pull Request Process](#pull-request-process)
7. [Reporting Bugs](#reporting-bugs)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the team
- Show empathy towards others

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git
- Code editor (VS Code recommended)

### Setup

1. **Fork the repository**
```bash
git clone <your-fork-url>
cd Cypress
```

2. **Install dependencies**
```bash
npm install
```

3. **Verify setup**
```bash
npm run lint
npm test
```

4. **Create a branch**
```bash
git checkout -b feature/your-feature-name
```

## Development Workflow

### Branch Naming

- `feature/` - New features or test additions
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation changes

Examples:
- `feature/add-contact-page-tests`
- `fix/login-selector-update`
- `refactor/page-object-cleanup`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature or test
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code formatting
- `refactor`: Code restructuring
- `test`: Test modifications
- `chore`: Build/config changes

**Examples:**
```bash
feat(home): add hero section animation tests
fix(about): update page heading selector
docs(readme): add troubleshooting section
refactor(pages): extract common methods to base page
```

## Writing Tests

### File Organization

```
cypress/
├── e2e/
│   └── [feature]/
│       └── [feature].cy.js
├── pages/
│   └── [Feature]Page.js
└── support/
    └── commands/
        └── [feature].js
```

### Test Structure

```javascript
/**
 * Feature Name E2E Tests
 * 
 * Test Suite: Description of what this tests
 */

import FeaturePage from '../../pages/FeaturePage';

describe('Feature Name - Test Category', () => {
  const featurePage = new FeaturePage();

  beforeEach(() => {
    featurePage.visit();
  });

  it('should do something specific', () => {
    // Arrange
    featurePage.verifyPageLoaded();
    
    // Act
    featurePage.performAction();
    
    // Assert
    featurePage.verifyResult();
  });
});
```

### Page Object Pattern

```javascript
/**
 * Page Object Model for Feature Page
 */
class FeaturePage {
  // Selectors
  elements = {
    heading: () => cy.get('h1'),
    button: () => cy.get('[data-testid="submit"]'),
  };

  // Actions
  visit() {
    cy.visit('/feature');
    cy.waitForPageLoad();
    return this;
  }

  clickButton() {
    this.elements.button().click();
    return this;
  }

  // Assertions
  verifyHeading() {
    this.elements.heading().should('be.visible');
    return this;
  }
}

export default FeaturePage;
```

### Custom Commands

```javascript
/**
 * Custom command for feature-specific action
 * 
 * @param {string} selector - Element selector
 * @param {object} options - Command options
 */
Cypress.Commands.add('customAction', (selector, options = {}) => {
  cy.get(selector)
    .should('be.visible')
    .click(options);
});
```

### Test Guidelines

#### ✅ Do

- Write descriptive test names
- Use Page Object Model
- Add JSDoc comments
- Keep tests independent
- Use proper waits (no `cy.wait(5000)`)
- Clean up after tests
- Test one thing per test
- Use data attributes for selectors

#### ❌ Don't

- Hard-code test data
- Use brittle selectors (`.btn.btn-primary`)
- Create dependencies between tests
- Test implementation details
- Ignore accessibility
- Skip error handling

### Example Test

```javascript
describe('Contact Form', () => {
  const contactPage = new ContactPage();

  beforeEach(() => {
    contactPage.visit();
  });

  it('should submit form with valid data', () => {
    // Arrange
    const testData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    };

    // Act
    contactPage
      .fillName(testData.name)
      .fillEmail(testData.email)
      .fillMessage(testData.message)
      .submitForm();

    // Assert
    contactPage.verifySuccessMessage();
  });

  it('should show validation errors for empty fields', () => {
    // Act
    contactPage.submitForm();

    // Assert
    contactPage
      .verifyNameError()
      .verifyEmailError()
      .verifyMessageError();
  });
});
```

## Code Style

### JavaScript Style Guide

We follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with some modifications.

#### Key Points

1. **Indentation**: 2 spaces
2. **Quotes**: Single quotes for strings
3. **Semicolons**: Always use
4. **Arrow Functions**: Prefer for callbacks
5. **Const/Let**: Use `const` by default

#### Examples

```javascript
// Good
const homePage = new HomePage();
const elements = {
  heading: () => cy.get('h1'),
};

// Bad
var homePage = new HomePage()
const elements = {
  heading: function() { return cy.get("h1") }
}
```

### ESLint

Run linting before committing:

```bash
npm run lint
npm run lint:fix
```

### Prettier (Optional)

Configure in `.prettierrc`:

```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## Pull Request Process

### Before Submitting

1. **Run tests locally**
```bash
npm test
```

2. **Run linting**
```bash
npm run lint
```

3. **Update documentation** if needed

4. **Add/update tests** for your changes

5. **Check test coverage**

### PR Checklist

- [ ] Tests pass locally
- [ ] Code follows style guide
- [ ] Commit messages are clear
- [ ] Documentation updated
- [ ] No merge conflicts
- [ ] PR description is detailed

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] New tests added
- [ ] Manual testing completed

## Screenshots (if applicable)

## Related Issues
Fixes #123
```

### Review Process

1. Submit PR
2. Automated checks run
3. Code review by maintainers
4. Address feedback
5. Approval and merge

### Merge Requirements

- ✅ All CI checks pass
- ✅ At least 1 approval
- ✅ No merge conflicts
- ✅ Documentation updated
- ✅ Tests added/updated

## Reporting Bugs

### Before Reporting

1. Check existing issues
2. Verify it's reproducible
3. Check if it's already fixed

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Actual behavior**
What actually happens

**Screenshots**
If applicable

**Environment:**
- OS: [e.g., Ubuntu 20.04]
- Node: [e.g., 18.0.0]
- Cypress: [e.g., 13.6.0]
- Browser: [e.g., Chrome 120]

**Additional context**
Any other relevant information
```

## Feature Requests

### Template

```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this needed?

**Proposed Solution**
How should it work?

**Alternatives**
Other approaches considered

**Additional Context**
Any other information
```

## Development Tips

### Running Specific Tests

```bash
# Run single spec
npx cypress run --spec "cypress/e2e/home/home.cy.js"

# Run all tests in folder
npx cypress run --spec "cypress/e2e/home/**/*.cy.js"
```

### Debugging

```bash
# Open Cypress Test Runner
npm run open

# Run with debug logs
DEBUG=cypress:* npm test
```

### Using Cypress Studio

1. Enable in config:
```javascript
{
  experimentalStudio: true
}
```

2. Right-click test → "Add Commands to Test"

## Questions?

- Check [Documentation](../README.md)
- Review [Troubleshooting Guide](TROUBLESHOOTING.md)
- Ask in discussions
- Contact maintainers

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Team acknowledgments

Thank you for contributing! 🎉

---

**Last Updated**: January 2026
