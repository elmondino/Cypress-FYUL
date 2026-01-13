/**
 * Site-Wide Integration Tests
 * 
 * Test Suite: Tests that cover multiple pages and user journeys
 */

import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';
import LeadershipPage from '../../pages/LeadershipPage';
import PrivacyPolicyPage from '../../pages/PrivacyPolicyPage';

describe('Site-Wide Navigation Flow', () => {
  const homePage = new HomePage();
  const aboutPage = new AboutPage();
  const leadershipPage = new LeadershipPage();
  const privacyPage = new PrivacyPolicyPage();

  it('should navigate through all main pages', () => {
    // Start at home
    homePage.visit();
    homePage.verifyPageLoaded();

    // Navigate to About
    homePage.clickAboutLink();
    aboutPage.verifyPageLoaded();

    // Navigate back to home
    cy.visit('/');
    homePage.verifyPageLoaded();

    // Navigate to Leadership
    homePage.clickLeadershipLink();
    leadershipPage.verifyPageLoaded();

    // Navigate back to home
    cy.visit('/');
    homePage.verifyPageLoaded();

    // Navigate to Privacy Policy
    homePage.clickPrivacyPolicyLink();
    privacyPage.verifyPageLoaded();
  });

  it('should maintain consistent header/footer across pages', () => {
    const pages = [
      { page: homePage, url: '/' },
      { page: aboutPage, url: '/about' },
      { page: leadershipPage, url: '/leadership' },
      { page: privacyPage, url: '/privacy-policy' },
    ];

    pages.forEach(({ page, url }) => {
      cy.visit(url);
      cy.waitForPageLoad();
      page.verifyNavigation();
      page.verifyFooter();
    });
  });
});

describe('User Journey - Exploring Company Information', () => {
  const homePage = new HomePage();
  const aboutPage = new AboutPage();
  const leadershipPage = new LeadershipPage();

  it('should complete journey: Home → About → Leadership', () => {
    // User starts at home page
    homePage.visit();
    homePage.verifyPageLoaded();
    homePage.verifyBrandsSection();

    // User wants to learn more about company
    homePage.clickAboutLink();
    aboutPage.verifyPageLoaded();
    aboutPage.verifyContent();

    // User wants to meet the leadership team
    cy.visit('/');
    homePage.clickLeadershipLink();
    leadershipPage.verifyPageLoaded();
    leadershipPage.verifyLeadershipTeam();
  });
});

describe('User Journey - Brand Discovery', () => {
  const homePage = new HomePage();

  it('should discover all brands from home page', () => {
    homePage.visit();
    homePage.verifyPageLoaded();

    // Verify all brands are visible
    homePage.verifyPrintifyBrand();
    homePage.verifyPrintfulBrand();
    homePage.verifySnowCommerceBrand();

    // Verify brand links are accessible
    homePage.verifyBrandLinks();
  });
});

describe('Site-Wide SEO Validation', () => {
  const pages = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Leadership', url: '/leadership' },
    { name: 'Privacy Policy', url: '/privacy-policy' },
  ];

  pages.forEach(({ name, url }) => {
    describe(`${name} Page SEO`, () => {
      beforeEach(() => {
        cy.visit(url);
        cy.waitForPageLoad();
      });

      it(`should have valid SEO on ${name} page`, () => {
        cy.validateSEO();
      });

      it(`should have unique title on ${name} page`, () => {
        cy.title().should('not.be.empty');
      });

      it(`should have meta description on ${name} page`, () => {
        cy.get('head meta[name="description"]').should('exist');
      });
    });
  });
});

describe('Site-Wide Accessibility', () => {
  const pages = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Leadership', url: '/leadership' },
    { name: 'Privacy Policy', url: '/privacy-policy' },
  ];

  pages.forEach(({ name, url }) => {
    describe(`${name} Page Accessibility`, () => {
      beforeEach(() => {
        cy.visit(url);
        cy.waitForPageLoad();
      });

      it(`should pass accessibility checks on ${name} page`, () => {
        cy.checkA11yBasics();
      });
    });
  });
});

describe('Site-Wide Performance', () => {
  const pages = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Leadership', url: '/leadership' },
    { name: 'Privacy Policy', url: '/privacy-policy' },
  ];

  pages.forEach(({ name, url }) => {
    it(`should load ${name} page within acceptable time`, () => {
      const startTime = Date.now();
      cy.visit(url);
      cy.waitForPageLoad();
      const loadTime = Date.now() - startTime;

      cy.log(`${name} page load time: ${loadTime}ms`);
      expect(loadTime).to.be.lessThan(10000); // 10 seconds max
    });
  });
});

describe('External Links Validation', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it('should have valid external brand links', () => {
    const brandLinks = [
      { name: 'Printify', domain: 'printify.com' },
      { name: 'Printful', domain: 'printful.com' },
      { name: 'Snow Commerce', domain: 'snowcommerce.com' },
    ];

    brandLinks.forEach(({ name, domain }) => {
      cy.contains('a', name)
        .should('have.attr', 'href')
        .and('include', domain);
    });
  });

  it('should have valid careers link', () => {
    cy.contains('a', /careers|explore our open roles/i)
      .should('have.attr', 'href')
      .and('not.be.empty');
  });
});
