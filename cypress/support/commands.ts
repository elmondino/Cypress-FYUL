/// <reference types="cypress" />
/// <reference path="./commands.d.ts" />

import 'cypress-axe';

Cypress.Commands.add('waitForPageReady', () => {
  cy.document().its('readyState').should('eq', 'complete');
  cy.get('body').should('be.visible');
});

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('waitForRequest', (alias: string, timeout = 10000) => {
  return cy.wait(`@${alias}`, { timeout });
});

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

    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find((entry) => entry.name === 'first-paint');
    
    if (firstPaint) {
      cy.log(`First Paint: ${firstPaint.startTime.toFixed(0)}ms`);
      expect(firstPaint.startTime, 'First paint').to.be.lessThan(limits.maxFirstPaint);
    }
  });
});

Cypress.Commands.add('validateSEO', () => {
  cy.title().should('exist').and('not.be.empty');
  
  cy.get('head meta[name="description"]')
    .should('exist')
    .and('have.attr', 'content')
    .and('not.be.empty');

  cy.get('head link[rel="canonical"]').then(($canonical) => {
    if ($canonical.length > 0) {
      cy.wrap($canonical).should('have.attr', 'href');
    }
  });

  cy.get('head meta[property^="og:"]').then(($og) => {
    if ($og.length > 0) {
      cy.log(`Found ${$og.length} Open Graph tags`);
    }
  });

  cy.get('h1').should('have.length.gte', 1);
});
