/**
 * ============================================================================
 * LeadershipPage.ts - Page Object for the Leadership Page
 * ============================================================================
 * 
 * This page object demonstrates:
 * - Verifying dynamic content (team member names)
 * - Using cy.contains() for flexible text matching
 * 
 * ============================================================================
 */

import { BasePage } from './BasePage';

/**
 * LeadershipPage - Represents the FYUL Leadership page (/leadership).
 */
export class LeadershipPage extends BasePage {
  protected readonly path = '/leadership';
  protected readonly pageTitle = /Leadership|FYUL/i;

  // ============================================================================
  // VERIFICATION METHODS
  // ============================================================================

  /**
   * Verify page loaded correctly.
   * 
   * @returns {this} - For method chaining
   */
  verifyPageLoaded(): this {
    cy.url().should('include', '/leadership');
    return this;
  }

  /**
   * Verify the main heading is displayed.
   * 
   * @returns {this} - For method chaining
   */
  verifyHeading(): this {
    cy.contains('h1', 'The people guiding FYUL forward', { timeout: 10000 })
      .should('be.visible');
    return this;
  }

  /**
   * Verify the leadership team section shows content.
   * 
   * Rather than checking for specific DOM structure (which might change),
   * we verify that key leader information is visible.
   * 
   * @returns {this} - For method chaining
   */
  verifyLeaderSection(): this {
    // Verify the CEO's name is displayed (known, stable content)
    cy.contains('Alex Saltonstall').should('be.visible');
    return this;
  }

  /**
   * Verify a specific leader is displayed.
   * 
   * PARAMETERIZED VERIFICATION:
   * Instead of hardcoding names, accept them as parameters.
   * This makes the method reusable for any leader.
   * 
   * Usage in test:
   *   leadershipPage.verifyLeader('Jane Doe');
   * 
   * @param {string} name - The leader's name to find
   * @returns {this} - For method chaining
   */
  verifyLeader(name: string): this {
    cy.contains(name).should('be.visible');
    return this;
  }

  /**
   * Verify the board of directors section exists.
   * 
   * @returns {this} - For method chaining
   */
  verifyBoardSection(): this {
    cy.contains('Meet our board').should('be.visible');
    return this;
  }

  /**
   * Verify CEO title is displayed.
   * 
   * @returns {this} - For method chaining
   */
  verifyCEO(): this {
    cy.contains('Chief Executive Officer').should('be.visible');
    return this;
  }

  /**
   * Verify the "Join us" call-to-action exists.
   * 
   * @returns {this} - For method chaining
   */
  verifyJoinSection(): this {
    cy.contains('Join us').should('be.visible');
    return this;
  }
}

export default LeadershipPage;
