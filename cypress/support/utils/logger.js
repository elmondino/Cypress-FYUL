/**
 * Logger Utility
 * Centralized logging for tests
 */

class Logger {
  constructor(context = 'Test') {
    this.context = context;
  }

  info(message) {
    cy.log(`ℹ️ [${this.context}] ${message}`);
  }

  success(message) {
    cy.log(`✅ [${this.context}] ${message}`);
  }

  error(message) {
    cy.log(`❌ [${this.context}] ${message}`);
  }

  warning(message) {
    cy.log(`⚠️ [${this.context}] ${message}`);
  }

  debug(message) {
    if (Cypress.env('DEBUG')) {
      cy.log(`🔍 [${this.context}] ${message}`);
    }
  }

  step(stepNumber, message) {
    cy.log(`📍 Step ${stepNumber}: ${message}`);
  }

  metric(name, value) {
    cy.log(`📊 ${name}: ${value}`);
  }
}

export default Logger;
