/**
 * ============================================================================
 * PrivacyPolicyPage.ts - Page Object for the Privacy Policy Page
 * ============================================================================
 * 
 * Privacy/legal pages are important to test because:
 * - They're legally required and must be accessible
 * - They often get forgotten and broken by deployments
 * - They demonstrate that legal content is properly displayed
 * 
 * ============================================================================
 */

import { BasePage } from './BasePage';

/**
 * PrivacyPolicyPage - Represents the FYUL Privacy Policy page.
 * 
 * Note the path is '/privacy-policy' not '/privacy'.
 * Always verify actual URLs in the browser before writing page objects!
 */
export class PrivacyPolicyPage extends BasePage {
  protected readonly path = '/privacy-policy';
  protected readonly pageTitle = /Privacy|FYUL/i;

  // ============================================================================
  // VERIFICATION METHODS
  // ============================================================================

  /**
   * Verify page loaded correctly.
   * 
   * @returns {this} - For method chaining
   */
  verifyPageLoaded(): this {
    cy.url().should('include', '/privacy-policy');
    return this;
  }

  /**
   * Verify the main heading is displayed.
   * 
   * @returns {this} - For method chaining
   */
  verifyHeading(): this {
    cy.contains('h2', 'Privacy policy', { timeout: 10000 })
      .should('be.visible');
    return this;
  }

  /**
   * Verify key content exists on the page.
   * 
   * For legal pages, we verify that important terms are present
   * without testing every paragraph.
   * 
   * @returns {this} - For method chaining
   */
  verifyContent(): this {
    cy.contains('Privacy Policy').should('exist');
    cy.contains('personal data').should('exist');
    return this;
  }

  /**
   * Verify policy sections are displayed.
   * 
   * Privacy policies typically have numbered sections.
   * We check that at least one key section exists.
   * 
   * @returns {this} - For method chaining
   */
  verifySections(): this {
    cy.contains('What personal data we process').should('be.visible');
    return this;
  }

  /**
   * Verify a specific section exists.
   * 
   * PARAMETERIZED METHOD:
   * Accept section title as parameter for flexible verification.
   * 
   * @param {string} sectionTitle - The section heading to find
   * @returns {this} - For method chaining
   */
  verifySection(sectionTitle: string): this {
    cy.contains(sectionTitle).should('be.visible');
    return this;
  }

  /**
   * Verify contact information is present.
   * 
   * Privacy policies typically include contact details for data inquiries.
   * 
   * @returns {this} - For method chaining
   */
  verifyContactInfo(): this {
    cy.contains('privacy@printful.com').should('exist');
    return this;
  }

  /**
   * Verify the user rights section exists.
   * 
   * GDPR and similar regulations require explaining user rights.
   * 
   * @returns {this} - For method chaining
   */
  verifyRightsSection(): this {
    cy.contains('Your rights').should('be.visible');
    return this;
  }
}

export default PrivacyPolicyPage;
