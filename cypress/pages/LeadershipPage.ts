import { BasePage } from './BasePage';

/**
 * LeadershipPage - Page Object for FYUL.com leadership page
 * Uses content-based selectors as site does not use semantic HTML
 */
export class LeadershipPage extends BasePage {
  protected readonly path = '/leadership';
  protected readonly pageTitle = /Leadership|FYUL/i;

  verifyPageLoaded(): this {
    cy.url().should('include', '/leadership');
    return this;
  }

  verifyHeading(): this {
    // Check for main heading
    cy.contains('h1', 'The people guiding FYUL forward', { timeout: 10000 })
      .should('be.visible');
    return this;
  }

  verifyLeaderSection(): this {
    // Verify leader names are visible
    cy.contains('Alex Saltonstall').should('be.visible');
    return this;
  }

  verifyLeader(name: string): this {
    cy.contains(name).should('be.visible');
    return this;
  }

  verifyBoardSection(): this {
    cy.contains('Meet our board').should('be.visible');
    return this;
  }

  verifyCEO(): this {
    cy.contains('Chief Executive Officer').should('be.visible');
    return this;
  }

  verifyJoinSection(): this {
    cy.contains('Join us').should('be.visible');
    return this;
  }
}

export default LeadershipPage;
