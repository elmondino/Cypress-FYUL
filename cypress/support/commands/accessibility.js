// Accessibility testing commands

/**
 * Check basic accessibility attributes
 */
Cypress.Commands.add('checkA11yBasics', (selector = 'body') => {
  cy.get(selector).within(() => {
    // Check images have alt text
    cy.get('img').each(($img) => {
      cy.wrap($img).should('satisfy', ($el) => {
        return $el.attr('alt') !== undefined || $el.attr('role') === 'presentation';
      });
    });
    
    // Check links are accessible
    cy.get('a').each(($link) => {
      cy.wrap($link).should('satisfy', ($el) => {
        return $el.text().trim() !== '' || $el.attr('aria-label') || $el.find('img[alt]').length > 0;
      });
    });
    
    // Check form inputs have labels
    cy.get('input, select, textarea').each(($input) => {
      const id = $input.attr('id');
      const ariaLabel = $input.attr('aria-label');
      const ariaLabelledBy = $input.attr('aria-labelledby');
      const placeholder = $input.attr('placeholder');
      
      expect(
        id || ariaLabel || ariaLabelledBy || placeholder,
        'Form input should have id, aria-label, aria-labelledby, or placeholder'
      ).to.exist;
    });
  });
});

/**
 * Check keyboard navigation
 */
Cypress.Commands.add('checkKeyboardNav', (selector) => {
  cy.get(selector)
    .focus()
    .should('have.focus')
    .type('{enter}');
});

/**
 * Check color contrast (basic check)
 */
Cypress.Commands.add('checkContrast', { prevSubject: true }, (subject) => {
  cy.wrap(subject).then(($el) => {
    const el = $el[0];
    const style = window.getComputedStyle(el);
    const bgColor = style.backgroundColor;
    const color = style.color;
    
    // Basic check that colors are defined
    expect(bgColor).to.not.equal('rgba(0, 0, 0, 0)');
    expect(color).to.not.equal('rgba(0, 0, 0, 0)');
  });
});

/**
 * Check ARIA roles
 */
Cypress.Commands.add('checkAriaRoles', () => {
  cy.get('[role]').each(($el) => {
    const role = $el.attr('role');
    const validRoles = [
      'alert', 'alertdialog', 'application', 'article', 'banner', 'button',
      'checkbox', 'columnheader', 'combobox', 'complementary', 'contentinfo',
      'definition', 'dialog', 'directory', 'document', 'form', 'grid',
      'gridcell', 'group', 'heading', 'img', 'link', 'list', 'listbox',
      'listitem', 'log', 'main', 'marquee', 'math', 'menu', 'menubar',
      'menuitem', 'menuitemcheckbox', 'menuitemradio', 'navigation', 'note',
      'option', 'presentation', 'progressbar', 'radio', 'radiogroup',
      'region', 'row', 'rowgroup', 'rowheader', 'scrollbar', 'search',
      'separator', 'slider', 'spinbutton', 'status', 'tab', 'tablist',
      'tabpanel', 'textbox', 'timer', 'toolbar', 'tooltip', 'tree',
      'treegrid', 'treeitem'
    ];
    expect(validRoles).to.include(role);
  });
});

/**
 * Test with screen reader simulation
 */
Cypress.Commands.add('testScreenReader', (selector) => {
  cy.get(selector).then(($el) => {
    const ariaLabel = $el.attr('aria-label');
    const ariaDescribedBy = $el.attr('aria-describedby');
    const text = $el.text();
    
    expect(
      ariaLabel || ariaDescribedBy || text,
      'Element should have screen reader text'
    ).to.exist;
  });
});
