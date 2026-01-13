/**
 * ============================================================================
 * FIXTURES FOLDER - Test Data Files
 * ============================================================================
 * 
 * This file exists purely for documentation purposes.
 * Delete it if you prefer - it's not used by any code.
 * 
 * WHAT ARE FIXTURES?
 * ------------------
 * Fixtures are external data files (usually JSON) that contain test data.
 * They keep your test files clean by storing data separately from test logic.
 * 
 * BENEFITS:
 * - Tests are cleaner (no hardcoded values cluttering the code)
 * - Data is reusable across multiple tests
 * - Easy to update data without changing test logic
 * - Can version control test data separately
 * - Supports multiple data sets for different scenarios
 * 
 * FIXTURE LOCATION:
 * Default folder: cypress/fixtures/
 * Files are typically .json but can be .js for dynamic data
 * 
 * USAGE IN TESTS:
 * ---------------
 * 
 * Method 1: Import directly (recommended for TypeScript)
 * 
 *   import testData from '../../fixtures/testData.json';
 *   
 *   it('should verify brand links', () => {
 *     testData.brands.forEach(brand => {
 *       cy.contains(brand.name).should('exist');
 *     });
 *   });
 * 
 * Method 2: Use cy.fixture() command
 * 
 *   it('should load fixture', () => {
 *     cy.fixture('testData').then((data) => {
 *       cy.contains(data.site.name).should('exist');
 *     });
 *   });
 * 
 * Method 3: Use fixture with alias
 * 
 *   beforeEach(() => {
 *     cy.fixture('testData').as('testData');
 *   });
 *   
 *   it('should use aliased fixture', function() {
 *     // Note: must use function() not arrow => to access this
 *     cy.contains(this.testData.site.name).should('exist');
 *   });
 * 
 * WHEN TO USE FIXTURES:
 * ---------------------
 * ✅ Good uses:
 *   - Test user credentials (use environment variables for real secrets!)
 *   - Expected values (URLs, titles, messages)
 *   - Mock API responses
 *   - Form input data
 *   - Configuration values
 * 
 * ❌ Not good uses:
 *   - Large files (consider mock API instead)
 *   - Secrets/passwords (use environment variables)
 *   - Dynamic data that changes every run (generate in code)
 * 
 * TESTDATA.JSON STRUCTURE:
 * ------------------------
 * 
 * {
 *   "site": {
 *     "name": "FYUL",              // Site name for assertions
 *     "baseUrl": "https://..."     // Base URL (also in config)
 *   },
 *   "brands": [...],               // Brand partner data
 *   "pages": {...},                // Page metadata (paths, titles)
 *   "navigation": {...},           // Expected nav links
 *   "performance": {...},          // Performance thresholds
 *   "viewports": {...}             // Viewport sizes for responsive tests
 * }
 * 
 * ============================================================================
 */
export {};
