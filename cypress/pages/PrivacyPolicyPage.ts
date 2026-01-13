import { BasePage } from './BasePage';

/**
 * PrivacyPolicyPage - Page Object for FYUL.com privacy policy page
 */
export class PrivacyPolicyPage extends BasePage {
  protected readonly path = '/privacy-policy';
  protected readonly pageTitle = /Privacy|FYUL/i;

  private readonly selectors = {
    heading: '[data-testid="privacy-heading"], h1',
    content: '[data-testid="privacy-content"], main, article',
    sections: '[data-testid="privacy-section"], section, h2',
  };

  private get heading() {
    return cy.get(this.selectors.heading).first();
  }

  private get content() {
    return cy.get(this.selectors.content).first();
  }

  private get sections() {
    return cy.get(this.selectors.sections);
  }

  verifyHeading(): this {
    this.heading.should('be.visible');
    return this;
  }

  verifyContent(): this {
    this.content.should('be.visible');
    return this;
  }

  verifySections(): this {
    this.sections.should('have.length.greaterThan', 0);
    return this;
  }

  verifySection(sectionTitle: string): this {
    cy.contains('h2, h3', sectionTitle).should('be.visible');
    return this;
  }
}

export default PrivacyPolicyPage;
