import { HomePage } from '../../pages';
import testData from '../../fixtures/testData.json';

/**
 * Home Page E2E Tests
 * Clean, focused tests using Page Object Model and fixtures
 */
describe('Home Page', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  describe('Page Load', () => {
    it('should load successfully with correct title', () => {
      homePage.verifyPageLoaded();
      cy.title().should('match', /FYUL/i);
    });
  });

  describe('Hero Section', () => {
    it('should display hero content', () => {
      homePage.verifyHeroSection();
    });
  });

  describe('Navigation', () => {
    it('should display navigation', () => {
      homePage.verifyNavigation();
    });

    it('should navigate to About page', () => {
      homePage.clickAboutLink();
      cy.url().should('include', testData.pages.about.path);
    });

    it('should navigate to Leadership page', () => {
      homePage.clickLeadershipLink();
      cy.url().should('include', testData.pages.leadership.path);
    });

    it('should navigate to Privacy page', () => {
      homePage.clickPrivacyLink();
      cy.url().should('include', testData.pages.privacy.path);
    });
  });

  describe('Brands Section', () => {
    it('should display brand cards', () => {
      homePage.verifyBrandsSection();
    });

    it('should have valid brand links', () => {
      const brands = testData.brands.map((brand) => ({
        name: brand.name,
        urlPattern: new RegExp(brand.urlPattern),
      }));
      homePage.verifyBrandLinks(brands);
    });
  });

  describe('Footer', () => {
    it('should display footer with links', () => {
      homePage.verifyFooter();
    });
  });

  describe('Careers', () => {
    it('should have careers link', () => {
      homePage.verifyCareersLink();
    });
  });
});

describe('Home Page - SEO & Performance', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageReady();
  });

  it('should have valid SEO elements', () => {
    cy.validateSEO();
  });

  it('should meet performance thresholds', () => {
    cy.checkPerformance(testData.performance);
  });
});

describe('Home Page - Accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageReady();
  });

  it('should pass basic accessibility checks', () => {
    cy.checkAccessibility();
  });
});
