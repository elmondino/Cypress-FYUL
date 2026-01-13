/**
 * Page Object Model for the Home Page
 */
class HomePage {
  // Selectors
  elements = {
    hero: () => cy.get('body'),
    heroHeading: () => cy.contains('h1, h2, h3', /limitless|creativity/i),
    brandsSection: () => cy.contains(/your favorite products run on fyul/i).parent(),
    printifyCard: () => cy.contains('Printify').parent(),
    printfulCard: () => cy.contains('Printful').parent(),
    snowCommerceCard: () => cy.contains('Snow Commerce').parent(),
    careersSection: () => cy.contains(/bring your skills/i).parent(),
    careersLink: () => cy.contains('a', /explore our open roles|careers/i),
    leadershipLink: () => cy.contains('a', /meet our leadership|leadership/i),
    navigation: () => cy.get('nav, header'),
    footer: () => cy.get('footer, [role="contentinfo"]'),
    footerLinks: () => cy.get('footer a, [role="contentinfo"] a'),
    aboutLink: () => cy.contains('a', 'About'),
    privacyPolicyLink: () => cy.contains('a', 'Privacy Policy'),
  };

  // Actions
  visit() {
    cy.visit('/');
    cy.waitForPageLoad();
    return this;
  }

  verifyPageLoaded() {
    this.elements.hero().should('be.visible');
    this.elements.heroHeading().should('be.visible');
    return this;
  }

  verifyHeroSection() {
    this.elements.heroHeading()
      .should('be.visible')
      .and('satisfy', ($el) => {
        const text = $el.text().toLowerCase();
        return text.includes('limitless') || text.includes('creativity');
      });
    return this;
  }

  verifyBrandsSection() {
    this.elements.brandsSection().should('be.visible');
    this.elements.printifyCard().should('be.visible');
    this.elements.printfulCard().should('be.visible');
    this.elements.snowCommerceCard().should('be.visible');
    return this;
  }

  verifyPrintifyBrand() {
    this.elements.printifyCard().within(() => {
      cy.contains('Printify').should('be.visible');
      cy.contains(/print on demand|sellers/i).should('be.visible');
    });
    return this;
  }

  verifyPrintfulBrand() {
    this.elements.printfulCard().within(() => {
      cy.contains('Printful').should('be.visible');
    });
    return this;
  }

  verifySnowCommerceBrand() {
    this.elements.snowCommerceCard().within(() => {
      cy.contains('Snow Commerce').should('be.visible');
    });
    return this;
  }

  verifyCareersSection() {
    this.elements.careersSection().should('be.visible');
    this.elements.careersLink().should('be.visible').and('have.attr', 'href');
    return this;
  }

  verifyLeadershipLink() {
    this.elements.leadershipLink().should('be.visible').and('have.attr', 'href');
    return this;
  }

  clickCareersLink() {
    this.elements.careersLink().then(($link) => {
      const href = $link.attr('href');
      cy.log('Careers link:', href);
    });
    return this;
  }

  clickLeadershipLink() {
    this.elements.leadershipLink().click();
    cy.waitForPageLoad();
    return this;
  }

  clickAboutLink() {
    this.elements.aboutLink().click();
    cy.waitForPageLoad();
    return this;
  }

  verifyNavigation() {
    this.elements.navigation().should('exist');
    return this;
  }

  verifyFooter() {
    this.elements.footer().should('be.visible');
    this.elements.footerLinks().should('have.length.greaterThan', 0);
    return this;
  }

  verifyFooterLinks() {
    const expectedLinks = ['About', 'Leadership', 'Careers', 'Privacy Policy'];
    
    expectedLinks.forEach((linkText) => {
      cy.contains('footer a, [role="contentinfo"] a', linkText, { matchCase: false })
        .should('exist');
    });
    return this;
  }

  clickPrivacyPolicyLink() {
    this.elements.privacyPolicyLink().click();
    cy.waitForPageLoad();
    return this;
  }

  verifyBrandLinks() {
    cy.contains('a', 'Printify').should('have.attr', 'href').and('include', 'printify.com');
    cy.contains('a', 'Printful').should('have.attr', 'href').and('include', 'printful.com');
    cy.contains('a', 'Snow Commerce').should('have.attr', 'href').and('include', 'snowcommerce.com');
    return this;
  }

  verifyAllSections() {
    this.verifyHeroSection();
    this.verifyBrandsSection();
    this.verifyCareersSection();
    this.verifyFooter();
    return this;
  }

  // Performance checks
  checkPerformance() {
    cy.measurePerformance();
    return this;
  }

  // SEO checks
  checkSEO() {
    cy.validateSEO();
    cy.title().should('include', 'FYUL');
    return this;
  }

  // Accessibility checks
  checkAccessibility() {
    cy.checkA11yBasics();
    return this;
  }
}

export default HomePage;
