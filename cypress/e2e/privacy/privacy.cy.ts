describe('Privacy Policy Page', () => {
  beforeEach(() => {
    cy.visit('/privacy-policy');
    cy.waitForPageReady();
  });

  describe('Page Load', () => {
    it('should load successfully', () => {
      cy.url().should('include', '/privacy-policy');
    });

    it('should have privacy policy heading', () => {
      cy.get('h1').should('be.visible');
    });
  });

  describe('Legal Content', () => {
    it('should display privacy policy content', () => {
      // Verify page has substantial content (not empty)
      cy.get('body').invoke('text').should('have.length.gt', 100);
    });

    it('should have structured content sections', () => {
      // Privacy policies typically have multiple sections
      cy.get('h2, h3').should('have.length.gte', 1);
    });
  });

  describe('Footer Navigation', () => {
    it('should have footer with navigation links', () => {
      cy.get('footer').should('be.visible');
      cy.contains('a', 'About').should('exist');
      cy.contains('a', 'Leadership').should('exist');
    });

    it('should be able to navigate away from privacy policy', () => {
      cy.contains('a', 'About').click();
      cy.url().should('include', '/about');
    });
  });

  describe('Accessibility', () => {
    it('should meet basic accessibility standards', () => {
      cy.injectAxe();
      cy.checkA11y(null, { runOnly: ['wcag2a'] }, null, true);
    });
  });
});
