import { BasePage } from './BasePage';

/**
 * LeadershipPage - Page Object for FYUL.com leadership page
 */
export class LeadershipPage extends BasePage {
  protected readonly path = '/leadership';
  protected readonly pageTitle = /Leadership|FYUL/i;

  private readonly selectors = {
    heading: '[data-testid="leadership-heading"], h1',
    leaderCards: '[data-testid="leader-card"], article, .leader, [class*="leader"]',
    leaderName: '[data-testid="leader-name"], h2, h3',
    leaderTitle: '[data-testid="leader-title"], p, [class*="title"]',
  };

  private get heading() {
    return cy.get(this.selectors.heading).first();
  }

  private get leaderCards() {
    return cy.get(this.selectors.leaderCards);
  }

  verifyHeading(): this {
    this.heading.should('be.visible');
    return this;
  }

  verifyLeaderCards(): this {
    this.leaderCards.should('have.length.greaterThan', 0);
    return this;
  }

  verifyLeader(name: string): this {
    cy.contains(this.selectors.leaderName, name).should('be.visible');
    return this;
  }
}

export default LeadershipPage;
