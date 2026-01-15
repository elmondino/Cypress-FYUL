describe('User Journeys', () => {
  describe('Critical Navigation Path', () => {
    it('should complete discovery journey: Home → About → Leadership', () => {
      cy.visit('/');
      cy.contains(/engine|creativity/i).should('be.visible');
      
      cy.contains('a', 'About').click();
      cy.url().should('include', '/about');
      cy.contains(/vision|mission/i).should('be.visible');
      
      cy.contains('a', 'Leadership').click();
      cy.url().should('include', '/leadership');
      cy.contains(/leadership|team|executive/i).should('be.visible');
    });

    it('should handle browser back button correctly', () => {
      cy.visit('/');
      cy.contains('a', 'About').click();
      cy.url().should('include', '/about');
      
      cy.go('back');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      
      cy.go('forward');
      cy.url().should('include', '/about');
    });
  });

  describe('Deep Links', () => {
    it('should handle direct navigation to any page', () => {
      cy.visit('/leadership');
      cy.contains(/leadership|team/i).should('be.visible');
      
      cy.visit('/about');
      cy.contains(/vision|mission/i).should('be.visible');
      
      cy.visit('/privacy');
      cy.contains(/privacy|policy/i).should('be.visible');
    });
  });
});

      cy.contains('Printful').should('be.visible');
      
      // Take action - explore careers
      cy.contains('Bring your skills. Bring your ideas').should('be.visible');
      cy.contains('a', 'Explore our open roles')
        .should('be.visible')
        .and('have.attr', 'href')
        .and('match', /careers\.fyul\.com/);
    });
  });
});
