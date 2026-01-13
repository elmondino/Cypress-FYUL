import { BasePage } from './BasePage';

/**
 * AboutPage - Page Object for FYUL.com about page
 * Uses content-based selectors as site does not use semantic HTML
 */
export class AboutPage extends BasePage {
  protected readonly path = '/about';
  protected readonly pageTitle = /About|FYUL/i;

  verifyPageLoaded(): this {
    cy.url().should('include', '/about');
    return this;
  }

  verifyHeading(): this {
    // Check for main heading text
    cy.contains('h2', 'For FYUL to power all eCommerce merchandise', { timeout: 10000 })
      .should('be.visible');
    return this;
  }

  verifyVision(): this {
    // Check for vision section
    cy.contains('Our vision').should('be.visible');
    return this;
  }

  verifyContent(): this {
    // Verify key content exists on page
    cy.contains('FYUL').should('be.visible');
    cy.contains('on-demand').should('exist');
    return this;
  }

  verifyHistorySection(): this {
    cy.contains('Our history').should('be.visible');
    return this;
  }

  verifyJoinSection(): this {
    cy.contains('Join us').should('be.visible');
    return this;
  }
}

export default AboutPage;
