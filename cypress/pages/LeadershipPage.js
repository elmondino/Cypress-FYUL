/**
 * Page Object Model for the Leadership Page
 */
class LeadershipPage {
  // Selectors
  elements = {
    pageContent: () => cy.get('body'),
    heading: () => cy.get('h1, h2').first(),
    leadershipTeam: () => cy.get('body'),
    navigation: () => cy.get('nav, header'),
    footer: () => cy.get('footer, [role="contentinfo"]'),
  };

  // Actions
  visit() {
    cy.visit('/leadership');
    cy.waitForPageLoad();
    return this;
  }

  verifyPageLoaded() {
    cy.url().should('include', '/leadership');
    this.elements.pageContent().should('be.visible');
    return this;
  }

  verifyHeading() {
    this.elements.heading().should('be.visible').and('not.be.empty');
    return this;
  }

  verifyLeadershipTeam() {
    this.elements.leadershipTeam().should('be.visible');
    return this;
  }

  verifyNavigation() {
    this.elements.navigation().should('exist');
    return this;
  }

  verifyFooter() {
    this.elements.footer().should('be.visible');
    return this;
  }

  checkSEO() {
    cy.validateSEO();
    cy.title().should('not.be.empty');
    return this;
  }

  checkAccessibility() {
    cy.checkA11yBasics();
    return this;
  }
}

export default LeadershipPage;
