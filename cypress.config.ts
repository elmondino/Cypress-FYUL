import { defineConfig } from 'cypress';

// Environment configuration
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

const env = (process.env.CYPRESS_ENV || 'production') as keyof typeof environments;
const envConfig = environments[env] || environments.production;

export default defineConfig({
  e2e: {
    baseUrl: envConfig.baseUrl,
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    
    retries: {
      runMode: 2,
      openMode: 0,
    },
    
    testIsolation: true,
    
    env: {
      ...envConfig,
      environment: env,
    },
    
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
      import('cypress-mochawesome-reporter/plugin').then((module) => {
        module.default(on);
      });
      
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'edge') {
          launchOptions.args.push('--disable-dev-shm-usage');
        }
        return launchOptions;
      });
      
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      
      return config;
    },
    
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
  },
});
