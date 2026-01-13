/**
 * About Page E2E Tests
 * 
 * Test Suite: Comprehensive tests for the FYUL.com About page
 */

import AboutPage from '../../pages/AboutPage';
import HomePage from '../../pages/HomePage';

describe('About Page - Core Functionality', () => {
  const aboutPage = new AboutPage();

  beforeEach(() => {
    aboutPage.visit();
  });

  it('should load the about page successfully', () => {
    aboutPage.verifyPageLoaded();
  });

  it('should display page heading', () => {
    aboutPage.verifyHeading();
  });

  it('should display main content', () => {
    aboutPage.verifyContent();
  });

  it('should have navigation', () => {
    aboutPage.verifyNavigation();
  });

  it('should display footer', () => {
    aboutPage.verifyFooter();
  });
});

describe('About Page - Navigation', () => {
  const aboutPage = new AboutPage();

  beforeEach(() => {
    aboutPage.visit();
  });

  it('should navigate to about page from home', () => {
    const homePage = new HomePage();
    homePage.visit();
    homePage.clickAboutLink();
    cy.url().should('include', '/about');
  });

  it('should navigate back to home page', () => {
    cy.contains('a', /home|fyul/i).first().click({ force: true });
    cy.waitForPageLoad();
  });
});

describe('About Page - SEO', () => {
  const aboutPage = new AboutPage();

  beforeEach(() => {
    aboutPage.visit();
  });

  it('should have proper SEO metadata', () => {
    aboutPage.checkSEO();
  });

  it('should have a valid page title', () => {
    cy.title().should('not.be.empty');
  });
});

describe('About Page - Accessibility', () => {
  const aboutPage = new AboutPage();

  beforeEach(() => {
    aboutPage.visit();
  });

  it('should pass basic accessibility checks', () => {
    aboutPage.checkAccessibility();
  });
});

describe('About Page - Responsive Design', () => {
  const aboutPage = new AboutPage();

  const viewports = [
    { device: 'mobile', width: 375, height: 667 },
    { device: 'tablet', width: 768, height: 1024 },
    { device: 'desktop', width: 1920, height: 1080 },
  ];

  viewports.forEach(({ device, width, height }) => {
    it(`should display correctly on ${device}`, () => {
      cy.viewport(width, height);
      aboutPage.visit();
      aboutPage.verifyPageLoaded();
      aboutPage.verifyContent();
    });
  });
});
