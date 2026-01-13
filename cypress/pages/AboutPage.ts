/**
 * ============================================================================
 * AboutPage.ts - Page Object for the About Page
 * ============================================================================
 * 
 * This is a simpler page object that demonstrates:
 * - How to extend BasePage for specific pages
 * - Content-based selectors for sites without semantic HTML
 * - Focused verification methods for page-specific content
 * 
 * ============================================================================
 */

import { BasePage } from './BasePage';

/**
 * AboutPage - Represents the FYUL About page (/about).
 * 
 * A simpler page object showing the minimal implementation needed.
 * Not every page needs dozens of methods - keep it focused!
 */
export class AboutPage extends BasePage {
  /**
   * Required: Define the URL path for this page.
   * visit() will navigate to: baseUrl + this.path = https://fyul.com/about
   */
  protected readonly path = '/about';
  
  /**
   * Required: Define the expected title pattern.
   * The /i flag makes the match case-insensitive.
   */
  protected readonly pageTitle = /About|FYUL/i;

  // ============================================================================
  // VERIFICATION METHODS
  // ============================================================================

  /**
   * Verify page loaded correctly via URL.
   * 
   * This OVERRIDES the parent verifyPageLoaded() method.
   * Sometimes you need simpler or different verification for specific pages.
   * 
   * @returns {this} - For method chaining
   */
  verifyPageLoaded(): this {
    // Just check URL - title might not always include "About"
    cy.url().should('include', '/about');
    return this;
  }

  /**
   * Verify the main heading is displayed.
   * 
   * FINDING THE RIGHT SELECTOR:
   * 1. Open the page in Chrome
   * 2. Right-click the element > Inspect
   * 3. Look for unique text, attributes, or structure
   * 4. Test your selector in DevTools: $$('your-selector')
   * 
   * For FYUL's About page, the main heading contains this text.
   * 
   * @returns {this} - For method chaining
   */
  verifyHeading(): this {
    // cy.contains(selector, text) finds elements matching BOTH
    // h2 = element type, the string = text to find within it
    cy.contains('h2', 'For FYUL to power all eCommerce merchandise', { timeout: 10000 })
      .should('be.visible');
    return this;
  }

  /**
   * Verify the vision statement section exists.
   * 
   * @returns {this} - For method chaining
   */
  verifyVision(): this {
    cy.contains('Our vision').should('be.visible');
    return this;
  }

  /**
   * Verify key content exists on the page.
   * 
   * This is a "smoke test" style verification - just checking
   * that major content loaded, not every detail.
   * 
   * @returns {this} - For method chaining
   */
  verifyContent(): this {
    // Check for key brand name
    cy.contains('FYUL').should('be.visible');
    
    // Check for key value proposition
    // .should('exist') is weaker than .should('be.visible')
    // Element can exist but be hidden - useful for content in viewport
    cy.contains('on-demand').should('exist');
    
    return this;
  }

  /**
   * Verify the company history section exists.
   * 
   * @returns {this} - For method chaining
   */
  verifyHistorySection(): this {
    cy.contains('Our history').should('be.visible');
    return this;
  }

  /**
   * Verify the "Join us" CTA section exists.
   * 
   * @returns {this} - For method chaining
   */
  verifyJoinSection(): this {
    cy.contains('Join us').should('be.visible');
    return this;
  }
}

export default AboutPage;
