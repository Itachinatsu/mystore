describe('MyStore app End-to-End Tests', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('MyStore')
    cy.title().should('equal', 'MystoreFrontend')
  })
})
