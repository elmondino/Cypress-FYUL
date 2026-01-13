/**
 * Privacy Policy Page E2E Tests
 * 
 * Test Suite: Comprehensive tests for the FYUL.com Privacy Policy page
 */

import PrivacyPolicyPage from '../../pages/PrivacyPolicyPage';
import HomePage from '../../pages/HomePage';

describe('Privacy Policy Page - Core Functionality', () => {
  const privacyPage = new PrivacyPolicyPage();

  beforeEach(() => {
    privacyPage.visit();
  });

  it('should load the privacy policy page successfully', () => {
    privacyPage.verifyPageLoaded();
  });

  it('should display page heading', () => {
    privacyPage.verifyHeading();
  });

  it('should display policy content', () => {
    privacyPage.verifyPolicyContent();
  });

  it('should have navigation', () => {
    privacyPage.verifyNavigation();
  });

  it('should display footer', () => {
    privacyPage.verifyFooter();
  });
});

describe('Privacy Policy Page - Content Verification', () => {
  const privacyPage = new PrivacyPolicyPage();

  beforeEach(() => {
    privacyPage.visit();
  });

  it('should contain privacy-related content', () => {
    cy.get('body').should('satisfy', ($body) => {
      const text = $body.text().toLowerCase();
      return text.includes('privacy') || text.includes('policy') || text.includes('data');
    });
  });

  it('should have substantial content', () => {
    privacyPage.verifyPolicyContent();
  });
});

describe('Privacy Policy Page - Navigation', () => {
  const privacyPage = new PrivacyPolicyPage();

  it('should navigate to privacy policy from home', () => {
    const homePage = new HomePage();
    homePage.visit();
    homePage.clickPrivacyPolicyLink();
    cy.url().should('include', '/privacy-policy');
  });

  it('should have link back to home', () => {
    privacyPage.visit();
    cy.get('a[href="/"], a[href="https://www.fyul.com"]').should('exist');
  });
});

describe('Privacy Policy Page - SEO', () => {
  const privacyPage = new PrivacyPolicyPage();

  beforeEach(() => {
    privacyPage.visit();
  });

  it('should have proper SEO metadata', () => {
    privacyPage.checkSEO();
  });

  it('should have a valid page title', () => {
    cy.title().should('not.be.empty');
  });
});

describe('Privacy Policy Page - Accessibility', () => {
  const privacyPage = new PrivacyPolicyPage();

  beforeEach(() => {
    privacyPage.visit();
  });

  it('should pass basic accessibility checks', () => {
    privacyPage.checkAccessibility();
  });
});

describe('Privacy Policy Page - Responsive Design', () => {
  const privacyPage = new PrivacyPolicyPage();

  const viewports = [
    { device: 'mobile', width: 375, height: 667 },
    { device: 'tablet', width: 768, height: 1024 },
    { device: 'desktop', width: 1920, height: 1080 },
  ];

  viewports.forEach(({ device, width, height }) => {
    it(`should display correctly on ${device}`, () => {
      cy.viewport(width, height);
      privacyPage.visit();
      privacyPage.verifyPageLoaded();
      privacyPage.verifyPolicyContent();
    });
  });
});
