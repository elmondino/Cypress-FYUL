describe('Leadership Page', () => {
  beforeEach(() => {
    cy.visit('/leadership');
    cy.waitForPageReady();
  });

  describe('Page Load', () => {
    it('should load successfully', () => {
      cy.url().should('include', '/leadership');
      cy.get('h1, h2').should('exist');
    });
  });

  describe('Team Structure', () => {
    it('should display executive team section', () => {
      cy.contains(/executive|team|leadership/i).should('be.visible');
      // Verify we have multiple team members (not checking exact names)
      cy.get('img, [role="img"]').should('have.length.gte', 5);
    });

    it('should display board members section', () => {
      cy.contains(/board/i).should('be.visible');
    });
  });

  describe('LinkedIn Integration', () => {
    it('should have LinkedIn profile links', () => {
      cy.get('a[href*="linkedin.com"]')
        .should('have.length.gte', 3)
        .first()
        .should('have.attr', 'target', '_blank');
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

  describe('Images', () => {
    it('team member images should load successfully', () => {
      cy.get('img').should('have.length.gte', 1);
      cy.get('img').first().should('be.visible')
        .and(($img) => {
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    });
  });
});
