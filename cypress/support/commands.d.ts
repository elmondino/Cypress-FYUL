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
       * Inject axe-core for accessibility testing
       */
      injectAxe(): Chainable<void>;

      /**
       * Run axe accessibility checks
       * @param context - Optional context/selector to check
       * @param options - Optional axe options
       * @param violationCallback - Optional callback for violations
       * @param skipFailures - Optional flag to skip failures
       */
      checkA11y(
        context?: string | Node | null,
        options?: {
          runOnly?: string[];
          rules?: Record<string, { enabled: boolean }>;
        },
        violationCallback?: (violations: unknown[]) => void,
        skipFailures?: boolean
      ): Chainable<void>;

      /**
       * Take a visual snapshot with Percy
       * @param name - Name of the snapshot
       * @param options - Percy options
       */
      visualSnapshot(name: string, options?: PercyOptions): Chainable<void>;

      /**
       * Take visual snapshots at multiple viewports
       * @param name - Base name for snapshots
       */
      visualSnapshotResponsive(name: string): Chainable<void>;

      /**
       * Setup default network intercepts
       */
      setupIntercepts(): Chainable<void>;
    }
  }

  interface PerformanceThresholds {
    maxLoadTime?: number;
    maxDomContentLoaded?: number;
    maxFirstPaint?: number;
  }

  interface PercyOptions {
    widths?: number[];
    minHeight?: number;
    percyCSS?: string;
    scope?: string;
  }
}

export {};
