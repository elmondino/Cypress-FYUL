/// <reference types="cypress" />

import './commands';
import './intercepts';
import './visual';

// Global hooks and configuration
beforeEach(() => {
  // Clear cookies and local storage for test isolation
  cy.clearCookies();
  cy.clearLocalStorage();
  
  // Setup network intercepts to stub analytics and third-party scripts
  cy.setupIntercepts();
});

// Prevent uncaught exceptions from failing tests
Cypress.on('uncaught:exception', (err) => {
  // Log the error but don't fail the test for third-party script errors
  console.error('Uncaught exception:', err.message);
  return false;
});
