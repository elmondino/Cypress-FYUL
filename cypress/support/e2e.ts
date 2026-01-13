/// <reference types="cypress" />

import './commands';

// Global hooks and configuration
beforeEach(() => {
  // Clear cookies and local storage for test isolation
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Prevent uncaught exceptions from failing tests
Cypress.on('uncaught:exception', (err) => {
  // Log the error but don't fail the test
  console.error('Uncaught exception:', err.message);
  return false;
});
