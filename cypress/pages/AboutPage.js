/**
 * Page Object Model for the About Page
 */
class AboutPage {
  // Selectors
  elements = {
    pageContent: () => cy.get('body'),
    heading: () => cy.get('h1, h2').first(),
    mainContent: () => cy.get('main, [role="main"], article'),
    navigation: () => cy.get('nav, header'),
    footer: () => cy.get('footer, [role="contentinfo"]'),
  };

  // Actions
  visit() {
    cy.visit('/about');
    cy.waitForPageLoad();
    return this;
  }

  verifyPageLoaded() {
    cy.url().should('include', '/about');
    this.elements.pageContent().should('be.visible');
    return this;
  }

  verifyHeading() {
    this.elements.heading().should('be.visible').and('not.be.empty');
    return this;
  }

  verifyContent() {
    this.elements.mainContent().should('be.visible').and('not.be.empty');
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

export default AboutPage;
