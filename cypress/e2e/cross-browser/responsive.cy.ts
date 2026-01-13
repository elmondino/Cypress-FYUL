import testData from '../../fixtures/testData.json';

/**
 * Responsive Design Tests
 * Tests across mobile, tablet, and desktop viewports
 * Uses content-based selectors as site does not use semantic HTML
 */
describe('Responsive Design', () => {
  const viewports = testData.viewports;

  Object.entries(viewports).forEach(([device, size]) => {
    describe(`${device} (${size.width}x${size.height})`, () => {
      beforeEach(() => {
        cy.viewport(size.width, size.height);
        cy.visit('/');
        cy.waitForPageReady();
      });

      it('should display navigation links', () => {
        // Site uses link-based navigation, not semantic <nav>
        cy.contains('a', 'About').should('exist');
        cy.contains('a', 'Leadership').should('exist');
      });

      it('should display main content', () => {
        cy.get('body').should('be.visible');
        cy.contains('FYUL').should('be.visible');
      });

      it('should display footer links', () => {
        // Site uses links in footer area, not semantic <footer>
        cy.contains('a', 'Privacy Policy').should('exist');
      });
    });
  });
});
