/**
 * ============================================================================
 * cypress.config.ts - Cypress Configuration File
 * ============================================================================
 * 
 * WHAT IS THIS FILE?
 * ------------------
 * This is the main configuration file for Cypress. It defines:
 * - Where to find tests
 * - Browser settings (viewport, timeouts)
 * - Environment-specific URLs
 * - Plugins and reporters
 * - Custom Node.js events
 * 
 * WHY TYPESCRIPT (.ts)?
 * ---------------------
 * Using TypeScript for config gives us:
 * - Type checking for configuration options
 * - Autocomplete in your editor
 * - Compile-time error catching
 * 
 * FILE LOCATION:
 * This file MUST be in the project root (next to package.json).
 * Cypress looks for cypress.config.ts (or .js, .mjs) automatically.
 * 
 * ============================================================================
 */

import { defineConfig } from 'cypress';

// ============================================================================
// ENVIRONMENT CONFIGURATION
// ============================================================================

/**
 * Multi-environment configuration.
 * 
 * WHY MULTIPLE ENVIRONMENTS?
 * --------------------------
 * Professional projects have different environments:
 * - Development: Local developer machines (localhost)
 * - Staging: Pre-production testing environment
 * - Production: Live site that real users access
 * 
 * Tests should be able to run against ANY environment.
 * 
 * USAGE:
 *   # Run against production (default)
 *   npx cypress run
 *   
 *   # Run against staging
 *   CYPRESS_ENV=staging npx cypress run
 *   
 *   # Run against local development
 *   CYPRESS_ENV=development npx cypress run
 * 
 * On Windows PowerShell:
 *   $env:CYPRESS_ENV="staging"; npx cypress run
 */
const environments = {
  production: {
    baseUrl: 'https://www.fyul.com',    // Main website URL
    apiUrl: 'https://api.fyul.com',      // API endpoint (if applicable)
  },
  staging: {
    baseUrl: 'https://staging.fyul.com',
    apiUrl: 'https://api-staging.fyul.com',
  },
  development: {
    baseUrl: 'http://localhost:3000',
    apiUrl: 'http://localhost:4000',
  },
};

/**
 * Get the target environment from environment variable.
 * 
 * process.env.CYPRESS_ENV reads the environment variable
 * || 'production' provides a default if not set
 * 
 * TYPE ASSERTION: `as keyof typeof environments`
 * This tells TypeScript that the value will be one of the
 * environment keys ('production', 'staging', 'development').
 */
const env = (process.env.CYPRESS_ENV || 'production') as keyof typeof environments;

/**
 * Get the config for the selected environment.
 * Falls back to production if an invalid env is specified.
 */
const envConfig = environments[env] || environments.production;

// ============================================================================
// CYPRESS CONFIGURATION
// ============================================================================

/**
 * defineConfig() - Type-safe way to create Cypress configuration.
 * 
 * Benefits:
 * - TypeScript knows all valid options
 * - Your editor shows autocomplete
 * - Invalid options cause compile errors
 */
export default defineConfig({
  
  /**
   * e2e - End-to-End testing configuration.
   * 
   * Cypress supports two types of testing:
   * - e2e: Full browser tests (what we're configuring)
   * - component: Component testing (React, Vue, etc.)
   */
  e2e: {
    
    // ==========================================================================
    // BASE URL
    // ==========================================================================
    
    /**
     * baseUrl - The root URL for your application.
     * 
     * When you call cy.visit('/about'), Cypress combines:
     * baseUrl + '/about' = 'https://www.fyul.com/about'
     * 
     * BENEFITS:
     * - Change URL in ONE place (here) for all tests
     * - Tests use relative paths, making them environment-agnostic
     * - Easy to switch between environments
     */
    baseUrl: envConfig.baseUrl,
    
    // ==========================================================================
    // VIEWPORT SETTINGS
    // ==========================================================================
    
    /**
     * Viewport dimensions - the browser window size.
     * 
     * 1920x1080 is full HD, simulating a desktop monitor.
     * 
     * CONSIDERATIONS:
     * - Different viewports can reveal different bugs
     * - Mobile (375x667), Tablet (768x1024), Desktop (1920x1080)
     * - Tests can also use cy.viewport() to change mid-test
     */
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    // ==========================================================================
    // MEDIA SETTINGS (Screenshots & Videos)
    // ==========================================================================
    
    /**
     * video - Record videos of test runs.
     * 
     * Videos are INVALUABLE for debugging CI failures:
     * - See exactly what happened
     * - Catch timing issues
     * - Share with team members
     * 
     * Set to false locally to speed up runs if not needed.
     */
    video: true,
    
    /**
     * videoCompression - Compress video to reduce file size.
     * 
     * Scale: 1-51 (lower = better quality, larger file)
     * 32 is a good balance of quality and size.
     */
    videoCompression: 32,
    
    /**
     * screenshotOnRunFailure - Auto-screenshot on test failure.
     * 
     * CRITICAL FOR DEBUGGING:
     * When a test fails, you get a screenshot showing exactly
     * what the page looked like at the moment of failure.
     */
    screenshotOnRunFailure: true,
    
    /**
     * Folder paths for media output.
     * These are relative to the project root.
     */
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    
    // ==========================================================================
    // TIMEOUT SETTINGS
    // ==========================================================================
    
    /**
     * TIMEOUTS - How long Cypress waits before failing.
     * 
     * IMPORTANT CONCEPT:
     * Cypress automatically RETRIES commands until they pass or timeout.
     * This is why we don't need cy.wait() everywhere!
     * 
     * Example: cy.get('.button').should('be.visible')
     * - Cypress keeps looking for .button
     * - Keeps checking if it's visible
     * - Fails only after defaultCommandTimeout expires
     */
    
    /**
     * defaultCommandTimeout - Time for cy.get(), .should(), etc.
     * 10 seconds is generous for most operations.
     */
    defaultCommandTimeout: 10000,
    
    /**
     * pageLoadTimeout - Time for cy.visit() to complete.
     * 30 seconds allows for slow initial loads.
     */
    pageLoadTimeout: 30000,
    
    /**
     * requestTimeout - Time for cy.request() to start.
     */
    requestTimeout: 10000,
    
    /**
     * responseTimeout - Time for response to complete.
     */
    responseTimeout: 30000,
    
    // ==========================================================================
    // RETRY SETTINGS
    // ==========================================================================
    
    /**
     * retries - Automatically retry failed tests.
     * 
     * FLAKY TEST HANDLING:
     * Some tests fail intermittently due to:
     * - Network issues
     * - Animation timing
     * - Race conditions
     * 
     * Retrying can help, but DON'T use retries to mask real bugs!
     * Investigate tests that frequently need retries.
     * 
     * runMode: When running via CLI (npx cypress run)
     * openMode: When running interactively (npx cypress open)
     */
    retries: {
      runMode: 2,    // Retry up to 2 times in CI
      openMode: 0,   // No retries when developing (want to see failures)
    },
    
    // ==========================================================================
    // TEST ISOLATION
    // ==========================================================================
    
    /**
     * testIsolation - Clear state between tests.
     * 
     * When true (RECOMMENDED):
     * - Each test starts fresh (clean cookies, storage, etc.)
     * - Tests are independent and can run in any order
     * - A failure in one test doesn't affect others
     * 
     * When false:
     * - State persists between tests
     * - Faster but tests become interdependent (fragile!)
     */
    testIsolation: true,
    
    // ==========================================================================
    // ENVIRONMENT VARIABLES
    // ==========================================================================
    
    /**
     * env - Custom environment variables available in tests.
     * 
     * Access in tests via: Cypress.env('variableName')
     * 
     * Example:
     *   const apiUrl = Cypress.env('apiUrl');
     *   cy.request(`${apiUrl}/users`);
     */
    env: {
      ...envConfig,           // Spread all config (baseUrl, apiUrl)
      environment: env,       // Current environment name
    },
    
    // ==========================================================================
    // REPORTER SETTINGS
    // ==========================================================================
    
    /**
     * Reporter - How test results are formatted.
     * 
     * mochawesome creates beautiful HTML reports with:
     * - Test results summary
     * - Screenshots embedded
     * - Charts and statistics
     * - Shareable HTML file
     * 
     * Perfect for:
     * - CI/CD artifacts
     * - Sharing with non-technical stakeholders
     * - Historical test tracking
     */
    reporter: 'cypress-mochawesome-reporter',
    
    /**
     * reporterOptions - Configure the reporter output.
     */
    reporterOptions: {
      reportDir: 'cypress/reports',       // Output folder
      overwrite: false,                   // Keep old reports (useful for comparison)
      html: true,                         // Generate HTML report
      json: true,                         // Generate JSON (for processing)
      charts: true,                       // Include pie charts
      reportPageTitle: 'FYUL.com Test Report',
      embeddedScreenshots: true,          // Include screenshots in HTML
      inlineAssets: true,                 // Single self-contained HTML file
    },
    
    // ==========================================================================
    // NODE EVENTS (Plugins)
    // ==========================================================================
    
    /**
     * setupNodeEvents - Configure Cypress plugins and Node.js tasks.
     * 
     * This function runs in Node.js (not in the browser).
     * Use it for:
     * - Configuring plugins
     * - Setting up custom tasks
     * - Modifying browser launch options
     * - Accessing the file system
     * 
     * @param {Function} on - Register event handlers
     * @param {Object} config - Cypress configuration object
     */
    setupNodeEvents(on, config) {
      
      // ----------------------------------------------------------------------
      // Mochawesome Reporter Plugin
      // ----------------------------------------------------------------------
      
      /**
       * Register the mochawesome reporter plugin.
       * 
       * Dynamic import is used because the plugin is ESM-only.
       * This is a common pattern for newer packages.
       */
      import('cypress-mochawesome-reporter/plugin').then((module) => {
        module.default(on);
      });
      
      // ----------------------------------------------------------------------
      // Browser Launch Configuration
      // ----------------------------------------------------------------------
      
      /**
       * Modify browser launch options.
       * 
       * 'before:browser:launch' fires before Cypress opens the browser.
       * Useful for:
       * - Adding Chrome flags
       * - Setting browser preferences
       * - Configuring extensions
       */
      on('before:browser:launch', (browser, launchOptions) => {
        // Add flag for Chrome/Edge to fix shared memory issues in Docker/CI
        if (browser.name === 'chrome' || browser.name === 'edge') {
          // --disable-dev-shm-usage prevents crashes in containers
          launchOptions.args.push('--disable-dev-shm-usage');
        }
        return launchOptions;
      });
      
      // ----------------------------------------------------------------------
      // Custom Tasks
      // ----------------------------------------------------------------------
      
      /**
       * Custom Cypress tasks.
       * 
       * Tasks run in Node.js, giving access to:
       * - File system
       * - Database connections
       * - External APIs
       * - Console logging that appears in terminal
       * 
       * USAGE IN TESTS:
       *   cy.task('log', 'Hello from Node.js!');
       */
      on('task', {
        /**
         * Log a message to the terminal (not browser console).
         * 
         * Useful for debugging in CI where you can't see browser console.
         * 
         * @param {string} message - Message to log
         * @returns {null} - Tasks must return something (null = no value)
         */
        log(message) {
          console.log(message);
          return null;
        },
      });
      
      // Return the (possibly modified) config
      return config;
    },
    
    // ==========================================================================
    // FILE PATTERNS
    // ==========================================================================
    
    /**
     * specPattern - Where to find test files.
     * 
     * GLOB PATTERN explained:
     * - cypress/e2e/ = starting directory
     * - any subdirectory (recursive)
     * - files ending in .cy.ts
     * 
     * This finds all test files in cypress/e2e and its subfolders.
     */
    specPattern: 'cypress/e2e/**/*.cy.ts',
    
    /**
     * supportFile - File that runs before each spec file.
     * 
     * Use for:
     * - Importing custom commands
     * - Global configuration
     * - Before/after hooks that apply to ALL tests
     */
    supportFile: 'cypress/support/e2e.ts',
  },
});
