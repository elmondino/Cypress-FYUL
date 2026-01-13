/**
 * Helper Utilities
 * Common helper functions for tests
 */

/**
 * Generate random string
 */
export const generateRandomString = (length = 10) => {
  return Math.random().toString(36).substring(2, length + 2);
};

/**
 * Generate random email
 */
export const generateRandomEmail = () => {
  return `test_${generateRandomString()}@example.com`;
};

/**
 * Wait for element with timeout
 */
export const waitForElement = (selector, timeout = 10000) => {
  return cy.get(selector, { timeout }).should('exist');
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (selector) => {
  return cy.get(selector).then(($el) => {
    const bottom = Cypress.$(cy.state('window')).height();
    const rect = $el[0].getBoundingClientRect();
    
    return rect.top < bottom && rect.bottom > 0 && rect.left > -rect.width;
  });
};

/**
 * Take screenshot with timestamp
 */
export const screenshotWithTimestamp = (name) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return cy.screenshot(`${name}_${timestamp}`);
};

/**
 * Log test step
 */
export const logStep = (message) => {
  cy.log(`📝 ${message}`);
};

/**
 * Log error
 */
export const logError = (message) => {
  cy.log(`❌ ERROR: ${message}`);
};

/**
 * Log success
 */
export const logSuccess = (message) => {
  cy.log(`✅ ${message}`);
};

/**
 * Format date
 */
export const formatDate = (date = new Date()) => {
  return date.toISOString().split('T')[0];
};

/**
 * Parse JSON safely
 */
export const safeJsonParse = (str, defaultValue = {}) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return defaultValue;
  }
};

/**
 * Retry action with exponential backoff
 */
export const retryWithBackoff = (action, maxRetries = 3, baseDelay = 1000) => {
  let retries = 0;
  
  const attempt = () => {
    return action().catch((error) => {
      if (retries < maxRetries) {
        const delay = baseDelay * Math.pow(2, retries);
        retries++;
        cy.wait(delay);
        return attempt();
      }
      throw error;
    });
  };
  
  return attempt();
};

/**
 * Get environment-specific URL
 */
export const getEnvironmentUrl = (path = '/') => {
  const baseUrl = Cypress.config('baseUrl') || 'https://www.fyul.com';
  return `${baseUrl}${path}`;
};

/**
 * Measure execution time
 */
export const measureTime = (callback, label = 'Operation') => {
  const startTime = Date.now();
  callback();
  const endTime = Date.now();
  const duration = endTime - startTime;
  cy.log(`${label} took ${duration}ms`);
  return duration;
};

/**
 * Check if running in CI
 */
export const isCI = () => {
  return Cypress.env('CI') || false;
};

/**
 * Get test environment
 */
export const getEnvironment = () => {
  return Cypress.env('environment') || 'production';
};

/**
 * Clean up test data
 */
export const cleanup = () => {
  cy.clearCookies();
  cy.clearLocalStorage();
};
