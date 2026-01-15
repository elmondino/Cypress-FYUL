describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageReady();
  });

  describe('Page Load', () => {
    it('should load successfully', () => {
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.title().should('match', /FYUL/i);
      cy.get('h1, h2').should('have.length.gte', 1);
    });
  });

  describe('Navigation', () => {
    it('should have all main navigation links', () => {
      cy.contains('a', 'About').should('be.visible');
      cy.contains('a', 'Leadership').should('be.visible');
      cy.contains('a', 'Careers').should('be.visible');
    });

    it('should navigate to key pages', () => {
      cy.contains('a', 'About').click();
      cy.url().should('include', '/about');
      cy.go('back');
      
      cy.contains('a', 'Leadership').click();
      cy.url().should('include', '/leadership');
    });
  });

  describe('Brand Section', () => {
    it('should display all three brand names', () => {
      cy.contains('Printify').should('be.visible');
      cy.contains('Printful').should('be.visible');
      cy.contains('Snow Commerce').should('be.visible');
    });

    it('should have working brand links', () => {
      cy.get('a[href*="printful.com"]').should('exist');
      cy.get('a[href*="printify.com"]').should('exist');
      cy.get('a[href*="snowcommerce.com"]').should('exist');
    });
  });

  describe('Call-to-Actions', () => {
    it('should have careers CTA link', () => {
      cy.get('a[href*="careers"]')
        .should('be.visible')
        .and('have.attr', 'href')
        .and('match', /careers/);
    });

    it('should have leadership CTA', () => {
      cy.contains('a', 'leadership')
        .should('exist')
        .click();
      cy.url().should('include', '/leadership');
    });
  });

  describe('Footer', () => {
    it('should display footer with all required links', () => {
      cy.get('footer').should('be.visible');
      
      cy.get('footer').within(() => {
        cy.contains('a', 'About').should('exist');
        cy.contains('a', 'Leadership').should('exist');
        cy.contains('a', 'Privacy Policy').should('exist');
      });
    });

    it('should have brand links in footer', () => {
      cy.get('footer a[href*="printful"]').should('exist');
      cy.get('footer a[href*="printify"]').should('exist');
      cy.get('footer a[href*="snowcommerce"]').should('exist');
    });
  });

  describe('SEO & Performance', () => {
    it('should have valid SEO elements', () => {
      cy.validateSEO();
    });

    it('should meet performance thresholds', () => {
      cy.checkPerformance({
        maxLoadTime: 5000,
        maxDomContentLoaded: 3000
      });
    });
  });
});
