/**
 * ============================================================================
 * index.ts - Barrel File for Page Objects
 * ============================================================================
 * 
 * WHAT IS A BARREL FILE?
 * ----------------------
 * A barrel file re-exports modules from multiple files in one place.
 * It's a common TypeScript/JavaScript pattern for cleaner imports.
 * 
 * WITHOUT BARREL FILE:
 *   import { HomePage } from '../../pages/HomePage';
 *   import { AboutPage } from '../../pages/AboutPage';
 *   import { LeadershipPage } from '../../pages/LeadershipPage';
 * 
 * WITH BARREL FILE:
 *   import { HomePage, AboutPage, LeadershipPage } from '../../pages';
 * 
 * BENEFITS:
 * 1. Shorter, cleaner imports
 * 2. Single source of truth for what's exported from a folder
 * 3. Easier to refactor - change internal structure without breaking imports
 * 4. Better organization - clear API for the folder
 * 
 * NAMING CONVENTION:
 * - index.ts is the default file Node.js/TypeScript looks for in a folder
 * - import from '../../pages' automatically resolves to '../../pages/index.ts'
 * 
 * ============================================================================
 */

/**
 * Re-export all page objects from a single entry point.
 * 
 * EXPORT SYNTAX EXPLAINED:
 * - "export { X } from './X'" re-exports X from file ./X.ts
 * - The importing file sees X as if it came from this index.ts
 */

// Base class - exported for extension or type references
export { BasePage } from './BasePage';

// Page objects for each page of the application
export { HomePage } from './HomePage';
export { AboutPage } from './AboutPage';
export { LeadershipPage } from './LeadershipPage';
export { PrivacyPolicyPage } from './PrivacyPolicyPage';

/**
 * USAGE IN TESTS:
 * ---------------
 * 
 * // Import multiple page objects in one line
 * import { HomePage, AboutPage, LeadershipPage } from '../../pages';
 * 
 * // Or import everything
 * import * as pages from '../../pages';
 * const homePage = new pages.HomePage();
 */
