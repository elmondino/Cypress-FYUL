/**
 * ============================================================================
 * commands.ts - Custom Cypress Commands
 * ============================================================================
 * 
 * WHAT ARE CUSTOM COMMANDS?
 * -------------------------
 * Custom commands extend Cypress with your own reusable functions.
 * They're available globally on the `cy` object in all tests.
 * 
 * EXAMPLE:
 *   // Define once here:
 *   Cypress.Commands.add('login', (user, pass) => { ... });
 *   
 *   // Use anywhere in tests:
 *   cy.login('admin', 'password123');
 * 
 * WHEN TO CREATE A CUSTOM COMMAND?
 * ---------------------------------
 * ✅ Good candidates:
 *   - Actions used in MANY tests (login, setup, navigation)
 *   - Complex operations that would clutter tests
 *   - Assertions you repeat frequently
 * 
 * ❌ Not good candidates:
 *   - Single-use operations (just put in the test)
 *   - Page-specific actions (put in Page Objects instead)
 *   - Simple Cypress commands (don't wrap cy.get in cy.myGet)
 * 
 * CUSTOM COMMANDS vs PAGE OBJECTS:
 * --------------------------------
 * Custom Commands: Global utilities, cross-cutting concerns
 *   cy.waitForPageReady(), cy.checkPerformance()
 * 
 * Page Objects: Page-specific selectors and actions
 *   homePage.verifyNavigation(), loginPage.enterCredentials()
 * 
 * ============================================================================
 */

/// <reference types="cypress" />
/// <reference path="./commands.d.ts" />

/**
 * TRIPLE-SLASH REFERENCES EXPLAINED:
 * -----------------------------------
 * /// <reference types="cypress" />
 *   - Tells TypeScript to include Cypress type definitions
 *   - Enables autocomplete for cy.* commands
 * 
 * /// <reference path="./commands.d.ts" />
 *   - Points to our custom type definitions
 *   - Makes our custom commands have proper TypeScript types
 */

// ============================================================================
// PAGE LOAD COMMANDS
// ============================================================================

/**
 * Wait for the page to be fully loaded and ready for interaction.
 * 
 * WHY THIS COMMAND?
 * -----------------
 * Cypress's cy.visit() waits for 'load' event, but that's not always enough:
 * - JavaScript might still be initializing
 * - Fonts might still be loading
 * - Animations might still be running
 * 
 * This command waits for document.readyState === 'complete', which means
 * ALL resources (images, scripts, stylesheets) have finished loading.
 * 
 * ANTI-PATTERN AVOIDED:
 * ❌ cy.wait(3000)  // Arbitrary wait - might be too short or too long
 * ✅ cy.waitForPageReady()  // Waits for actual readiness
 * 
 * USAGE:
 *   cy.visit('/about');
 *   cy.waitForPageReady();
 *   // Now safe to interact with page
 */
Cypress.Commands.add('waitForPageReady', () => {
  // Check document.readyState
  // States: 'loading' -> 'interactive' -> 'complete'
  // 'complete' means everything is loaded
  cy.document().its('readyState').should('eq', 'complete');
  
  // Also ensure body is visible (page has rendered)
  cy.get('body').should('be.visible');
});

// ============================================================================
// SELECTOR COMMANDS
// ============================================================================

/**
 * Get an element by its data-testid attribute.
 * 
 * DATA-TESTID PATTERN:
 * --------------------
 * The most reliable selector strategy for testing.
 * 
 * In your HTML:
 *   <button data-testid="submit-btn">Submit</button>
 * 
 * In your test:
 *   cy.getByTestId('submit-btn').click();
 * 
 * WHY DATA-TESTID?
 * - Won't break when classes change (styling updates)
 * - Won't break when IDs change (refactoring)
 * - Clear indicator that element is tested
 * - Easy to find in codebase (search for data-testid)
 * 
 * CONVENTION:
 * Use kebab-case: 'submit-btn', 'user-profile-card', 'nav-menu'
 * 
 * @param {string} testId - The data-testid value to find
 * @returns {Cypress.Chainable} - Chainable element
 */
Cypress.Commands.add('getByTestId', (testId: string) => {
  // Attribute selector: [attribute="value"]
  return cy.get(`[data-testid="${testId}"]`);
});

// ============================================================================
// NETWORK COMMANDS
// ============================================================================

/**
 * Wait for an intercepted network request to complete.
 * 
 * NETWORK INTERCEPTION:
 * ---------------------
 * Cypress can intercept and wait for network requests:
 * 
 *   // Setup interception (usually in beforeEach)
 *   cy.intercept('GET', '/api/users').as('getUsers');
 *   
 *   // Trigger action that makes the request
 *   cy.get('[data-testid="load-users"]').click();
 *   
 *   // Wait for request to complete
 *   cy.waitForRequest('getUsers');
 * 
 * WHY USE THIS?
 * - Ensures data has loaded before assertions
 * - More reliable than cy.wait(ms)
 * - Can verify request/response data
 * 
 * @param {string} alias - The intercept alias (without @)
 * @param {number} timeout - Max wait time in milliseconds (default: 10000)
 * @returns {Cypress.Chainable} - The interception result
 */
Cypress.Commands.add('waitForRequest', (alias: string, timeout = 10000) => {
  // Note: cy.wait() wants '@alias', so we prepend the @
  return cy.wait(`@${alias}`, { timeout });
});

// ============================================================================
// PERFORMANCE COMMANDS
// ============================================================================

/**
 * Check page performance metrics using the browser's Performance API.
 * 
 * PERFORMANCE TESTING:
 * --------------------
 * Automated performance checks catch regressions early.
 * 
 * METRICS EXPLAINED:
 * - Load Time: Total time until page fully loaded
 * - DOM Content Loaded: Time until HTML parsed and DOM ready
 * - First Paint: Time until first visual content appears
 * 
 * THRESHOLDS:
 * - 2 seconds: Excellent
 * - 3 seconds: Good
 * - 5 seconds: Acceptable
 * - 5+ seconds: Poor (users start abandoning)
 * 
 * USAGE:
 *   // Use defaults
 *   cy.checkPerformance();
 *   
 *   // Custom thresholds
 *   cy.checkPerformance({ maxLoadTime: 3000 });
 * 
 * @param {object} thresholds - Optional custom thresholds
 */
Cypress.Commands.add('checkPerformance', (thresholds = {}) => {
  // Default thresholds (in milliseconds)
  const defaults = {
    maxLoadTime: 5000,        // Total page load
    maxDomContentLoaded: 3000, // DOM ready
    maxFirstPaint: 2000,       // First visual
  };

  // Merge defaults with custom thresholds
  // Spread operator: {...a, ...b} combines objects, b overwrites a
  const limits = { ...defaults, ...thresholds };

  // Access the browser's window object
  cy.window().then((win) => {
    // Performance API is built into browsers
    const performance = win.performance;
    
    // Get navigation timing data
    // This contains detailed timing for page load
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    if (navigation) {
      // Calculate metrics
      const loadTime = navigation.loadEventEnd - navigation.startTime;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.startTime;

      // Log to Cypress command log (visible in test runner)
      cy.log(`Load Time: ${loadTime.toFixed(0)}ms`);
      cy.log(`DOM Content Loaded: ${domContentLoaded.toFixed(0)}ms`);

      // Assert against thresholds
      // expect() is from Chai assertion library (bundled with Cypress)
      expect(loadTime, 'Page load time').to.be.lessThan(limits.maxLoadTime);
      expect(domContentLoaded, 'DOM Content Loaded').to.be.lessThan(limits.maxDomContentLoaded);
    }

    // Check First Paint (newer metric, might not be available)
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find((entry) => entry.name === 'first-paint');
    
    if (firstPaint) {
      cy.log(`First Paint: ${firstPaint.startTime.toFixed(0)}ms`);
      expect(firstPaint.startTime, 'First paint').to.be.lessThan(limits.maxFirstPaint);
    }
  });
});

// ============================================================================
// SEO COMMANDS
// ============================================================================

/**
 * Validate basic SEO elements on the page.
 * 
 * SEO TESTING:
 * ------------
 * Search engines need certain elements to properly index pages.
 * These tests catch SEO regressions (missing title, broken meta tags).
 * 
 * ELEMENTS CHECKED:
 * - Page title: Required for search results
 * - Meta description: Shows in search results
 * - Canonical URL: Prevents duplicate content issues
 * - Open Graph tags: For social media sharing
 * - H1 heading: Main content heading (should be exactly one)
 * 
 * USAGE:
 *   cy.visit('/');
 *   cy.validateSEO();
 */
Cypress.Commands.add('validateSEO', () => {
  // -------------------------
  // Title Tag
  // -------------------------
  // <title>Page Title</title>
  // Critical for search results and browser tabs
  cy.title().should('exist').and('not.be.empty');

  // -------------------------
  // Meta Description
  // -------------------------
  // <meta name="description" content="Page description...">
  // Shows in search results below the title
  cy.get('head meta[name="description"]')
    .should('exist')
    .and('have.attr', 'content')
    .and('not.be.empty');

  // -------------------------
  // Canonical URL (optional)
  // -------------------------
  // <link rel="canonical" href="https://example.com/page">
  // Tells search engines the "official" URL for this content
  cy.get('head link[rel="canonical"]').then(($canonical) => {
    if ($canonical.length > 0) {
      cy.wrap($canonical).should('have.attr', 'href');
    }
    // Not failing if missing - canonical is optional
  });

  // -------------------------
  // Open Graph Tags (optional)
  // -------------------------
  // <meta property="og:title" content="...">
  // Used when sharing on Facebook, LinkedIn, etc.
  cy.get('head meta[property^="og:"]').then(($og) => {
    if ($og.length > 0) {
      cy.log(`Found ${$og.length} Open Graph tags`);
    }
    // Not failing if missing - OG tags are optional
  });

  // -------------------------
  // Heading Structure
  // -------------------------
  // Should have at least one <h1> for main content heading
  // SEO best practice: exactly one h1 per page
  cy.get('h1').should('have.length.gte', 1);
});

// ============================================================================
// ACCESSIBILITY COMMANDS
// ============================================================================

/**
 * Import cypress-axe for accessibility testing.
 * 
 * CYPRESS-AXE:
 * ------------
 * Integrates the axe-core accessibility engine with Cypress.
 * 
 * PROVIDES COMMANDS:
 * - cy.injectAxe(): Load axe-core into the page
 * - cy.checkA11y(): Run accessibility scan
 * 
 * USAGE:
 *   cy.visit('/');
 *   cy.injectAxe();
 *   cy.checkA11y();  // Fails if violations found
 * 
 * WHAT IT CHECKS:
 * - Color contrast
 * - Missing alt text
 * - Invalid ARIA attributes
 * - Keyboard navigation issues
 * - And ~100 more rules
 * 
 * WHY ACCESSIBILITY TESTING?
 * - Legal requirements (ADA, WCAG)
 * - Better user experience for everyone
 * - Catches real issues that affect real users
 */
import 'cypress-axe';
