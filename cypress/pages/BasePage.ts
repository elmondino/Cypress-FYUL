/**
 * ============================================================================
 * BasePage.ts - Abstract Base Class for Page Objects
 * ============================================================================
 * 
 * WHAT IS THIS FILE?
 * ------------------
 * This is the foundation of our Page Object Model (POM) architecture.
 * Think of it as a "blueprint" that all other page classes inherit from.
 * 
 * WHY USE AN ABSTRACT CLASS?
 * --------------------------
 * 1. Code Reuse: Common methods (visit, click, verify) are written ONCE here
 *    and available to ALL page objects automatically.
 * 
 * 2. Consistency: All pages behave the same way because they use the same
 *    base methods. This makes tests predictable.
 * 
 * 3. Maintainability: If we need to change how "visit" works, we change it
 *    in ONE place (here), not in every page object.
 * 
 * 4. Enforced Structure: The "abstract" keyword forces child classes to
 *    define certain properties (path, pageTitle), ensuring consistency.
 * 
 * DESIGN PATTERN: Page Object Model (POM)
 * ---------------------------------------
 * POM separates "what" we're testing from "how" we interact with the page.
 * 
 * WITHOUT POM (Bad - duplicated selectors everywhere):
 *   cy.get('.nav-link').click()  // In test file 1
 *   cy.get('.nav-link').click()  // In test file 2 (duplicated!)
 * 
 * WITH POM (Good - selectors in one place):
 *   homePage.clickNavLink()  // Test file 1
 *   homePage.clickNavLink()  // Test file 2 (same method, no duplication)
 * 
 * If the selector changes, you update ONE place (the page object), not 50 tests.
 * 
 * METHOD CHAINING PATTERN
 * -----------------------
 * Notice every method returns "this". This enables fluent, readable tests:
 * 
 *   homePage
 *     .visit()
 *     .verifyPageLoaded()
 *     .screenshot('loaded');
 * 
 * Instead of:
 *   homePage.visit();
 *   homePage.verifyPageLoaded();
 *   homePage.screenshot('loaded');
 * 
 * ============================================================================
 */

/**
 * Abstract base class that all page objects extend.
 * 
 * "abstract" means:
 * - You CANNOT create an instance of BasePage directly (new BasePage() ❌)
 * - You CAN only create instances of classes that EXTEND it (new HomePage() ✅)
 * - Child classes MUST implement abstract properties/methods
 */
export abstract class BasePage {
  
  /**
   * ABSTRACT PROPERTIES
   * -------------------
   * These MUST be defined by every child class. TypeScript will throw
   * an error if a child class doesn't define these.
   * 
   * "protected" means: accessible in this class AND child classes, but not outside.
   * "readonly" means: can only be set once (in the child class definition).
   */
  
  /**
   * The URL path for this page (e.g., '/about', '/leadership').
   * Used by visit() to navigate to the page.
   * 
   * Example in child class:
   *   protected readonly path = '/about';
   */
  protected abstract readonly path: string;
  
  /**
   * The expected page title (or pattern to match).
   * Used by verifyPageLoaded() to confirm we're on the right page.
   * 
   * Can be a string: 'About Us'
   * Or a RegExp for flexible matching: /About|FYUL/i  (matches "About" OR "FYUL", case-insensitive)
   */
  protected abstract readonly pageTitle: RegExp | string;

  // ============================================================================
  // NAVIGATION METHODS
  // ============================================================================

  /**
   * Navigate to this page and wait for it to be ready.
   * 
   * WHY RETURN "this"?
   * ------------------
   * Returning "this" enables method chaining:
   *   homePage.visit().verifyPageLoaded().screenshot('test');
   * 
   * The return type ": this" is a TypeScript feature that returns the
   * actual child type, not BasePage. So HomePage.visit() returns HomePage,
   * not BasePage. This enables proper chaining with child-specific methods.
   * 
   * @returns {this} - The page object instance for method chaining
   */
  visit(): this {
    // cy.visit() is Cypress's navigation command
    // It automatically waits for the page to load
    cy.visit(this.path);
    
    // Additional wait to ensure page is fully interactive
    this.waitForPageReady();
    
    return this; // Enable method chaining
  }

  /**
   * Wait for the page to be fully loaded and interactive.
   * 
   * WHY NOT JUST USE cy.wait()?
   * ---------------------------
   * cy.wait(5000) is an ANTI-PATTERN because:
   * 1. It always waits the full time, even if the page loads in 1 second
   * 2. It might not wait long enough on slow networks
   * 3. It makes tests slow and unpredictable
   * 
   * INSTEAD, we wait for SPECIFIC CONDITIONS:
   * - document.readyState === 'complete' (browser finished loading)
   * - body is visible (content is rendered)
   * 
   * Cypress automatically retries these checks until they pass or timeout.
   * 
   * @returns {this} - The page object instance for method chaining
   */
  waitForPageReady(): this {
    // Check that the browser has finished loading all resources
    // readyState goes: 'loading' -> 'interactive' -> 'complete'
    cy.document().its('readyState').should('eq', 'complete');
    
    // Ensure the page body is visible (content has rendered)
    cy.get('body').should('be.visible');
    
    return this;
  }

  /**
   * Verify that the page loaded correctly by checking URL and title.
   * 
   * WHY VERIFY PAGE LOAD?
   * ---------------------
   * 1. Confirms navigation succeeded (didn't land on 404, wrong page, etc.)
   * 2. Catches routing issues early in the test
   * 3. Documents expected page behavior
   * 
   * @returns {this} - The page object instance for method chaining
   */
  verifyPageLoaded(): this {
    // Check URL contains our expected path
    // Using 'include' instead of 'eq' because full URL has domain, query params, etc.
    cy.url().should('include', this.path);
    
    // Check page title matches expected value
    // Handle both string and RegExp types
    if (typeof this.pageTitle === 'string') {
      cy.title().should('include', this.pageTitle);
    } else {
      // RegExp allows flexible matching: /About|FYUL/i
      cy.title().should('match', this.pageTitle);
    }
    
    return this;
  }

  // ============================================================================
  // ELEMENT SELECTION METHODS
  // ============================================================================

  /**
   * Get element by data-testid attribute.
   * 
   * SELECTOR STRATEGY PRIORITY (Best to Worst):
   * -------------------------------------------
   * 1. data-testid    - Most stable, added specifically for testing
   * 2. Accessible roles/labels - Good for a11y, stable
   * 3. Text content   - Readable but can change with copy updates
   * 4. CSS classes    - Often change for styling reasons
   * 5. Element structure - Very brittle (div > div > span)
   * 
   * WHY data-testid?
   * ----------------
   * - Developers add them specifically for testing
   * - They don't change when styling changes
   * - They clearly indicate "this element is tested"
   * - Example: <button data-testid="submit-btn">Submit</button>
   * 
   * NOTE: FYUL.com doesn't use data-testid, so we use content-based
   * selectors as a fallback. In YOUR apps, always add data-testid!
   * 
   * @param {string} testId - The data-testid value to find
   * @returns {Cypress.Chainable} - Cypress chainable for the element
   */
  protected getByTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(`[data-testid="${testId}"]`);
  }

  /**
   * Get element by ARIA role (accessibility-first approach).
   * 
   * ARIA ROLES
   * ----------
   * ARIA roles define what an element "is" for assistive technologies:
   * - button, link, navigation, main, heading, etc.
   * 
   * Using roles makes tests more accessible AND more stable because
   * they reflect the element's purpose, not its appearance.
   * 
   * Examples:
   *   getByRole('button', { name: 'Submit' })  // Find submit button
   *   getByRole('navigation')                   // Find nav element
   * 
   * @param {string} role - The ARIA role to find
   * @param {object} options - Optional: { name: 'Button text or label' }
   * @returns {Cypress.Chainable} - Cypress chainable for the element
   */
  protected getByRole(
    role: string, 
    options?: { name?: string | RegExp }
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    // Build a selector that finds elements by role attribute
    // and optionally by aria-label or text content
    const selector = options?.name 
      ? `[role="${role}"][aria-label*="${options.name}"], [role="${role}"]:contains("${options.name}")`
      : `[role="${role}"]`;
    return cy.get(selector);
  }

  // ============================================================================
  // INTERACTION METHODS
  // ============================================================================

  /**
   * Click an element safely (wait for visibility first).
   * 
   * WHY "SAFE" CLICK?
   * -----------------
   * Clicking an invisible element usually indicates a bug or timing issue.
   * By checking visibility first, we:
   * 1. Get better error messages if something is wrong
   * 2. Wait for animations/transitions to complete
   * 3. Ensure the element is actually clickable
   * 
   * @param {Cypress.Chainable} element - The element to click
   * @returns {this} - The page object instance for method chaining
   */
  protected safeClick(element: Cypress.Chainable<JQuery<HTMLElement>>): this {
    // should('be.visible') waits and retries until element is visible
    // .click() performs the actual click
    element.should('be.visible').click();
    return this;
  }

  // ============================================================================
  // ASSERTION METHODS
  // ============================================================================

  /**
   * Assert that an element is visible on the page.
   * 
   * CYPRESS ASSERTIONS
   * ------------------
   * Cypress assertions (.should()) automatically RETRY until they pass
   * or timeout (default 4 seconds). This handles async loading gracefully.
   * 
   * @param {Cypress.Chainable} element - The element to check
   * @returns {this} - The page object instance for method chaining
   */
  protected assertVisible(element: Cypress.Chainable<JQuery<HTMLElement>>): this {
    element.should('be.visible');
    return this;
  }

  /**
   * Assert that an element contains specific text.
   * 
   * @param {Cypress.Chainable} element - The element to check
   * @param {string|RegExp} text - The text to find (string or pattern)
   * @returns {this} - The page object instance for method chaining
   */
  protected assertText(
    element: Cypress.Chainable<JQuery<HTMLElement>>, 
    text: string | RegExp
  ): this {
    if (typeof text === 'string') {
      // contain.text does partial matching: 'Hello World' contains 'Hello'
      element.should('contain.text', text);
    } else {
      // For RegExp, get the text and match against the pattern
      element.invoke('text').should('match', text);
    }
    return this;
  }

  /**
   * Assert that an element has a specific attribute (optionally with value).
   * 
   * COMMON USES:
   * - Check href on links: assertAttribute(link, 'href', '/about')
   * - Check disabled state: assertAttribute(button, 'disabled')
   * - Check images have alt: assertAttribute(img, 'alt')
   * 
   * @param {Cypress.Chainable} element - The element to check
   * @param {string} attr - The attribute name
   * @param {string|RegExp} value - Optional: expected attribute value
   * @returns {this} - The page object instance for method chaining
   */
  protected assertAttribute(
    element: Cypress.Chainable<JQuery<HTMLElement>>, 
    attr: string, 
    value?: string | RegExp
  ): this {
    if (value === undefined) {
      // Just check attribute exists (e.g., 'disabled', 'checked')
      element.should('have.attr', attr);
    } else if (typeof value === 'string') {
      // Check exact value match
      element.should('have.attr', attr, value);
    } else {
      // Check value matches RegExp pattern
      element.invoke('attr', attr).should('match', value);
    }
    return this;
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Take a screenshot with a descriptive name.
   * 
   * SCREENSHOT BEST PRACTICES:
   * --------------------------
   * 1. Take screenshots at key test points (not everywhere)
   * 2. Use descriptive names: 'login-form-filled', not 'screenshot1'
   * 3. Screenshots are saved to cypress/screenshots/
   * 4. In CI, they're often uploaded as artifacts for debugging
   * 
   * @param {string} name - Descriptive name for the screenshot
   * @returns {this} - The page object instance for method chaining
   */
  screenshot(name: string): this {
    // Ensure page is ready before taking screenshot
    // This prevents capturing mid-animation states
    cy.get('body').should('be.visible');
    
    // Include class name in screenshot for context
    // e.g., 'HomePage-after-login' instead of just 'after-login'
    cy.screenshot(`${this.constructor.name}-${name}`);
    
    return this;
  }

  /**
   * Scroll to bring an element into view.
   * 
   * @param {Cypress.Chainable} element - The element to scroll to
   * @returns {this} - The page object instance for method chaining
   */
  protected scrollTo(element: Cypress.Chainable<JQuery<HTMLElement>>): this {
    element.scrollIntoView();
    return this;
  }
}
