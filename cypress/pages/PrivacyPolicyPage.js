/**
 * Page Object Model for the Privacy Policy Page
 */
class PrivacyPolicyPage {
  // Selectors
  elements = {
    pageContent: () => cy.get('body'),
    heading: () => cy.get('h1, h2').first(),
    policyContent: () => cy.get('main, [role="main"], article, body'),
    navigation: () => cy.get('nav, header'),
    footer: () => cy.get('footer, [role="contentinfo"]'),
  };

  // Actions
  visit() {
    cy.visit('/privacy-policy');
    cy.waitForPageLoad();
    return this;
  }

  verifyPageLoaded() {
    cy.url().should('include', '/privacy-policy');
    this.elements.pageContent().should('be.visible');
    return this;
  }

  verifyHeading() {
    this.elements.heading().should('be.visible').and('not.be.empty');
    return this;
  }

  verifyPolicyContent() {
    this.elements.policyContent()
      .should('be.visible')
      .and('not.be.empty')
      .and('satisfy', ($el) => {
        return $el.text().length > 100;
      });
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

export default PrivacyPolicyPage;
