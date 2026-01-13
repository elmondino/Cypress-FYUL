/**
 * Network Intercepts for API Mocking
 * Provides reliability by mocking external dependencies
 */

export const intercepts = {
  /**
   * Set up common intercepts for all tests
   */
  setupDefaults(): void {
    // Stub analytics to prevent flaky tests
    cy.intercept('**/analytics/**', { statusCode: 200, body: {} }).as('analytics');
    cy.intercept('**/gtag/**', { statusCode: 200, body: {} }).as('gtag');
    cy.intercept('**/gtm.js', { statusCode: 200, body: '' }).as('gtm');
    
    // Stub common third-party scripts
    cy.intercept('**/googletagmanager.com/**', { statusCode: 200, body: '' }).as('googleTagManager');
    cy.intercept('**/google-analytics.com/**', { statusCode: 200, body: '' }).as('googleAnalytics');
    cy.intercept('**/facebook.net/**', { statusCode: 200, body: '' }).as('facebook');
    cy.intercept('**/connect.facebook.net/**', { statusCode: 200, body: '' }).as('facebookConnect');
  },

  /**
   * Mock API responses for testing specific scenarios
   */
  mockApi(endpoint: string, response: object, statusCode = 200): void {
    cy.intercept('GET', `**${endpoint}**`, {
      statusCode,
      body: response,
    }).as(endpoint.replace(/[^a-zA-Z]/g, ''));
  },

  /**
   * Wait for page resources to load
   */
  waitForPageLoad(): void {
    cy.intercept('**/*.js').as('scripts');
    cy.intercept('**/*.css').as('styles');
  },

  /**
   * Simulate slow network for performance testing
   */
  simulateSlowNetwork(delayMs = 2000): void {
    cy.intercept('**/*', (req) => {
      req.on('response', (res) => {
        res.setDelay(delayMs);
      });
    }).as('slowNetwork');
  },

  /**
   * Simulate network failure
   */
  simulateNetworkFailure(urlPattern: string): void {
    cy.intercept(urlPattern, { forceNetworkError: true }).as('networkFailure');
  },

  /**
   * Capture and log all network requests
   */
  logRequests(): void {
    cy.intercept('**/*', (req) => {
      cy.task('log', `[${req.method}] ${req.url}`);
      req.continue();
    });
  },
};

// Custom command to setup intercepts
Cypress.Commands.add('setupIntercepts', () => {
  intercepts.setupDefaults();
});

// Type is declared in commands.d.ts

export default intercepts;
