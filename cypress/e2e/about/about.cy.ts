describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about');
    cy.waitForPageReady();
  });

  describe('Page Load', () => {
    it('should load successfully', () => {
      cy.url().should('include', '/about');
      cy.get('h1, h2').should('exist');
    });
  });

  describe('Core Content', () => {
    it('should display vision section', () => {
      cy.contains(/vision|mission/i).should('be.visible');
    });

    it('should have substantial content', () => {
      cy.get('body').invoke('text').should('have.length.gt', 500);
    });
  });

  describe('Company Timeline', () => {
    it('should display history section', () => {
      cy.contains(/history|timeline/i).should('be.visible');
    });

    it('should show key milestone years', () => {
      // Check for year markers without being specific about all details
      cy.contains(/201[0-9]|202[0-9]/).should('exist');
    });
  });

  describe('Careers CTA', () => {
    it('should have careers link', () => {
      cy.get('a[href*="careers"]')
        .should('be.visible')
        .and('have.attr', 'href')
        .and('match', /careers/);
    });
  });
});
