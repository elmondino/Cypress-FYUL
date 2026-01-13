/**
 * Test Data Fixtures
 * Common test data used across test suites
 */

module.exports = {
  urls: {
    base: 'https://www.fyul.com',
    home: '/',
    about: '/about',
    leadership: '/leadership',
    privacyPolicy: '/privacy-policy',
    careers: 'https://careers.fyul.com',
  },

  brands: {
    printify: {
      name: 'Printify',
      url: 'https://printify.com',
      description: 'Print on Demand',
    },
    printful: {
      name: 'Printful',
      url: 'https://www.printful.com',
      description: 'premium print-on-demand',
    },
    snowCommerce: {
      name: 'Snow Commerce',
      url: 'https://www.snowcommerce.com',
      description: 'full-service eCommerce',
    },
  },

  navigation: {
    mainLinks: ['About', 'Leadership', 'Careers'],
    footerLinks: ['About', 'Leadership', 'Careers', 'Privacy Policy'],
  },

  viewports: {
    mobile: { width: 375, height: 667, name: 'iPhone SE' },
    tablet: { width: 768, height: 1024, name: 'iPad' },
    desktop: { width: 1920, height: 1080, name: 'Desktop HD' },
    desktopLarge: { width: 2560, height: 1440, name: 'Desktop 2K' },
    mobile375: { width: 375, height: 812, name: 'iPhone X' },
    mobile414: { width: 414, height: 896, name: 'iPhone XR' },
  },

  seo: {
    expectedMetaTags: ['description', 'viewport'],
    minTitleLength: 10,
    maxTitleLength: 70,
    minDescriptionLength: 50,
    maxDescriptionLength: 160,
  },

  performance: {
    maxPageLoadTime: 10000, // 10 seconds
    maxTimeToInteractive: 5000, // 5 seconds
    maxResourceLoadTime: 3000, // 3 seconds
  },

  testUsers: {
    // Add test users if authentication is implemented
  },

  messages: {
    errors: {
      pageLoadFailed: 'Page failed to load within expected time',
      elementNotFound: 'Expected element not found on page',
      navigationFailed: 'Navigation to page failed',
    },
    success: {
      testPassed: 'Test completed successfully',
    },
  },
};
