/// <reference types="cypress" />

/**
 * Custom Cypress Commands - Type Definitions
 */
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Wait for page to be fully loaded
       */
      waitForPageReady(): Chainable<void>;

      /**
       * Get element by data-testid attribute
       * @param testId - The data-testid value
       */
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Intercept and wait for network requests
       * @param alias - The alias for the intercepted request
       * @param timeout - Optional timeout in ms
       */
      waitForRequest(alias: string, timeout?: number): Chainable<Interception>;

      /**
       * Assert page performance metrics
       * @param thresholds - Performance thresholds
       */
      checkPerformance(thresholds?: PerformanceThresholds): Chainable<void>;

      /**
       * Validate basic SEO elements
       */
      validateSEO(): Chainable<void>;

      /**
       * Check basic accessibility
       */
      checkAccessibility(): Chainable<void>;
    }
  }

  interface PerformanceThresholds {
    maxLoadTime?: number;
    maxDomContentLoaded?: number;
    maxFirstPaint?: number;
  }
}

export {};
