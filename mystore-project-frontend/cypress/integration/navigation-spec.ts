describe('MyStore : Header', () => {

    it('Contains header navigation links', () => {
        cy.visit('/')
        cy.get('.header').find('a').should('have.length', 3)
        cy.get('[data-testid=productListLink]').should('exist')
        cy.get('[data-testid=cartLink]').should('exist')
        cy.get('[data-testid=loginLink]').should('exist')
        cy.get('[data-testid=viewOrdersLink]').should('not.exist')
        cy.get('[data-testid=logoutLink]').should('not.exist')
    })
})