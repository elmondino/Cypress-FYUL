/**
 * ============================================================================
 * home.cy.ts - End-to-End Tests for the Home Page
 * ============================================================================
 * 
 * ANATOMY OF A CYPRESS TEST FILE:
 * -------------------------------
 * 
 * 1. IMPORTS
 *    - Page Objects for interacting with pages
 *    - Test data from fixtures
 * 
 * 2. DESCRIBE BLOCKS
 *    - Group related tests together
 *    - Can be nested for better organization
 * 
 * 3. HOOKS (beforeEach, afterEach, etc.)
 *    - Setup and cleanup that runs for each test
 * 
 * 4. IT BLOCKS
 *    - Individual test cases
 *    - Should test ONE thing each
 * 
 * TEST NAMING CONVENTION:
 * -----------------------
 * Use descriptive names that explain WHAT is being tested:
 * ✅ 'should display hero content'
 * ✅ 'should navigate to About page'
 * ❌ 'test1', 'hero test', 'nav works'
 * 
 * ARRANGE-ACT-ASSERT PATTERN:
 * ---------------------------
 * Each test should follow this structure:
 * 1. ARRANGE: Set up the test conditions (beforeEach usually handles this)
 * 2. ACT: Perform the action being tested
 * 3. ASSERT: Verify the expected outcome
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORTS
// ============================================================================

/**
 * Import page objects from our barrel file (pages/index.ts).
 * 
 * Page Objects encapsulate page interactions, making tests:
 * - More readable (homePage.verifyNavigation() vs cy.get('.nav').should('exist'))
 * - More maintainable (selectors in one place)
 * - More reusable (same methods across multiple tests)
 */
import { HomePage } from '../../pages';

/**
 * Import test data from fixtures.
 * 
 * FIXTURES:
 * Fixtures store test data in JSON files, keeping tests clean.
 * Data like URLs, expected values, and test configurations live here.
 * 
 * Benefits:
 * - Tests are cleaner (no hardcoded values)
 * - Data is reusable across tests
 * - Easy to update data without changing tests
 */
import testData from '../../fixtures/testData.json';

// ============================================================================
// TEST SUITES
// ============================================================================

/**
 * describe() - Groups related tests together.
 * 
 * SYNTAX: describe('Suite Name', () => { ... tests ... })
 * 
 * BEST PRACTICES:
 * - Name describes WHAT is being tested (not HOW)
 * - Use consistent naming: 'Feature' or 'Page Name'
 * - Nest describe blocks for sub-categories
 */
describe('Home Page', () => {
  
  /**
   * Create a HomePage instance.
   * 
   * We create this OUTSIDE the tests so it's available to all tests.
   * It's just creating an object - no browser actions yet.
   */
  const homePage = new HomePage();

  /**
   * beforeEach() - Runs before EACH test in this describe block.
   * 
   * COMMON USES:
   * - Navigate to the page
   * - Reset state (clear cookies, storage)
   * - Set up test data
   * 
   * WHY USE beforeEach?
   * - Tests should be independent (each starts fresh)
   * - Reduces code duplication
   * - Ensures consistent starting state
   * 
   * OTHER HOOKS:
   * - before(): Runs once before ALL tests
   * - afterEach(): Runs after EACH test
   * - after(): Runs once after ALL tests
   */
  beforeEach(() => {
    // Navigate to home page and wait for it to be ready
    // visit() and waitForPageReady() come from BasePage
    homePage.visit();
  });

  // --------------------------------------------------------------------------
  // Page Load Tests
  // --------------------------------------------------------------------------

  /**
   * Nested describe block for categorizing tests.
   * This creates a hierarchy in the test runner:
   * 
   * Home Page
   *   └─ Page Load
   *       └─ should load successfully with correct title
   */
  describe('Page Load', () => {
    /**
     * it() - Defines a single test case.
     * 
     * SYNTAX: it('should do something', () => { ... })
     * 
     * NAMING CONVENTION:
     * Start with 'should' to describe expected behavior:
     * - 'should load successfully'
     * - 'should display error message'
     * - 'should navigate to about page'
     */
    it('should load successfully with correct title', () => {
      // ARRANGE: Done in beforeEach (navigate to page)
      
      // ACT: Nothing - we're just verifying the load
      
      // ASSERT: Verify page loaded correctly
      homePage.verifyPageLoaded();
      
      // Additional assertion using Cypress directly
      // .should('match', /pattern/) uses regex matching
      cy.title().should('match', /FYUL/i);
    });
  });

  // --------------------------------------------------------------------------
  // Hero Section Tests
  // --------------------------------------------------------------------------

  describe('Hero Section', () => {
    it('should display hero content', () => {
      // Page object method handles the details of WHAT to check
      // Test just calls the high-level verification
      homePage.verifyHeroSection();
    });
  });

  // --------------------------------------------------------------------------
  // Navigation Tests
  // --------------------------------------------------------------------------

  describe('Navigation', () => {
    /**
     * Test that navigation elements exist.
     */
    it('should display navigation', () => {
      homePage.verifyNavigation();
    });

    /**
     * Test navigation to the About page.
     * 
     * This tests:
     * 1. About link is clickable
     * 2. Click navigates to correct URL
     */
    it('should navigate to About page', () => {
      // ACT: Click the about link
      homePage.clickAboutLink();
      
      // ASSERT: Verify we're on the about page
      // testData.pages.about.path = '/about'
      cy.url().should('include', testData.pages.about.path);
    });

    it('should navigate to Leadership page', () => {
      homePage.clickLeadershipLink();
      cy.url().should('include', testData.pages.leadership.path);
    });

    it('should navigate to Privacy page', () => {
      homePage.clickPrivacyLink();
      cy.url().should('include', testData.pages.privacy.path);
    });
  });

  // --------------------------------------------------------------------------
  // Brands Section Tests
  // --------------------------------------------------------------------------

  describe('Brands Section', () => {
    /**
     * Basic test - just verify brands exist.
     */
    it('should display brand cards', () => {
      homePage.verifyBrandLinks();
    });

    /**
     * Detailed test - verify each brand has correct link.
     * 
     * DATA-DRIVEN TESTING:
     * Test data comes from fixtures, making it easy to:
     * - Add new brands without changing test code
     * - Update URLs in one place
     * - See what's being tested at a glance
     */
    it('should have valid brand links', () => {
      // Transform fixture data into format expected by page object method
      // This mapping converts JSON structure to RegExp patterns
      const brands = testData.brands.map((brand) => ({
        name: brand.name,
        urlPattern: new RegExp(brand.urlPattern),
      }));
      
      // Pass to page object for verification
      homePage.verifyBrandLinks(brands);
    });
  });

  // --------------------------------------------------------------------------
  // Footer Tests
  // --------------------------------------------------------------------------

  describe('Footer', () => {
    it('should display footer with links', () => {
      homePage.verifyFooter();
    });
  });

  // --------------------------------------------------------------------------
  // Careers Tests
  // --------------------------------------------------------------------------

  describe('Careers', () => {
    it('should have careers link', () => {
      homePage.verifyCareersLink();
    });
  });
});

// ============================================================================
// SEO & PERFORMANCE TESTS
// ============================================================================

/**
 * Separate describe block for cross-cutting concerns.
 * 
 * These tests don't use page objects because they're testing
 * generic functionality that applies to any page.
 */
describe('Home Page - SEO & Performance', () => {
  
  beforeEach(() => {
    // Using Cypress directly instead of page object
    // because these are utility tests, not page-specific
    cy.visit('/');
    cy.waitForPageReady();
  });

  /**
   * SEO validation test.
   * 
   * Uses our custom command defined in commands.ts.
   * Checks for title, meta description, headings, etc.
   */
  it('should have valid SEO elements', () => {
    cy.validateSEO();
  });

  /**
   * Performance test.
   * 
   * Checks page load time against thresholds.
   * Catches performance regressions automatically.
   */
  it('should meet performance thresholds', () => {
    // testData.performance = { maxLoadTime: 5000, ... }
    cy.checkPerformance(testData.performance);
  });
});

// ============================================================================
// ACCESSIBILITY TESTS
// ============================================================================

/**
 * Accessibility (a11y) testing with cypress-axe.
 * 
 * WHY TEST ACCESSIBILITY?
 * - Legal compliance (ADA, WCAG)
 * - Better UX for all users
 * - SEO benefits
 * - Catch issues early (cheaper to fix)
 * 
 * NOTE: This test LOGS violations but doesn't FAIL.
 * FYUL.com has known accessibility issues (found 3 violations).
 * In your own apps, you'd typically fail on violations.
 */
describe('Home Page - Accessibility', () => {
  
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageReady();
  });

  it('should check accessibility (logs violations)', () => {
    // Step 1: Inject axe-core library into the page
    // This must be called before checkA11y()
    cy.injectAxe();
    
    // Step 2: Run accessibility scan
    // Parameters:
    //   null = check entire page (or pass a selector)
    //   { runOnly: [...] } = which WCAG rules to check
    //   callback = function to handle violations (instead of failing)
    //   true = don't fail on violations (we're just logging)
    cy.checkA11y(
      null,  // Check entire page
      {
        runOnly: ['wcag2a', 'wcag2aa'],  // Check WCAG 2.0 Level A and AA
      },
      (violations) => {
        // This callback receives any violations found
        if (violations.length > 0) {
          // Log to Cypress task log (visible in CI output)
          cy.task('log', `⚠️ ${violations.length} accessibility violations found:`);
          
          // Log details of each violation
          violations.forEach((v) => {
            cy.task('log', `  - ${v.id}: ${v.description}`);
          });
        }
      },
      true  // Don't fail test - just log violations
    );
  });
});
