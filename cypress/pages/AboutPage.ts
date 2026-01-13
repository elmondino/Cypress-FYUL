import { BasePage } from './BasePage';

/**
 * AboutPage - Page Object for FYUL.com about page
 */
export class AboutPage extends BasePage {
  protected readonly path = '/about';
  protected readonly pageTitle = /About|FYUL/i;

  private readonly selectors = {
    heading: '[data-testid="about-heading"], h1',
    content: '[data-testid="about-content"], main, article',
    teamSection: '[data-testid="team-section"], section:has(h2)',
  };

  private get heading() {
    return cy.get(this.selectors.heading).first();
  }

  private get content() {
    return cy.get(this.selectors.content).first();
  }

  verifyHeading(): this {
    this.heading.should('be.visible');
    return this;
  }

  verifyContent(): this {
    this.content.should('be.visible');
    return this;
  }
}

export default AboutPage;
