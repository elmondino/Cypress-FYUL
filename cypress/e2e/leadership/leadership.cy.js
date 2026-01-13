/**
 * Leadership Page E2E Tests
 * 
 * Test Suite: Comprehensive tests for the FYUL.com Leadership page
 */

import LeadershipPage from '../../pages/LeadershipPage';
import HomePage from '../../pages/HomePage';

describe('Leadership Page - Core Functionality', () => {
  const leadershipPage = new LeadershipPage();

  beforeEach(() => {
    leadershipPage.visit();
  });

  it('should load the leadership page successfully', () => {
    leadershipPage.verifyPageLoaded();
  });

  it('should display page heading', () => {
    leadershipPage.verifyHeading();
  });

  it('should display leadership team information', () => {
    leadershipPage.verifyLeadershipTeam();
  });

  it('should have navigation', () => {
    leadershipPage.verifyNavigation();
  });

  it('should display footer', () => {
    leadershipPage.verifyFooter();
  });
});

describe('Leadership Page - Navigation', () => {
  const leadershipPage = new LeadershipPage();

  beforeEach(() => {
    leadershipPage.visit();
  });

  it('should navigate to leadership page from home', () => {
    const homePage = new HomePage();
    homePage.visit();
    homePage.clickLeadershipLink();
    cy.url().should('include', '/leadership');
  });

  it('should have link back to home', () => {
    cy.get('a[href="/"], a[href="https://www.fyul.com"]').should('exist');
  });
});

describe('Leadership Page - SEO', () => {
  const leadershipPage = new LeadershipPage();

  beforeEach(() => {
    leadershipPage.visit();
  });

  it('should have proper SEO metadata', () => {
    leadershipPage.checkSEO();
  });

  it('should have a valid page title', () => {
    cy.title().should('not.be.empty');
  });
});

describe('Leadership Page - Accessibility', () => {
  const leadershipPage = new LeadershipPage();

  beforeEach(() => {
    leadershipPage.visit();
  });

  it('should pass basic accessibility checks', () => {
    leadershipPage.checkAccessibility();
  });
});

describe('Leadership Page - Responsive Design', () => {
  const leadershipPage = new LeadershipPage();

  const viewports = [
    { device: 'mobile', width: 375, height: 667 },
    { device: 'tablet', width: 768, height: 1024 },
    { device: 'desktop', width: 1920, height: 1080 },
  ];

  viewports.forEach(({ device, width, height }) => {
    it(`should display correctly on ${device}`, () => {
      cy.viewport(width, height);
      leadershipPage.visit();
      leadershipPage.verifyPageLoaded();
      leadershipPage.verifyLeadershipTeam();
    });
  });
});

describe('Leadership Page - Content Verification', () => {
  const leadershipPage = new LeadershipPage();

  beforeEach(() => {
    leadershipPage.visit();
  });

  it('should display leadership-related content', () => {
    cy.get('body').should('contain.text', 'leadership').or('contain.text', 'team');
  });
});
