/// <reference types="cypress" />
/// <reference path="./commands.d.ts" />

/**
 * Custom Cypress Commands
 * Clean, reliable implementations following best practices
 */

// =====================
// Page Load Commands
// =====================

/**
 * Wait for page to be fully loaded and ready for interaction
 * Uses document.readyState instead of arbitrary waits
 */
Cypress.Commands.add('waitForPageReady', () => {
  cy.document().its('readyState').should('eq', 'complete');
  cy.get('body').should('be.visible');
});

// =====================
// Selector Commands
// =====================

/**
 * Get element by data-testid attribute
 * Preferred selector strategy for test stability
 */
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// =====================
// Network Commands
// =====================

/**
 * Wait for a network request with proper timeout handling
 */
Cypress.Commands.add('waitForRequest', (alias: string, timeout = 10000) => {
  return cy.wait(`@${alias}`, { timeout });
});

// =====================
// Performance Commands
// =====================

/**
 * Check page performance metrics using Performance API
 */
Cypress.Commands.add('checkPerformance', (thresholds = {}) => {
  const defaults = {
    maxLoadTime: 5000,
    maxDomContentLoaded: 3000,
    maxFirstPaint: 2000,
  };

  const limits = { ...defaults, ...thresholds };

  cy.window().then((win) => {
    const performance = win.performance;
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.startTime;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.startTime;

      cy.log(`Load Time: ${loadTime.toFixed(0)}ms`);
      cy.log(`DOM Content Loaded: ${domContentLoaded.toFixed(0)}ms`);

      expect(loadTime, 'Page load time').to.be.lessThan(limits.maxLoadTime);
      expect(domContentLoaded, 'DOM Content Loaded').to.be.lessThan(limits.maxDomContentLoaded);
    }

    // Check First Paint if available
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find((entry) => entry.name === 'first-paint');
    
    if (firstPaint) {
      cy.log(`First Paint: ${firstPaint.startTime.toFixed(0)}ms`);
      expect(firstPaint.startTime, 'First paint').to.be.lessThan(limits.maxFirstPaint);
    }
  });
});

// =====================
// SEO Commands
// =====================

/**
 * Validate basic SEO elements on the page
 */
Cypress.Commands.add('validateSEO', () => {
  // Title exists and has content
  cy.title().should('exist').and('not.be.empty');

  // Meta description
  cy.get('head meta[name="description"]')
    .should('exist')
    .and('have.attr', 'content')
    .and('not.be.empty');

  // Canonical URL (if present)
  cy.get('head link[rel="canonical"]').then(($canonical) => {
    if ($canonical.length > 0) {
      cy.wrap($canonical).should('have.attr', 'href');
    }
  });

  // Open Graph tags (if present)
  cy.get('head meta[property^="og:"]').then(($og) => {
    if ($og.length > 0) {
      cy.log(`Found ${$og.length} Open Graph tags`);
    }
  });

  // Heading structure - should have at least one h1
  cy.get('h1').should('have.length.gte', 1);
});

// =====================
// Accessibility Commands (cypress-axe)
// =====================

// Import and register cypress-axe commands
import 'cypress-axe';

/**
 * Configure axe for better error reporting
 */
const logA11yViolations = (violations: any[]) => {
  if (violations.length === 0) {
    cy.log('✅ No accessibility violations found');
    return;
  }

  cy.task('log', `\n${violations.length} accessibility violation(s) detected:\n`);
  
  violations.forEach((violation, index) => {
    const nodes = violation.nodes.map((node: any) => node.target.join(', ')).join('\n  - ');
    cy.task('log', `
${index + 1}. ${violation.id} (${violation.impact})
   Description: ${violation.description}
   Help: ${violation.helpUrl}
   Elements:
  - ${nodes}
`);
  });
};
