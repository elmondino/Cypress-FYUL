/**
 * BasePage - Abstract base class for all page objects
 * Provides common functionality for page interactions
 */
export abstract class BasePage {
  protected abstract readonly path: string;
  protected abstract readonly pageTitle: RegExp | string;

  /**
   * Navigate to the page
   */
  visit(): this {
    cy.visit(this.path);
    this.waitForPageReady();
    return this;
  }

  /**
   * Wait for page to be fully loaded and interactive
   */
  waitForPageReady(): this {
    cy.document().its('readyState').should('eq', 'complete');
    cy.get('body').should('be.visible');
    return this;
  }

  /**
   * Verify page loaded by checking URL and title
   */
  verifyPageLoaded(): this {
    cy.url().should('include', this.path);
    if (typeof this.pageTitle === 'string') {
      cy.title().should('include', this.pageTitle);
    } else {
      cy.title().should('match', this.pageTitle);
    }
    return this;
  }

  /**
   * Get element by data-testid (preferred selector strategy)
   */
  protected getByTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(`[data-testid="${testId}"]`);
  }

  /**
   * Get element by role (accessibility-first approach)
   */
  protected getByRole(role: string, options?: { name?: string | RegExp }): Cypress.Chainable<JQuery<HTMLElement>> {
    const selector = options?.name 
      ? `[role="${role}"][aria-label*="${options.name}"], [role="${role}"]:contains("${options.name}")`
      : `[role="${role}"]`;
    return cy.get(selector);
  }

  /**
   * Safe click with visibility check
   */
  protected safeClick(element: Cypress.Chainable<JQuery<HTMLElement>>): this {
    element.should('be.visible').click();
    return this;
  }

  /**
   * Verify element is visible
   */
  protected assertVisible(element: Cypress.Chainable<JQuery<HTMLElement>>): this {
    element.should('be.visible');
    return this;
  }

  /**
   * Verify element contains text
   */
  protected assertText(element: Cypress.Chainable<JQuery<HTMLElement>>, text: string | RegExp): this {
    if (typeof text === 'string') {
      element.should('contain.text', text);
    } else {
      element.invoke('text').should('match', text);
    }
    return this;
  }

  /**
   * Verify element has attribute
   */
  protected assertAttribute(
    element: Cypress.Chainable<JQuery<HTMLElement>>, 
    attr: string, 
    value?: string | RegExp
  ): this {
    if (value === undefined) {
      element.should('have.attr', attr);
    } else if (typeof value === 'string') {
      element.should('have.attr', attr, value);
    } else {
      element.invoke('attr', attr).should('match', value);
    }
    return this;
  }

  /**
   * Take a screenshot with context
   */
  screenshot(name: string): this {
    // Ensure page is visible before taking screenshot
    cy.get('body').should('be.visible');
    cy.screenshot(`${this.constructor.name}-${name}`);
    return this;
  }

  /**
   * Scroll to element
   */
  protected scrollTo(element: Cypress.Chainable<JQuery<HTMLElement>>): this {
    element.scrollIntoView();
    return this;
  }
}
