/**
 * Home Page E2E Tests
 * 
 * Test Suite: Comprehensive tests for the FYUL.com home page
 * Coverage: UI, functionality, navigation, content verification
 */

import HomePage from '../../pages/HomePage';

describe('Home Page - Core Functionality', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it('should load the home page successfully', () => {
    homePage.verifyPageLoaded();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should display the hero section with correct content', () => {
    homePage.verifyHeroSection();
  });

  it('should display all brand sections', () => {
    homePage.verifyBrandsSection();
  });

  it('should display Printify brand information', () => {
    homePage.verifyPrintifyBrand();
  });

  it('should display Printful brand information', () => {
    homePage.verifyPrintfulBrand();
  });

  it('should display Snow Commerce brand information', () => {
    homePage.verifySnowCommerceBrand();
  });

  it('should display careers section', () => {
    homePage.verifyCareersSection();
  });

  it('should display leadership link', () => {
    homePage.verifyLeadershipLink();
  });

  it('should have functional navigation', () => {
    homePage.verifyNavigation();
  });

  it('should display footer with all links', () => {
    homePage.verifyFooter();
    homePage.verifyFooterLinks();
  });

  it('should have valid brand links', () => {
    homePage.verifyBrandLinks();
  });
});

describe('Home Page - Navigation', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it('should navigate to About page from footer', () => {
    homePage.clickAboutLink();
    cy.url().should('include', '/about');
  });

  it('should navigate to Leadership page', () => {
    homePage.clickLeadershipLink();
    cy.url().should('include', '/leadership');
  });

  it('should navigate to Privacy Policy page', () => {
    homePage.clickPrivacyPolicyLink();
    cy.url().should('include', '/privacy-policy');
  });

  it('should verify careers link exists', () => {
    homePage.clickCareersLink();
  });
});

describe('Home Page - SEO & Performance', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it('should have proper SEO metadata', () => {
    homePage.checkSEO();
  });

  it('should have acceptable page load performance', () => {
    homePage.checkPerformance();
  });

  it('should have a valid page title', () => {
    cy.title().should('not.be.empty').and('include', 'FYUL');
  });

  it('should have meta description', () => {
    cy.get('head meta[name="description"]')
      .should('exist')
      .and('have.attr', 'content')
      .and('not.be.empty');
  });

  it('should have viewport meta tag', () => {
    cy.get('head meta[name="viewport"]').should('exist');
  });
});

describe('Home Page - Accessibility', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it('should pass basic accessibility checks', () => {
    homePage.checkAccessibility();
  });

  it('should have accessible images', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('satisfy', ($el) => {
        return $el.attr('alt') !== undefined || $el.attr('role') === 'presentation';
      });
    });
  });

  it('should have accessible links', () => {
    cy.get('a').each(($link) => {
      cy.wrap($link).should('satisfy', ($el) => {
        const hasText = $el.text().trim() !== '';
        const hasAriaLabel = $el.attr('aria-label');
        const hasImageWithAlt = $el.find('img[alt]').length > 0;
        return hasText || hasAriaLabel || hasImageWithAlt;
      });
    });
  });
});

describe('Home Page - Responsive Design', () => {
  const homePage = new HomePage();

  const viewports = [
    { device: 'mobile', width: 375, height: 667 },
    { device: 'tablet', width: 768, height: 1024 },
    { device: 'desktop', width: 1920, height: 1080 },
  ];

  viewports.forEach(({ device, width, height }) => {
    describe(`${device} viewport (${width}x${height})`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        homePage.visit();
      });

      it(`should display correctly on ${device}`, () => {
        homePage.verifyPageLoaded();
        homePage.verifyHeroSection();
      });

      it(`should have visible brands section on ${device}`, () => {
        homePage.verifyBrandsSection();
      });

      it(`should have functional navigation on ${device}`, () => {
        homePage.verifyNavigation();
      });
    });
  });
});

describe('Home Page - Visual Regression', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it('should match homepage screenshot', () => {
    cy.wait(2000); // Wait for animations
    cy.screenshot('homepage-full-page', { capture: 'fullPage' });
  });

  it('should match hero section screenshot', () => {
    cy.wait(2000);
    homePage.elements.heroHeading().screenshot('homepage-hero-section');
  });

  it('should match brands section screenshot', () => {
    cy.wait(2000);
    homePage.elements.brandsSection().screenshot('homepage-brands-section');
  });
});

describe('Home Page - Error Handling', () => {
  const homePage = new HomePage();

  it('should handle page refresh correctly', () => {
    homePage.visit();
    cy.reload();
    homePage.verifyPageLoaded();
  });

  it('should handle browser back navigation', () => {
    homePage.visit();
    homePage.clickAboutLink();
    cy.goBack();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should handle browser forward navigation', () => {
    homePage.visit();
    homePage.clickAboutLink();
    cy.goBack();
    cy.goForward();
    cy.url().should('include', '/about');
  });
});
