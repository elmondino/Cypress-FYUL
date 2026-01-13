import { HomePage } from '../../pages';

/**
 * Visual Regression Tests
 * Captures snapshots for Percy comparison
 */
describe('Visual Regression', () => {
  const homePage = new HomePage();

  describe('Home Page', () => {
    beforeEach(() => {
      homePage.visit();
    });

    it('should match homepage visual baseline', () => {
      cy.visualSnapshot('Home Page');
    });

    it('should match homepage across viewports', () => {
      cy.visualSnapshotResponsive('Home Page');
    });
  });

  describe('About Page', () => {
    it('should match about page visual baseline', () => {
      cy.visit('/about');
      cy.waitForPageReady();
      cy.visualSnapshot('About Page');
    });
  });

  describe('Leadership Page', () => {
    it('should match leadership page visual baseline', () => {
      cy.visit('/leadership');
      cy.waitForPageReady();
      cy.visualSnapshot('Leadership Page');
    });
  });

  describe('Privacy Page', () => {
    it('should match privacy page visual baseline', () => {
      cy.visit('/privacy-policy');
      cy.waitForPageReady();
      cy.visualSnapshot('Privacy Policy Page');
    });
  });
});
