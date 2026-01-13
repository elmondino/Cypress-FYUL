import { BasePage } from './BasePage';

/**
 * PrivacyPolicyPage - Page Object for FYUL.com privacy policy page
 * Uses content-based selectors as site does not use semantic HTML
 */
export class PrivacyPolicyPage extends BasePage {
  protected readonly path = '/privacy-policy';
  protected readonly pageTitle = /Privacy|FYUL/i;

  verifyPageLoaded(): this {
    cy.url().should('include', '/privacy-policy');
    return this;
  }

  verifyHeading(): this {
    // Check for privacy policy heading
    cy.contains('h2', 'Privacy policy', { timeout: 10000 })
      .should('be.visible');
    return this;
  }

  verifyContent(): this {
    // Verify key content exists
    cy.contains('Privacy Policy').should('exist');
    cy.contains('personal data').should('exist');
    return this;
  }

  verifySections(): this {
    // Verify numbered sections exist
    cy.contains('What personal data we process').should('be.visible');
    return this;
  }

  verifySection(sectionTitle: string): this {
    cy.contains(sectionTitle).should('be.visible');
    return this;
  }

  verifyContactInfo(): this {
    cy.contains('privacy@printful.com').should('exist');
    return this;
  }

  verifyRightsSection(): this {
    cy.contains('Your rights').should('be.visible');
    return this;
  }
}

export default PrivacyPolicyPage;
