# Architecture Documentation

## Overview

Enterprise Cypress testing framework for FYUL.com using TypeScript, Page Object Model, and modern testing best practices.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Test Execution                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  Chrome  │  │ Firefox  │  │   Edge   │  │  Percy   │            │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘            │
│       └─────────────┴─────────────┴─────────────┘                   │
│                           │                                          │
│                    ┌──────▼──────┐                                  │
│                    │   Cypress   │                                  │
│                    │   Runner    │                                  │
│                    └──────┬──────┘                                  │
└───────────────────────────┼─────────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                        Test Layer                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    cypress/e2e/                              │   │
│  │  ┌────────┐ ┌───────┐ ┌────────────┐ ┌─────────┐ ┌────────┐│   │
│  │  │  home  │ │ about │ │ leadership │ │ privacy │ │ visual ││   │
│  │  └────────┘ └───────┘ └────────────┘ └─────────┘ └────────┘│   │
│  └─────────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                      Page Object Layer                               │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                   cypress/pages/                             │   │
│  │                                                              │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │                    BasePage.ts                        │   │   │
│  │  │  • visit()           • waitForPageReady()            │   │   │
│  │  │  • verifyPageLoaded() • getByTestId()                │   │   │
│  │  │  • screenshot()       • assertVisible()              │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  │                          ▲                                   │   │
│  │         ┌────────────────┼────────────────┐                 │   │
│  │         │                │                │                 │   │
│  │  ┌──────┴─────┐  ┌───────┴──────┐  ┌──────┴─────┐          │   │
│  │  │ HomePage   │  │  AboutPage   │  │ LeaderPage │  ...     │   │
│  │  │ .ts        │  │  .ts         │  │ .ts        │          │   │
│  │  └────────────┘  └──────────────┘  └────────────┘          │   │
│  └─────────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                      Support Layer                                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                  cypress/support/                            │   │
│  │                                                              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │   │
│  │  │ commands.ts  │  │ intercepts.ts│  │  visual.ts   │       │   │
│  │  │              │  │              │  │              │       │   │
│  │  │ • waitFor    │  │ • setupDef   │  │ • visual     │       │   │
│  │  │   PageReady  │  │   aults()    │  │   Snapshot   │       │   │
│  │  │ • getByTest  │  │ • mockApi()  │  │ • responsive │       │   │
│  │  │   Id         │  │ • simulate   │  │   Snapshot   │       │   │
│  │  │ • checkPerf  │  │   Network()  │  │              │       │   │
│  │  │ • validateSEO│  │              │  │              │       │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘       │   │
│  │                                                              │   │
│  │  ┌──────────────┐                                           │   │
│  │  │   e2e.ts     │  Global setup: clear cookies, intercepts  │   │
│  │  └──────────────┘                                           │   │
│  └─────────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                      Data Layer                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                 cypress/fixtures/                            │   │
│  │                                                              │   │
│  │  ┌──────────────────────────────────────────────────────┐   │   │
│  │  │                  testData.json                        │   │   │
│  │  │  • site config      • brand data                     │   │   │
│  │  │  • page paths       • performance thresholds         │   │   │
│  │  │  • viewport sizes   • navigation links               │   │   │
│  │  └──────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────────┐
│                    Configuration Layer                               │
│                                                                      │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐        │
│  │cypress.config  │  │  tsconfig.json │  │ .eslintrc.json │        │
│  │.ts             │  │                │  │                │        │
│  │                │  │ • strict mode  │  │ • TypeScript   │        │
│  │ • baseUrl      │  │ • path aliases │  │   parser       │        │
│  │ • viewports    │  │ • ES2020       │  │ • Cypress      │        │
│  │ • timeouts     │  │                │  │   rules        │        │
│  │ • retries      │  │                │  │                │        │
│  │ • reporters    │  │                │  │                │        │
│  │ • environments │  │                │  │                │        │
│  └────────────────┘  └────────────────┘  └────────────────┘        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         CI/CD Layer                                  │
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  GitHub Actions  │  │   GitLab CI      │  │  Azure Pipelines │  │
│  │                  │  │                  │  │                  │  │
│  │ • Multi-browser  │  │ • Multi-browser  │  │ • Multi-browser  │  │
│  │ • Parallel tests │  │ • Artifacts      │  │ • Artifacts      │  │
│  │ • Percy visual   │  │ • Reports        │  │ • Reports        │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## File Structure

```
Cypress/
├── cypress.config.ts        # Cypress configuration with environment support
├── tsconfig.json            # TypeScript strict mode configuration
├── .eslintrc.json           # ESLint with TypeScript + Cypress rules
├── package.json             # Dependencies and npm scripts
├── README.md                # Quick start guide
│
├── .github/workflows/
│   └── cypress.yml          # GitHub Actions multi-browser CI
├── .gitlab-ci.yml           # GitLab CI pipeline
├── azure-pipelines.yml      # Azure DevOps pipeline
│
└── cypress/
    ├── e2e/                  # Test specifications
    │   ├── home/             # Home page tests
    │   ├── about/            # About page tests
    │   ├── leadership/       # Leadership page tests
    │   ├── privacy/          # Privacy policy tests
    │   ├── cross-browser/    # Responsive/viewport tests
    │   └── visual/           # Percy visual regression tests
    │
    ├── pages/                # Page Object Model classes
    │   ├── index.ts          # Barrel export
    │   ├── BasePage.ts       # Abstract base class
    │   ├── HomePage.ts       # Home page object
    │   ├── AboutPage.ts      # About page object
    │   ├── LeadershipPage.ts # Leadership page object
    │   └── PrivacyPolicyPage.ts
    │
    ├── support/              # Cypress support files
    │   ├── e2e.ts            # Global test setup
    │   ├── commands.ts       # Custom Cypress commands
    │   ├── commands.d.ts     # TypeScript definitions
    │   ├── intercepts.ts     # Network mocking utilities
    │   ├── visual.ts         # Percy integration
    │   └── mochawesome.d.ts  # Reporter types
    │
    └── fixtures/
        └── testData.json     # Centralized test data
```

## Key Design Patterns

### 1. Page Object Model (POM)

All page objects extend `BasePage` which provides:
- `visit()` - Navigate to page
- `waitForPageReady()` - Wait for DOM ready
- `verifyPageLoaded()` - Verify URL and title
- `getByTestId()` - Preferred selector method

```typescript
// Usage
const homePage = new HomePage();
homePage.visit().verifyPageLoaded().verifyHeroSection();
```

### 2. Method Chaining (Fluent Interface)

All page methods return `this` for readable test code:

```typescript
homePage
  .visit()
  .verifyHeroSection()
  .verifyNavigation()
  .verifyFooter();
```

### 3. Network Intercepts

Analytics and third-party scripts are stubbed by default for test reliability:

```typescript
// Automatically applied in e2e.ts beforeEach
cy.setupIntercepts();
```

### 4. Data-Driven Testing

Test data centralized in `fixtures/testData.json`:

```typescript
import testData from '../../fixtures/testData.json';
homePage.verifyBrandLinks(testData.brands);
```

## Environment Configuration

```typescript
// cypress.config.ts supports:
// - production (default): https://www.fyul.com
// - staging: https://staging.fyul.com  
// - development: http://localhost:3000

npm run test:staging    # Run against staging
npm run test:dev        # Run against localhost
```

## Custom Commands

| Command | Purpose |
|---------|---------|
| `cy.waitForPageReady()` | Wait for document.readyState === 'complete' |
| `cy.getByTestId(id)` | Get element by data-testid attribute |
| `cy.checkPerformance()` | Assert page load metrics |
| `cy.validateSEO()` | Check meta tags, title, h1 |
| `cy.injectAxe()` + `cy.checkA11y()` | Accessibility testing |
| `cy.visualSnapshot(name)` | Percy screenshot |
| `cy.setupIntercepts()` | Stub analytics/third-party |

## Test Categories

| Category | Location | Purpose |
|----------|----------|---------|
| Functional | `e2e/home/`, `about/`, etc. | Page functionality |
| Responsive | `e2e/cross-browser/` | Viewport testing |
| Visual | `e2e/visual/` | Percy regression |
| Accessibility | Within functional tests | WCAG compliance |
| Performance | Within functional tests | Load time metrics |
| SEO | Within functional tests | Meta tag validation |

## CI/CD Integration

All three CI platforms configured for:
- Multi-browser execution (Chrome, Firefox, Edge)
- Artifact collection (screenshots, videos)
- TypeScript compilation
- Parallel test execution support

## npm Scripts

```bash
# Run tests
npm test                 # All tests, headless
npm run open             # Cypress UI
npm run test:chrome      # Chrome only
npm run test:firefox     # Firefox only

# By page
npm run test:home        # Home page tests
npm run test:about       # About page tests

# By viewport  
npm run test:mobile      # 375x667
npm run test:tablet      # 768x1024
npm run test:desktop     # 1920x1080

# Visual regression
npm run percy            # Run with Percy

# Quality
npm run typecheck        # TypeScript validation
npm run lint             # ESLint check
npm run clean            # Remove artifacts
```

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Cypress | 15.x | Test framework |
| TypeScript | 5.x | Type safety |
| Percy | 1.x | Visual regression |
| cypress-axe | 1.x | Accessibility |
| Mochawesome | 7.x | HTML reports |
| ESLint | 8.x | Code quality |
