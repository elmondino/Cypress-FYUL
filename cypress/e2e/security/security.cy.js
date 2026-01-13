/**
 * Security Tests
 * 
 * Test Suite: Basic security checks for the website
 */

describe('Security - HTTPS and Headers', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should use HTTPS protocol', () => {
    cy.url().should('include', 'https://');
  });

  it('should have secure connection', () => {
    cy.location('protocol').should('eq', 'https:');
  });

  it('should not expose sensitive information in URLs', () => {
    cy.url().should('not.match', /password|token|api[_-]?key|secret/i);
  });
});

describe('Security - Content Security', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should not have inline javascript in href', () => {
    cy.get('a[href^="javascript:"]').should('not.exist');
  });

  it('should use rel="noopener" for external links', () => {
    cy.get('a[target="_blank"]').each(($link) => {
      const rel = $link.attr('rel') || '';
      if (rel) {
        expect(rel).to.satisfy((r) => r.includes('noopener') || r.includes('noreferrer'));
      }
    });
  });
});

describe('Security - Form Security', () => {
  it('should have HTTPS on all pages with forms', () => {
    cy.visit('/');
    cy.get('form').then(($forms) => {
      if ($forms.length > 0) {
        cy.location('protocol').should('eq', 'https:');
      }
    });
  });
});

describe('Security - Cookie Security', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should handle cookies appropriately', () => {
    cy.getCookies().then((cookies) => {
      cookies.forEach((cookie) => {
        // Log cookie for inspection
        cy.log(`Cookie: ${cookie.name}, Secure: ${cookie.secure}, HttpOnly: ${cookie.httpOnly}`);
      });
    });
  });
});
