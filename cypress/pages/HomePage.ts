/**
 * ============================================================================
 * HomePage.ts - Page Object for the FYUL Home Page
 * ============================================================================
 * 
 * WHAT IS A PAGE OBJECT?
 * ----------------------
 * A Page Object represents a single page (or component) in your application.
 * It encapsulates:
 *   1. Element selectors (HOW to find elements)
 *   2. Page interactions (WHAT you can do on the page)
 *   3. Page state verification (WHAT to verify)
 * 
 * BENEFITS:
 * - Tests become readable: homePage.verifyNavigation() vs cy.get('.nav').should('exist')
 * - Changes are localized: if the nav selector changes, update ONE place
 * - Reusability: multiple tests can use the same page object methods
 * 
 * ============================================================================
 * 
 * IMPORTANT NOTE ABOUT SELECTORS:
 * --------------------------------
 * FYUL.com does NOT use semantic HTML elements like <nav>, <header>, <footer>.
 * This is unfortunately common in sites built with certain frameworks.
 * 
 * IDEAL (if you control the codebase):
 *   cy.get('[data-testid="nav"]')       // Best - specific to testing
 *   cy.get('nav')                        // Good - semantic HTML
 *   cy.get('[role="navigation"]')        // Good - ARIA roles
 * 
 * WHAT WE HAVE TO USE (for FYUL.com):
 *   cy.contains('a', 'About')            // Content-based - find link with text
 *   cy.get('a[href*="/about"]')          // Attribute-based - find link by href
 * 
 * Content-based selectors are less ideal because:
 * - They break if copy/text changes
 * - They can be slower (Cypress searches all text)
 * - They're less specific (multiple elements might match)
 * 
 * But they're the MOST RELIABLE option when the site doesn't provide
 * data-testid or semantic HTML. Real-world testing often requires compromises!
 * 
 * ============================================================================
 */

import { BasePage } from './BasePage';

/**
 * HomePage class - Represents the FYUL.com home page.
 * 
 * "extends BasePage" means HomePage INHERITS all methods from BasePage:
 * - visit(), verifyPageLoaded(), waitForPageReady(), etc.
 * 
 * HomePage can also ADD its own methods specific to the home page.
 */
export class HomePage extends BasePage {
  
  /**
   * IMPLEMENTING ABSTRACT PROPERTIES
   * ---------------------------------
   * BasePage declared these as "abstract", so we MUST define them here.
   * TypeScript will error if we forget!
   */
  
  /**
   * The URL path for the home page (just the root '/').
   * Used by visit() inherited from BasePage.
   */
  protected readonly path = '/';
  
  /**
   * Title pattern to match for verification.
   * /FYUL/i is a RegExp that matches "FYUL" case-insensitively.
   * Used by verifyPageLoaded() inherited from BasePage.
   */
  protected readonly pageTitle = /FYUL/i;

  // ============================================================================
  // ELEMENT GETTERS
  // ============================================================================
  /**
   * GETTER PATTERN EXPLAINED
   * ------------------------
   * "get" creates a property that executes code when accessed.
   * 
   * Instead of:
   *   heroHeading() { return cy.get('h1').first(); }
   *   Usage: this.heroHeading()
   * 
   * We use:
   *   get heroHeading() { return cy.get('h1').first(); }
   *   Usage: this.heroHeading (no parentheses - cleaner!)
   * 
   * WHY USE GETTERS?
   * 1. Cleaner syntax in methods
   * 2. Elements are always "fresh" - query runs each time
   * 3. Encapsulates selector logic
   * 
   * "private" means these are only used inside this class.
   * Tests call public methods like verifyHeroSection(), not heroHeading directly.
   */

  /**
   * Gets the main hero heading (first h1 on the page).
   */
  private get heroHeading() {
    return cy.get('h1').first();
  }

  /**
   * Gets all brand partner links (Printify, Printful, Snow Commerce).
   * 
   * SELECTOR EXPLAINED: a[href*="printify.com"]
   * - a           = anchor (link) elements
   * - [href*="x"] = href attribute CONTAINS "x" (* means contains)
   * - ,           = OR (matches any of the patterns)
   */
  private get brandLinks() {
    return cy.get('a[href*="printify.com"], a[href*="printful.com"], a[href*="snowcommerce"]');
  }

  /**
   * Gets the careers link.
   * .first() ensures we get one element even if multiple match.
   */
  private get careersLink() {
    return cy.get('a[href*="careers"]').first();
  }

  /**
   * Gets the leadership page link.
   */
  private get leadershipLink() {
    return cy.get('a[href*="leadership"]').first();
  }

  /**
   * Gets the about page link.
   */
  private get aboutLink() {
    return cy.get('a[href*="/about"]').first();
  }

  /**
   * Gets the privacy policy link.
   */
  private get privacyLink() {
    return cy.get('a[href*="privacy"]').first();
  }

  // ============================================================================
  // VERIFICATION METHODS (What to Assert)
  // ============================================================================
  /**
   * These methods verify page content/state.
   * They're used in tests to confirm the page is correct.
   * 
   * NAMING CONVENTION: verify[Thing]()
   * - Makes it clear these are assertions, not actions
   * - Easy to understand what's being checked
   */

  /**
   * Verify the hero section displays correctly.
   * 
   * Hero = the main banner/heading area at the top of the page.
   * Most marketing sites have a prominent hero section.
   * 
   * @returns {this} - For method chaining
   */
  verifyHeroSection(): this {
    // Check the h1 is visible
    this.heroHeading.should('be.visible');
    
    // Verify hero contains expected content
    // Using RegExp to match either word (content might vary slightly)
    cy.contains('h1', /limitless|creativity/i).should('be.visible');
    
    return this;
  }

  /**
   * Verify navigation elements are present.
   * 
   * Since FYUL.com doesn't have a semantic <nav> element,
   * we verify that key navigation links exist instead.
   * 
   * @returns {this} - For method chaining
   */
  verifyNavigation(): this {
    // Check that main nav links exist
    // .should('exist') passes if element is in DOM (even if hidden)
    // .should('be.visible') requires it to be visible
    this.aboutLink.should('exist');
    this.leadershipLink.should('exist');
    
    return this;
  }

  /**
   * Verify footer content is present.
   * 
   * Again, no semantic <footer> tag, so we check for footer content.
   * The copyright notice is a reliable indicator of footer area.
   * 
   * @returns {this} - For method chaining
   */
  verifyFooter(): this {
    // Check copyright text (update year as needed)
    cy.contains('© 2025 FYUL').should('be.visible');
    
    // Check privacy link exists (usually in footer)
    this.privacyLink.should('exist');
    
    return this;
  }

  /**
   * Verify brand partner links are present and correct.
   * 
   * OVERLOADING PATTERN:
   * This method can be called two ways:
   *   verifyBrandLinks()                           - Just check brands exist
   *   verifyBrandLinks([{name: 'X', url: /x/}])   - Check specific brands
   * 
   * @param {Array} brands - Optional array of brands to verify
   * @returns {this} - For method chaining
   */
  verifyBrandLinks(brands?: { name: string; urlPattern: RegExp }[]): this {
    if (brands) {
      // Detailed verification - check each brand specifically
      brands.forEach(({ name, urlPattern }) => {
        cy.contains('a', name)                    // Find link containing brand name
          .should('be.visible')                   // Should be visible
          .and('have.attr', 'href')               // Should have href attribute
          .and('match', urlPattern);              // href should match expected pattern
      });
    } else {
      // Simple verification - just check some brand links exist
      this.brandLinks.should('have.length.greaterThan', 0);
    }
    
    return this;
  }

  /**
   * Verify the careers link is present and valid.
   * 
   * @returns {this} - For method chaining
   */
  verifyCareersLink(): this {
    this.careersLink
      .should('be.visible')
      .and('have.attr', 'href');  // Has href (is a real link)
    
    return this;
  }

  /**
   * Verify the leadership link is present and valid.
   * 
   * @returns {this} - For method chaining
   */
  verifyLeadershipLink(): this {
    this.leadershipLink
      .should('be.visible')
      .and('have.attr', 'href');
    
    return this;
  }

  // ============================================================================
  // NAVIGATION METHODS (Actions)
  // ============================================================================
  /**
   * These methods perform navigation actions.
   * They click links and wait for the new page to load.
   * 
   * NAMING CONVENTION: click[Thing]()
   * - Makes it clear these perform actions
   * - Consistent, predictable naming
   */

  /**
   * Click the About link to navigate to the About page.
   * 
   * WHY WAIT AFTER CLICK?
   * Cypress click() doesn't automatically wait for page loads.
   * waitForPageReady() ensures the new page is fully loaded
   * before the test continues.
   * 
   * @returns {this} - For method chaining
   */
  clickAboutLink(): this {
    this.aboutLink.click();
    this.waitForPageReady();
    return this;
  }

  /**
   * Click the Leadership link to navigate to the Leadership page.
   * 
   * @returns {this} - For method chaining
   */
  clickLeadershipLink(): this {
    this.leadershipLink.click();
    this.waitForPageReady();
    return this;
  }

  /**
   * Click the Privacy link to navigate to the Privacy page.
   * 
   * @returns {this} - For method chaining
   */
  clickPrivacyLink(): this {
    this.privacyLink.click();
    this.waitForPageReady();
    return this;
  }
}

/**
 * DEFAULT EXPORT
 * --------------
 * "export default" allows simpler imports in some cases:
 *   import HomePage from './HomePage';       // default export
 *   import { HomePage } from './HomePage';   // named export (line 52)
 * 
 * We provide both for flexibility.
 */
export default HomePage;
