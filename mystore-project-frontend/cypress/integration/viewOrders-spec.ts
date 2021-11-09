describe('MyStore : View Orders', () => {

    it('Is able to login, view the Order History page, view order items, and logout', () => {
        cy.visit('/')
        cy.get('[data-testid=loginLink]').should('exist')
        cy.get('[data-testid="loginLink"]').click()
            .then( () => {
                cy.get('h4').should('exist')
                cy.get('h4').should('have.text', 'Welcome to MyStore!')
                cy.get('h5').should('exist')
                cy.get('.secure-authentication-panel > p').should('exist')
                cy.get('.secure-authentication-panel > p').should('have.text', 'Please sign in or create an account.')
                cy.get('#signinRadioButton').should('exist')
                cy.get('label[for="signinRadioButton"]').should('exist')
                cy.get('label[for="signinRadioButton"]').should('have.text', 'Sign in')
                cy.get('#createAccountRadioButton').should('exist')
                cy.get('label[for="createAccountRadioButton"]').should('exist')
                cy.get('label[for="createAccountRadioButton"]').should('have.text', 'Create account')
                cy.get('h5').should('have.text', 'Sign in to your account')

                cy.get('[data-testid=firstNameInputText]').should('exist')
                cy.get('[data-testid=firstNameInputText]').type('e2eTest')
                cy.get('[data-testid=lastNameInputText]').should('exist')
                cy.get('[data-testid=lastNameInputText]').type('e2eUser')
                cy.get('[data-testid=passwordInputText]').should('exist')
                cy.get('[data-testid=passwordInputText]').type('e2ePassword')
                cy.get('.btn-primary').should('exist')
                cy.get('.btn-primary').click()
                    .then( () => {
                        cy.get('.signin-spinner').should('exist')
                    })
                    .then( () => {
                        cy.get('[data-testid=viewOrdersLink]').should('exist')
                        cy.get('[data-testid="viewOrdersLink"]').click()
                            .then( () => {
                                cy.get('h4').should('exist')
                                cy.get('.order-index-error').should('not.exist')
                                cy.get('.order-index').should('exist')
                                cy.get('h4').should('have.text', 'Order History')
                                cy.get('.order-panel').should('exist')
                                cy.get('.order-panel').find('.order-item').should('have.length.above', 0)

                                cy.get('.order-item-container').should('exist')
                                cy.get('.order-item-details').should('exist')
                                cy.get('.order-item-link').should('exist')
                                cy.get('.order-item-link > a').should('exist')

                                cy.get('.order-item-link > a').click()
                                    .then( () => {
                                        cy.get('.order-index-error').should('not.exist')
                                        cy.get('.order-details').should('exist')
                                        cy.get('h4').should('exist')
                                        cy.get('h4').should('have.text', 'Order Details')
                                        cy.get('.order-details-container').should('exist')
                                        cy.get('.order-item-details').should('exist')
                                        cy.get('.order-product-details').should('exist')
                                        cy.get('.product-listing').should('exist')
                                        cy.get('.product-image-container').should('exist')
                                        cy.get('.product-image').should('exist')
                                        cy.get('.product-detail-item').should('exist')
                                        cy.get('.order-details-link').should('exist')
                                        cy.get('.order-details-link > a').should('exist')

                                        cy.get('.order-details-link > a').click()
                                            .then( () => {
                                                cy.get('.order-index').should('exist')
                                                cy.get('[data-testid=logoutLink]').should('exist')

                                                cy.get('[data-testid="logoutLink"]').click()
                                                    .then( () => {
                                                        cy.get('.product-index').should('exist')
                                                    })
                                            })
                                    })
                            })
                    })
            })
    })
})