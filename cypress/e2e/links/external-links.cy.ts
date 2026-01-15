describe('External Links', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageReady();
  });

  describe('Critical External Links', () => {
    it('should have social media links', () => {
      cy.get('a[href*="instagram.com"], a[href*="linkedin.com"]')
        .should('have.length.gte', 1);
    });

    it('external links should open in new tab', () => {
      cy.get('a[href*="instagram.com"], a[href*="linkedin.com"]')
        .should('have.attr', 'target', '_blank');
    });

    it('should validate one external link is accessible', () => {
      cy.get('a[href^="https://"]')
        .first()
        .should('have.attr', 'href')
        .then((href) => {
          cy.request({
            url: href,
            failOnStatusCode: false,
            timeout: 10000
          }).then((response) => {
            expect(response.status).to.be.oneOf([200, 301, 302, 999]);
          });
        });
    });
  });

  describe('Footer Links', () => {
    it('should have privacy policy link', () => {
      cy.get('footer a[href*="privacy"]').should('exist');
    });

    it('should have careers link', () => {
      cy.get('a[href*="careers"]').should('exist');
    });

    it('all footer links should have href attribute', () => {
      cy.get('footer a').each(($link) => {
        cy.wrap($link).should('have.attr', 'href').and('not.be.empty');
      });
    });
  });

  describe('Internal Navigation', () => {
    it('should not have broken internal links', () => {
      cy.get('a[href^="/"]').then($links => {
        const uniqueHrefs = [...new Set($links.map((i, el) => el.getAttribute('href')).get())];
        
        uniqueHrefs.slice(0, 5).forEach(href => {
          cy.request({
            url: href,
            failOnStatusCode: false
          }).then(response => {
            expect(response.status).to.not.eq(404);
          });
        });
      });
    });
  });
});

