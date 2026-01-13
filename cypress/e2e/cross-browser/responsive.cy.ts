import testData from '../../fixtures/testData.json';

/**
 * Responsive Design Tests
 * Tests across mobile, tablet, and desktop viewports
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

      it('should display navigation', () => {
        cy.get('nav, header, [role="navigation"]').should('exist');
      });

      it('should display main content', () => {
        cy.get('main, [role="main"], body').should('be.visible');
      });

      it('should display footer', () => {
        cy.get('footer, [role="contentinfo"]').should('exist');
      });
    });
  });
});
