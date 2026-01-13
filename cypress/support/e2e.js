// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
// ***********************************************************

// Import commands
import './commands';

// Import custom commands
import './commands/navigation';
import './commands/assertions';
import './commands/accessibility';

// Reporter
import 'cypress-mochawesome-reporter/register';

// Global before hook
before(() => {
  cy.log('Starting Test Suite');
});

// Global after hook
after(() => {
  cy.log('Test Suite Completed');
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // Log the error for debugging purposes
  cy.log('Uncaught exception:', err.message);
  
  // Don't fail tests on certain errors
  if (err.message.includes('ResizeObserver loop')) {
    return false;
  }
  
  // Let other errors fail the test
  return true;
});

// Configure viewport for responsive testing
Cypress.Commands.add('setViewport', (device) => {
  const viewports = {
    mobile: [375, 667],
    tablet: [768, 1024],
    desktop: [1920, 1080],
    '4k': [3840, 2160],
  };
  
  const [width, height] = viewports[device] || viewports.desktop;
  cy.viewport(width, height);
});

// Performance monitoring
Cypress.Commands.add('measurePerformance', () => {
  cy.window().then((win) => {
    const performance = win.performance;
    const timing = performance.timing;
    
    const metrics = {
      pageLoadTime: timing.loadEventEnd - timing.navigationStart,
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
      timeToInteractive: timing.domInteractive - timing.navigationStart,
      resourceLoadTime: timing.responseEnd - timing.requestStart,
    };
    
    cy.log('Performance Metrics:', metrics);
    return metrics;
  });
});
