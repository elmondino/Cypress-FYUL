import { defineConfig } from 'cypress';

// Environment-specific configurations
const environments = {
  production: {
    baseUrl: 'https://www.fyul.com',
    apiUrl: 'https://api.fyul.com',
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

// Get environment from CLI or default to production
const env = (process.env.CYPRESS_ENV || 'production') as keyof typeof environments;
const envConfig = environments[env] || environments.production;

export default defineConfig({
  e2e: {
    baseUrl: envConfig.baseUrl,
    
    // Viewport
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    // Media
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    
    // Timeouts - reasonable defaults
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    
    // Retries
    retries: {
      runMode: 2,
      openMode: 0,
    },
    
    // Test isolation
    testIsolation: true,
    
    // Environment variables
    env: {
      ...envConfig,
      environment: env,
    },
    
    // Reporter
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportPageTitle: 'FYUL.com Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    
    setupNodeEvents(on, config) {
      // Mochawesome reporter - using dynamic import for ESM compatibility
      import('cypress-mochawesome-reporter/plugin').then((module) => {
        module.default(on);
      });
      
      // Browser launch options
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'edge') {
          launchOptions.args.push('--disable-dev-shm-usage');
        }
        return launchOptions;
      });
      
      // Task for logging
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      
      return config;
    },
    
    // Spec patterns
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
  },
});
