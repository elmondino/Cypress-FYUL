/**
 * Cross-Browser Compatibility Tests
 * 
 * Test Suite: Ensures the website works across different browsers
 */

import HomePage from '../../pages/HomePage';

describe('Cross-Browser Compatibility', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    cy.log(`Testing on: ${Cypress.browser.name} ${Cypress.browser.version}`);
    homePage.visit();
  });

  it('should load correctly in current browser', () => {
    homePage.verifyPageLoaded();
    homePage.verifyAllSections();
  });

  it('should handle CSS and styling correctly', () => {
    cy.get('body').should('be.visible').and('have.css', 'display');
  });

  it('should render all images', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('be.visible').and(($el) => {
        expect($el[0].naturalWidth).to.be.greaterThan(0);
      });
    });
  });

  it('should execute JavaScript correctly', () => {
    cy.window().should('have.property', 'document');
    cy.document().should('have.property', 'readyState', 'complete');
  });
});

describe('Browser-Specific Features', () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it('should handle scrolling', () => {
    cy.scrollTo('bottom', { duration: 1000 });
    cy.scrollTo('top', { duration: 1000 });
  });

  it('should handle window resize', () => {
    cy.viewport(1920, 1080);
    homePage.verifyPageLoaded();
    cy.viewport(375, 667);
    homePage.verifyPageLoaded();
  });

  it('should maintain state during navigation', () => {
    homePage.clickAboutLink();
    cy.goBack();
    homePage.verifyPageLoaded();
  });
});
