describe('Visit navbar menu items', () => {
    it('Should open corresponding navbar pages', () => {
        cy.visit('http://localhost:4200');

        cy.contains('Add Contact').click();
        cy.url().should('include', '/contacts/create');

        cy.contains('My Contacts').click();
        cy.url().should('include', '/contacts/overview');

        cy.contains('About').click();
        cy.url().should('include', '');
    });

    it('My contacts page should load 10 contacts initially', () => {
        cy.visit('http://localhost:4200');

        cy.contains('My Contacts').click();
        cy.url().should('include', '/contacts/overview');

        // 10 initial rows of data + header row
        cy
            .get('tr').should('have.length', 11);
    })
})