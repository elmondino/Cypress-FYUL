/**
 * ============================================================================
 * e2e.ts - Cypress Support File for E2E Tests
 * ============================================================================
 * 
 * WHAT IS THIS FILE?
 * ------------------
 * This file runs BEFORE every single test file (spec) in your test suite.
 * Think of it as "global setup" that applies to all tests.
 * 
 * USE THIS FOR:
 * - Importing custom commands (so they're available everywhere)
 * - Global beforeEach/afterEach hooks
 * - Error handling configuration
 * - Third-party library imports
 * 
 * DON'T USE THIS FOR:
 * - Test-specific setup (put that in the test file's beforeEach)
 * - One-time setup (use before() in test file or cypress.config.ts)
 * 
 * EXECUTION ORDER:
 * ----------------
 * 1. Cypress loads this support file (e2e.ts)
 * 2. All imports execute (commands.ts, intercepts.ts, visual.ts)
 * 3. Global beforeEach() registers (doesn't run yet)
 * 4. Your test file loads
 * 5. Test file's beforeEach() registers
 * 6. First test runs:
 *    a. Global beforeEach() runs (this file)
 *    b. Test file's beforeEach() runs
 *    c. Test body runs
 * 
 * ============================================================================
 */

/// <reference types="cypress" />

// ============================================================================
// IMPORT CUSTOM COMMANDS
// ============================================================================

/**
 * Import our custom commands so they're available in all tests.
 * 
 * './commands' imports from commands.ts, which uses Cypress.Commands.add()
 * to register commands like cy.waitForPageReady(), cy.getByTestId(), etc.
 * 
 * After this import, you can use these commands in ANY test file
 * without additional imports.
 */
import './commands';

/**
 * Import network interception utilities.
 * Sets up cy.setupIntercepts() command for stubbing external requests.
 */
import './intercepts';

/**
 * Import visual testing utilities (Percy integration).
 * Sets up cy.visualSnapshot() command for screenshot comparison.
 */
import './visual';

/**
 * Import mochawesome reporter for HTML test reports.
 * This MUST be imported in the support file to enable report generation.
 */
import 'cypress-mochawesome-reporter/register';

// ============================================================================
// GLOBAL HOOKS
// ============================================================================

/**
 * Global beforeEach - runs before EVERY test in the entire test suite.
 * 
 * WHY USE A GLOBAL beforeEach?
 * ----------------------------
 * Some setup should happen for EVERY test:
 * - Clean state (cookies, storage) - ensures test isolation
 * - Network interception - prevents flaky third-party failures
 * - Feature flags or preferences
 * 
 * IMPORTANT:
 * This runs IN ADDITION to any beforeEach in individual test files.
 * Order: Global beforeEach → Test file beforeEach → Test
 * 
 * KEEP IT MINIMAL:
 * Only put truly global setup here. Too much slows ALL tests.
 */
beforeEach(() => {
  // --------------------------------------------------------------------------
  // Test Isolation - Clear State
  // --------------------------------------------------------------------------
  
  /**
   * Clear cookies between tests.
   * 
   * WHY?
   * - Cookies from one test shouldn't affect another
   * - Login states, preferences, tracking cookies could cause flaky tests
   * - Each test should start "fresh"
   * 
   * NOTE: Cypress also does this automatically when testIsolation: true
   * in cypress.config.ts, but being explicit doesn't hurt.
   */
  cy.clearCookies();
  
  /**
   * Clear localStorage between tests.
   * 
   * localStorage persists even after page refresh, so we clear it.
   * Common things stored: user preferences, tokens, feature flags.
   */
  cy.clearLocalStorage();
  
  // --------------------------------------------------------------------------
  // Network Setup
  // --------------------------------------------------------------------------
  
  /**
   * Setup network intercepts.
   * 
   * This stubs external requests (analytics, third-party scripts) that:
   * - Could fail and cause false test failures
   * - Slow down tests
   * - Aren't relevant to what we're testing
   * 
   * Defined in intercepts.ts
   */
  cy.setupIntercepts();
});

// ============================================================================
// GLOBAL ERROR HANDLING
// ============================================================================

/**
 * Handle uncaught exceptions in the application.
 * 
 * SCENARIO:
 * Your application (or a third-party script) throws an unhandled error.
 * By default, Cypress FAILS the test because it saw an error.
 * 
 * PROBLEM:
 * Third-party scripts (analytics, chat widgets, ads) often have bugs
 * that throw errors. These aren't YOUR bugs, but they fail your tests.
 * 
 * SOLUTION:
 * Catch these errors, log them for awareness, but don't fail the test.
 * 
 * 'uncaught:exception' event fires whenever an error isn't caught.
 * Returning false tells Cypress "don't fail the test for this error".
 * 
 * CAUTION:
 * Be careful with this! You might accidentally hide real bugs.
 * Only ignore errors you've investigated and confirmed are third-party.
 * 
 * BETTER APPROACH (if you control the app):
 * Fix or remove the code that's throwing errors!
 */
Cypress.on('uncaught:exception', (err) => {
  // Log the error so we're aware of it (appears in Cypress command log)
  console.error('Uncaught exception:', err.message);
  
  // Return false to prevent the test from failing
  // Return true (or nothing) to let it fail normally
  return false;
});

/**
 * ALTERNATIVE: Selective Error Handling
 * 
 * If you only want to ignore SPECIFIC errors, do something like:
 * 
 * Cypress.on('uncaught:exception', (err) => {
 *   // Ignore known third-party script errors
 *   if (err.message.includes('google-analytics')) {
 *     return false;
 *   }
 *   if (err.message.includes('hotjar')) {
 *     return false;
 *   }
 *   // Let other errors fail the test
 *   return true;
 * });
 */
