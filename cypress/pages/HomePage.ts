import { BasePage } from './BasePage';

/**
 * Selectors interface for type safety
 * Using data-testid as primary, with fallbacks for sites without them
 */
interface HomePageSelectors {
  hero: string;
  heroHeading: string;
  navigation: string;
  footer: string;
  brandsSection: string;
  brandCards: string;
  careersSection: string;
  careersLink: string;
  leadershipLink: string;
  aboutLink: string;
  privacyLink: string;
}

/**
 * HomePage - Page Object for FYUL.com home page
 * Extends BasePage for common functionality
 */
export class HomePage extends BasePage {
  protected readonly path = '/';
  protected readonly pageTitle = /FYUL/i;

  /**
   * Selectors using data-testid first, with semantic fallbacks
   * Note: If site adds data-testid attributes, update these selectors
   */
  private readonly selectors: HomePageSelectors = {
    hero: '[data-testid="hero"], section:first-of-type, main > *:first-child',
    heroHeading: '[data-testid="hero-heading"], h1, [role="heading"][aria-level="1"]',
    navigation: '[data-testid="navigation"], nav, header, [role="navigation"]',
    footer: '[data-testid="footer"], footer, [role="contentinfo"]',
    brandsSection: '[data-testid="brands-section"], section:has(a[href*="printify"])',
    brandCards: '[data-testid="brand-card"], a[href*="printify.com"], a[href*="printful.com"], a[href*="snowcommerce"]',
    careersSection: '[data-testid="careers-section"], section:has(a[href*="careers"])',
    careersLink: '[data-testid="careers-link"], a[href*="careers"]',
    leadershipLink: '[data-testid="leadership-link"], a[href*="leadership"]',
    aboutLink: '[data-testid="about-link"], a[href*="about"]',
    privacyLink: '[data-testid="privacy-link"], a[href*="privacy"]',
  };

  // =====================
  // Element Getters
  // =====================

  private get hero() {
    return cy.get(this.selectors.hero).first();
  }

  private get heroHeading() {
    return cy.get(this.selectors.heroHeading).first();
  }

  private get navigation() {
    return cy.get(this.selectors.navigation).first();
  }

  private get footer() {
    return cy.get(this.selectors.footer).first();
  }

  private get brandsSection() {
    return cy.get(this.selectors.brandsSection).first();
  }

  private get brandCards() {
    return cy.get(this.selectors.brandCards);
  }

  private get careersLink() {
    return cy.get(this.selectors.careersLink).first();
  }

  private get leadershipLink() {
    return cy.get(this.selectors.leadershipLink).first();
  }

  private get aboutLink() {
    return cy.get(this.selectors.aboutLink).first();
  }

  private get privacyLink() {
    return cy.get(this.selectors.privacyLink).first();
  }

  // =====================
  // Verification Methods
  // =====================

  verifyHeroSection(): this {
    this.hero.should('be.visible');
    this.heroHeading.should('be.visible');
    return this;
  }

  verifyNavigation(): this {
    this.navigation.should('be.visible');
    return this;
  }

  verifyFooter(): this {
    this.footer.should('be.visible');
    this.footer.find('a').should('have.length.greaterThan', 0);
    return this;
  }

  verifyBrandsSection(): this {
    this.brandCards.should('have.length.greaterThan', 0);
    return this;
  }

  verifyBrandLinks(brands: { name: string; urlPattern: RegExp }[]): this {
    brands.forEach(({ name, urlPattern }) => {
      cy.contains('a', name)
        .should('be.visible')
        .and('have.attr', 'href')
        .and('match', urlPattern);
    });
    return this;
  }

  verifyCareersLink(): this {
    this.careersLink
      .should('be.visible')
      .and('have.attr', 'href');
    return this;
  }

  verifyLeadershipLink(): this {
    this.leadershipLink
      .should('be.visible')
      .and('have.attr', 'href');
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
    this.verifyBrandsSection();
    this.verifyFooter();
    return this;
  }
}

export default HomePage;
