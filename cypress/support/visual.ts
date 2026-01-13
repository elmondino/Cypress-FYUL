/**
 * Visual Regression Testing Support
 * Uses Percy for screenshot comparison
 */

// Import Percy
import '@percy/cypress';

// Visual testing options interface
interface PercyOptions {
  widths?: number[];
  minHeight?: number;
  percyCSS?: string;
  scope?: string;
}

/**
 * Take a visual snapshot with Percy
 */
Cypress.Commands.add('visualSnapshot', (name: string, options: PercyOptions = {}) => {
  // Only run Percy in CI or when explicitly enabled
  if (Cypress.env('PERCY_TOKEN') || Cypress.env('visual')) {
    cy.percySnapshot(name, options);
  } else {
    cy.log(`[Visual] Skipped snapshot: ${name} (Percy not configured)`);
  }
});

/**
 * Take responsive visual snapshots
 */
Cypress.Commands.add('visualSnapshotResponsive', (name: string) => {
  const viewports = [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1920, height: 1080, name: 'desktop' },
  ];
  
  viewports.forEach(({ width, height, name: viewportName }) => {
    cy.viewport(width, height);
    cy.visualSnapshot(`${name}-${viewportName}`, { widths: [width] });
  });
});

export {};
