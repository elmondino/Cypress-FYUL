import { BasePage } from './BasePage';

/**
 * HomePage - Page Object for FYUL.com home page
 * 
 * Note: FYUL.com doesn't use semantic HTML (nav, header, footer tags).
 * Selectors are content-based for reliability.
 */
export class HomePage extends BasePage {
  protected readonly path = '/';
  protected readonly pageTitle = /FYUL/i;

  // =====================
  // Element Getters (content-based selectors)
  // =====================

  private get heroHeading() {
    return cy.get('h1').first();
  }

  private get brandLinks() {
    return cy.get('a[href*="printify.com"], a[href*="printful.com"], a[href*="snowcommerce"]');
  }

  private get careersLink() {
    return cy.get('a[href*="careers"]').first();
  }

  private get leadershipLink() {
    return cy.get('a[href*="leadership"]').first();
  }

  private get aboutLink() {
    return cy.get('a[href*="/about"]').first();
  }

  private get privacyLink() {
    return cy.get('a[href*="privacy"]').first();
  }

  // =====================
  // Verification Methods
  // =====================

  verifyHeroSection(): this {
    this.heroHeading.should('be.visible');
    cy.contains('h1', /limitless|creativity/i).should('be.visible');
    return this;
  }

  verifyNavigation(): this {
    // Site doesn't have semantic nav - verify key links exist instead
    this.aboutLink.should('exist');
    this.leadershipLink.should('exist');
    return this;
  }

  verifyFooter(): this {
    // Site doesn't have semantic footer - verify footer content exists
    cy.contains('© 2025 FYUL').should('be.visible');
    this.privacyLink.should('exist');
    return this;
  }

  verifyBrandLinks(brands?: { name: string; urlPattern: RegExp }[]): this {
    if (brands) {
      brands.forEach(({ name, urlPattern }) => {
        cy.contains('a', name)
          .should('be.visible')
          .and('have.attr', 'href')
          .and('match', urlPattern);
      });
    } else {
      this.brandLinks.should('have.length.greaterThan', 0);
    }
    return this;
  }

  verifyCareersLink(): this {
    this.careersLink.should('be.visible').and('have.attr', 'href');
    return this;
  }

  verifyLeadershipLink(): this {
    this.leadershipLink.should('be.visible').and('have.attr', 'href');
    return this;
  }

  // =====================
  // Navigation Methods
  // =====================

  clickAboutLink(): this {
    this.aboutLink.click();
    this.waitForPageReady();
    return this;
  }

  clickLeadershipLink(): this {
    this.leadershipLink.click();
    this.waitForPageReady();
    return this;
  }

  clickPrivacyLink(): this {
    this.privacyLink.click();
    this.waitForPageReady();
    return this;
  }

  clickCareersLink(): this {
    this.careersLink.click();
    return this;
  }

  // =====================
  // Composite Verifications
  // =====================

  verifyAllSections(): this {
    this.verifyHeroSection();
    this.verifyNavigation();
    this.verifyBrandLinks();
    this.verifyFooter();
    return this;
  }
}

export default HomePage;
