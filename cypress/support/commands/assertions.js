// Custom assertion commands

/**
 * Assert element contains text (case insensitive)
 */
Cypress.Commands.add('shouldContainTextCI', { prevSubject: true }, (subject, text) => {
  cy.wrap(subject).invoke('text').then((elementText) => {
    expect(elementText.toLowerCase()).to.include(text.toLowerCase());
  });
});

/**
 * Assert URL matches pattern
 */
Cypress.Commands.add('urlShouldMatch', (pattern) => {
  cy.url().should('match', new RegExp(pattern, 'i'));
});

/**
 * Assert page has correct structure
 */
Cypress.Commands.add('assertPageStructure', () => {
  cy.get('html').should('exist');
  cy.get('head').should('exist');
  cy.get('body').should('exist');
});

/**
 * Assert no console errors (with exceptions)
 */
Cypress.Commands.add('assertNoConsoleErrors', (allowedErrors = []) => {
  cy.window().then((win) => {
    const errors = win.console.error.args || [];
    const filteredErrors = errors.filter((error) => {
      return !allowedErrors.some((allowed) => error.toString().includes(allowed));
    });
    expect(filteredErrors).to.have.length(0);
  });
});

/**
 * Assert element is in viewport
 */
Cypress.Commands.add('assertInViewport', { prevSubject: true }, (subject) => {
  cy.wrap(subject).then(($el) => {
    const bottom = Cypress.$(cy.state('window')).height();
    const rect = $el[0].getBoundingClientRect();
    
    expect(rect.top).to.be.lessThan(bottom);
    expect(rect.bottom).to.be.greaterThan(0);
    expect(rect.left).to.be.greaterThan(-rect.width);
  });
});

/**
 * Assert link is valid
 */
Cypress.Commands.add('assertValidLink', { prevSubject: true }, (subject) => {
  cy.wrap(subject)
    .should('have.attr', 'href')
    .and('not.be.empty')
    .and('not.equal', '#')
    .and('not.equal', 'javascript:void(0)');
});

/**
 * Assert image is loaded
 */
Cypress.Commands.add('assertImageLoaded', { prevSubject: true }, (subject) => {
  cy.wrap(subject)
    .should('be.visible')
    .and(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0);
      expect($img[0].naturalHeight).to.be.greaterThan(0);
    });
});
