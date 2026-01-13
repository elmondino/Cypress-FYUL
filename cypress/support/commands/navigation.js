// Navigation custom commands

/**
 * Navigate to home page
 */
Cypress.Commands.add('navigateToHome', () => {
  cy.visit('/');
  cy.waitForPageLoad();
});

/**
 * Navigate to About page
 */
Cypress.Commands.add('navigateToAbout', () => {
  cy.visit('/about');
  cy.waitForPageLoad();
});

/**
 * Navigate to Leadership page
 */
Cypress.Commands.add('navigateToLeadership', () => {
  cy.visit('/leadership');
  cy.waitForPageLoad();
});

/**
 * Navigate to Privacy Policy page
 */
Cypress.Commands.add('navigateToPrivacyPolicy', () => {
  cy.visit('/privacy-policy');
  cy.waitForPageLoad();
});

/**
 * Navigate using internal links
 */
Cypress.Commands.add('clickNavigationLink', (linkText) => {
  cy.contains('a', linkText, { matchCase: false })
    .should('be.visible')
    .click();
  cy.waitForPageLoad();
});

/**
 * Check navigation menu exists and is functional
 */
Cypress.Commands.add('verifyNavigation', () => {
  cy.get('nav, [role="navigation"], header a').should('exist');
});

/**
 * Navigate back
 */
Cypress.Commands.add('goBack', () => {
  cy.go('back');
  cy.waitForPageLoad();
});

/**
 * Navigate forward
 */
Cypress.Commands.add('goForward', () => {
  cy.go('forward');
  cy.waitForPageLoad();
});
