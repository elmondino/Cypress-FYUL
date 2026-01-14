# FYUL.com Cypress Test Framework

Production-ready E2E testing for [fyul.com](https://www.fyul.com)

## Quick Start

```bash
npm install
npm test          # Run all tests
npm run open      # Open Cypress UI
```

## Structure

```
cypress/
├── e2e/                    # Test files
│   ├── home/              
│   ├── about/             
│   ├── leadership/        
│   ├── privacy/           
│   └── cross-browser/     # Responsive tests
├── pages/                  # Page Objects (TypeScript)
│   ├── BasePage.ts        # Abstract base class
│   ├── HomePage.ts        
│   ├── AboutPage.ts       
│   ├── LeadershipPage.ts  
│   └── PrivacyPolicyPage.ts
├── support/
│   ├── commands.ts        # Custom Cypress commands
│   ├── intercepts.ts      # Network mocking
│   └── e2e.ts             # Test setup
└── fixtures/
    └── testData.json      # Test data
```

## Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests headlessly |
| `npm run open` | Open Cypress Test Runner |
| `npm run test:chrome` | Run in Chrome |
| `npm run test:firefox` | Run in Firefox |
| `npm run test:mobile` | Run at mobile viewport |
| `npm run test:tablet` | Run at tablet viewport |
| `npm run typecheck` | Check TypeScript |
| `npm run lint` | Lint code |

## Environments

Run against different environments:

```bash
npm run test:staging    # staging.fyul.com
npm run test:dev        # localhost:3000
npm test                # production (default)
```

## CI/CD

- GitHub Actions: `.github/workflows/cypress.yml`
- GitLab CI: `.gitlab-ci.yml`
- Azure Pipelines: `azure-pipelines.yml`

## Architecture

- **TypeScript** - Type-safe tests and page objects
- **Page Object Model** - `BasePage` abstract class with common methods
- **Network Intercepts** - Stubs analytics/third-party scripts for reliability
- **cypress-axe** - Accessibility testing
- **Mochawesome** - HTML test reports

## Adding Tests

```typescript
import { HomePage } from '../../pages';

describe('My Test', () => {
  const homePage = new HomePage();

  it('should work', () => {
    homePage.visit().verifyPageLoaded();
  });
});
```

## License

MIT
