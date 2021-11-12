describe('MyStore : Product List', () => {

    it('Is able to view the Product List page and view product items', () => {
        cy.visit('/')
        cy.get('[data-testid=productListLink]').should('exist')
        cy.get('[data-testid="productListLink"]').click()
        cy.get('.product-index-error').should('not.exist')
        cy.get('.product-index').should('exist')
        cy.get('.product-index').find('.product-item').should('have.length.above', 0)

        cy.get('.product-index').find('.product-item').first().get('.product-container').should('exist')
        cy.get('.product-index').find('.product-item').first().get('.product-container').children().get('.product-image').should('exist')
        cy.get('.product-index').find('.product-item').first().get('.product-container').children().get('h6').should('exist')
        cy.get('.product-index').find('.product-item').first().get('.product-container').children().get('p').should('exist')
        cy.get('.product-index').find('.product-item').first().get('.product-container').children().get('.select-dropdown').should('exist')
        cy.get('.product-index').find('.product-item').first().get('.product-container').children().get('.btn-primary').should('exist')
        cy.get('.product-index').find('.product-item').first().get('.product-container').children().get('p.add-product-to-cart-spinner').should('not.exist')
    })

    it('Is able to add products to the cart', () => {
        cy.visit('/')

        cy.get('.product-index').find('.product-item').first().children().find('.btn-primary').first().should('exist')
        cy.get('.product-index').find('.product-item').first().children().find('p.add-product-to-cart-spinner').should('not.exist')
        cy.get('.product-index').find('.product-item').first().children().find('.btn-primary').first().click()
            .then( () => {
                cy.get('.product-index').find('.product-item').first().children().find('p.add-product-to-cart-spinner').first().should('exist')
                
                cy.get('[data-testid=cartQuantity]').first().should('have.text', '[1]')

                cy.get('.product-index').find('.product-item').last().children().find('.btn-primary').last().should('exist')
                cy.get('.product-index').find('.product-item').last().children().find('p.add-product-to-cart-spinner').should('not.exist')
                cy.get('.product-index').find('.product-item').last().children().find('.btn-primary').last().click()
                    .then( () => {
                        cy.get('.product-index').find('.product-item').last().children().find('p.add-product-to-cart-spinner').last().should('exist')
                        
                        cy.get('[data-testid=cartQuantity]').first().should('have.text', '[2]')

                        cy.get('.product-index').find('.product-item').first().next().first().find('a').should('exist')
                        cy.get('.product-index').find('.product-item').first().next().first().find('img.product-image').should('exist')

                        cy.get('.product-index').find('.product-item').first().next().first().find('a').click()
                            .then( () => {
                                cy.get('.product-details-error').should('not.exist')
                                cy.get('p.add-product-to-cart-spinner').should('not.exist')
                                cy.get('.detail-container').should('exist')
                                cy.get('.product-image').should('exist')
                                cy.get('.detail-item').should('exist')
                                cy.get('.select-input').should('exist')
                                cy.get('.add-to-cart-button').should('exist')
                                cy.get('.back-link').should('exist')

                                cy.get('.add-to-cart-button').click()
                                    .then( () => {
                                        cy.get('p.add-product-to-cart-spinner').should('exist')
                                        cy.get('[data-testid=cartQuantity]').first().should('have.text', '[3]')

                                        cy.get('.back-link').click()
                                            .then( () => {
                                                cy.get('.product-index-error').should('not.exist')
                                                cy.get('.product-index').should('exist')
                                                cy.get('.product-index').find('.product-item').should('have.length.above', 0)
                                            })
                                    })
                            })
                    })
            })
    })

    it('Is able to view products added in the cart', () => {
        cy.get('[data-testid=cartLink]').should('exist')
        cy.get('[data-testid="cartLink"]').click()
            .then( () => {
                cy.get('h4').should('exist')
                cy.get('h4').should('have.text', 'Your Shopping Cart')
                cy.get('.empty-cart-message').should('not.exist')
                cy.get('.cart-container').should('exist')
                cy.get('.cart-container').find('.cart-panel').should('exist')
                cy.get('.cart-container').find('.cart-panel').find('p.total-cart-amount').should('exist')
                cy.get('.cart-container').find('.cart-panel').find('p.total-cart-amount').should('include.text', 'Total:')
                cy.get('.cart-container').find('.cart-panel').find('button.checkout-button').should('exist')
                cy.get('.cart-container').find('.cart-panel').find('button.checkout-button').should('include.text', 'Proceed to checkout')

                cy.get('.cart-container').find('.cart-item').should('have.length.above', 0)
                cy.get('.cart-container').find('.cart-item').should('have.length', 3)

                cy.get('.cart-container').find('.cart-item').first().find('.product-image').should('exist')
                cy.get('.cart-container').find('.cart-item').first().find('.cart-item-details').should('exist')
                cy.get('.cart-container').find('.cart-item').first().find('.cart-item-details').find('h6').should('exist')
                cy.get('.cart-container').find('.cart-item').first().find('.cart-item-details').find('p').should('exist')
                cy.get('.cart-container').find('.cart-item').first().find('.cart-item-details').find('div > label').should('exist')
                cy.get('.cart-container').find('.cart-item').first().find('.cart-item-details').find('div > label').should('have.text', 'Quantity:')
                cy.get('.cart-container').find('.cart-item').first().find('.cart-item-details').find('.number-input').should('exist')
                cy.get('.cart-container').find('.cart-item').first().find('.cart-item-details').find('.remove-cart-item').should('exist')
                cy.get('.cart-container').find('.cart-item').first().find('.cart-item-details').find('.remove-cart-item').find('a.remove-cart-item-link').should('exist')
                cy.get('.cart-container').find('.cart-item').first().find('.cart-item-details').find('.remove-cart-item').find('a.remove-cart-item-link').should('have.text', '× Remove')
            })
    })

    it('Is able to checkout products added in the cart', () => {
        cy.get('[data-testid=cartLink]').should('exist')
        cy.get('[data-testid="cartLink"]').click()
            .then( () => {
                cy.get('.checkout-button').should('exist')
                cy.get('.checkout-button').click()
                    .then( () => {
                        // e2e test user should have been primed in the database at this point
                        cy.get('[data-testid=firstNameInputText]').should('exist')
                        cy.get('[data-testid=firstNameInputText]').type('e2eTest')
                        cy.get('[data-testid=lastNameInputText]').should('exist')
                        cy.get('[data-testid=lastNameInputText]').type('e2eUser')
                        cy.get('[data-testid=passwordInputText]').should('exist')
                        cy.get('[data-testid=passwordInputText]').type('e2ePassword')
                        cy.get('.btn-primary').should('exist')
                        cy.get('.btn-primary').click()
                            .then( () => {
                                cy.get('[data-testid=fullNameInputText]').should('exist')
                                cy.get('[data-testid=fullNameInputText]').type('e2eTest')
                                cy.get('[data-testid=addressInputText]').should('exist')
                                cy.get('[data-testid=addressInputText]').type('123 Somewhere')
                                cy.get('[data-testid=creditCardInputText]').should('exist')
                                cy.get('[data-testid=creditCardInputText]').type('1234567890123456')
                                cy.get('.place-order-button').should('exist')
                                cy.get('.place-order-button').click()
                                    .then ( () => {
                                        cy.get('.place-order-spinner').should('exist')
                                    })
                                    .then ( () => {
                                        cy.get('h4').should('exist')
                                        cy.get('h4').should('have.text', 'Success!')
                                        cy.get('.order-confirmation-container').should('exist')

                                        cy.get('[data-testid=logoutLink]').should('exist')
                                        cy.get('[data-testid="logoutLink"]').click()
                                            .then( () => {
                                                cy.get('.product-index').should('exist')
                                                cy.get('[data-testid=logoutLink]').should('not.exist')
                                                cy.get('[data-testid=loginLink]').should('exist')
                                            })
                                    })
                            })
                    })
            })
    })
})