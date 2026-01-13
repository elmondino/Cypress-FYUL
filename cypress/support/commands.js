// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
// ***********************************************

/**
 * Visit a page with error handling
 */
Cypress.Commands.add('visitWithRetry', (url, options = {}) => {
  const maxRetries = options.retries || 3;
  const timeout = options.timeout || 30000;
  
  const attemptVisit = (attemptNumber) => {
    cy.visit(url, { timeout, failOnStatusCode: false }).then((resp) => {
      if (resp && resp.status >= 400 && attemptNumber < maxRetries) {
        cy.log(`Visit failed with status ${resp.status}, retrying... (${attemptNumber}/${maxRetries})`);
        cy.wait(2000);
        attemptVisit(attemptNumber + 1);
      }
    });
  };
  
  attemptVisit(1);
});

/**
 * Wait for page to be fully loaded
 */
Cypress.Commands.add('waitForPageLoad', (timeout = 10000) => {
  cy.window().should('have.property', 'document').then((doc) => {
    return new Cypress.Promise((resolve) => {
      if (doc.readyState === 'complete') {
        resolve();
      } else {
        doc.addEventListener('readystatechange', () => {
          if (doc.readyState === 'complete') {
            resolve();
          }
        });
      }
    });
  });
  
  cy.document().its('readyState').should('eq', 'complete');
});

/**
 * Check if element exists without failing
 */
Cypress.Commands.add('elementExists', (selector) => {
  cy.get('body').then(($body) => {
    return $body.find(selector).length > 0;
  });
});

/**
 * Scroll element into view and ensure it's visible
 */
Cypress.Commands.add('scrollToElement', (selector, position = 'center') => {
  cy.get(selector).scrollIntoView({ duration: 500 }).should('be.visible');
});

/**
 * Click with retry logic
 */
Cypress.Commands.add('clickWithRetry', (selector, options = {}) => {
  const maxAttempts = options.maxAttempts || 3;
  const timeout = options.timeout || 5000;
  
  const attemptClick = (attempt) => {
    if (attempt > maxAttempts) {
      throw new Error(`Failed to click ${selector} after ${maxAttempts} attempts`);
    }
    
    cy.get(selector, { timeout })
      .should('be.visible')
      .then(($el) => {
        try {
          $el.click();
        } catch (error) {
          cy.log(`Click attempt ${attempt} failed, retrying...`);
          cy.wait(1000);
          attemptClick(attempt + 1);
        }
      });
  };
  
  attemptClick(1);
});

/**
 * Take screenshot with timestamp
 */
Cypress.Commands.add('screenshotWithTimestamp', (name) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  cy.screenshot(`${name}_${timestamp}`);
});

/**
 * Wait for animations to complete
 */
Cypress.Commands.add('waitForAnimations', (selector, timeout = 3000) => {
  cy.get(selector).should(($el) => {
    const computedStyle = window.getComputedStyle($el[0]);
    const animationDuration = parseFloat(computedStyle.animationDuration);
    const transitionDuration = parseFloat(computedStyle.transitionDuration);
    
    if (animationDuration === 0 && transitionDuration === 0) {
      return true;
    }
  });
});

/**
 * Check external link without visiting
 */
Cypress.Commands.add('checkExternalLink', (selector) => {
  cy.get(selector)
    .should('have.attr', 'href')
    .then((href) => {
      cy.request({
        url: href,
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.be.oneOf([200, 301, 302, 307, 308]);
      });
    });
});

/**
 * Get element with retry
 */
Cypress.Commands.add('getWithRetry', (selector, options = {}) => {
  const retries = options.retries || 3;
  const timeout = options.timeout || 5000;
  
  return cy.get(selector, { timeout }).should('exist').and('be.visible');
});

/**
 * Validate SEO meta tags
 */
Cypress.Commands.add('validateSEO', () => {
  // Check title
  cy.title().should('not.be.empty');
  
  // Check meta description
  cy.get('head meta[name="description"]').should('exist');
  
  // Check viewport
  cy.get('head meta[name="viewport"]').should('exist');
  
  // Check charset
  cy.document().should('have.property', 'charset', 'UTF-8');
});

/**
 * Test responsive design
 */
Cypress.Commands.add('testResponsive', (callback) => {
  const viewports = ['mobile', 'tablet', 'desktop'];
  
  viewports.forEach((viewport) => {
    cy.setViewport(viewport);
    cy.log(`Testing on ${viewport}`);
    callback(viewport);
  });
});
