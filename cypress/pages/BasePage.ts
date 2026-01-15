/**
 * Abstract base class for Page Object Model pattern.
 * All page objects extend this class to inherit common functionality.
 */
export abstract class BasePage {
  protected abstract readonly path: string;
  protected abstract readonly pageTitle: RegExp | string;

  visit(): this {
    cy.visit(this.path);
    this.waitForPageReady();
    return this;
  }

  waitForPageReady(): this {
    cy.document().its('readyState').should('eq', 'complete');
    cy.get('body').should('be.visible');
    return this;
  }

  verifyPageLoaded(): this {
    cy.url().should('include', this.path);
    if (typeof this.pageTitle === 'string') {
      cy.title().should('include', this.pageTitle);
    } else {
      cy.title().should('match', this.pageTitle);
    }
    return this;
  }

  protected getByTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(`[data-testid="${testId}"]`);
  }

  protected getByRole(
    role: string, 
    options?: { name?: string | RegExp }
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    const selector = options?.name 
      ? `[role="${role}"][aria-label*="${options.name}"], [role="${role}"]:contains("${options.name}")`
      : `[role="${role}"]`;
    return cy.get(selector);
  }

  protected safeClick(element: Cypress.Chainable<JQuery<HTMLElement>>): this {
    element.should('be.visible').click();
    return this;
  }

  protected assertVisible(element: Cypress.Chainable<JQuery<HTMLElement>>): this {
    element.should('be.visible');
    return this;
  }

  protected assertText(
    element: Cypress.Chainable<JQuery<HTMLElement>>, 
    text: string | RegExp
  ): this {
    if (typeof text === 'string') {
      element.should('contain.text', text);
    } else {
      element.invoke('text').should('match', text);
    }
    return this;
  }

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

  screenshot(name: string): this {
    cy.get('body').should('be.visible');
    cy.screenshot(`${this.constructor.name}-${name}`);
    return this;
  }

  protected scrollTo(element: Cypress.Chainable<JQuery<HTMLElement>>): this {
    element.scrollIntoView();
    return this;
  }
}
