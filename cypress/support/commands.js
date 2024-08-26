Cypress.Commands.add('openAdvancedSearch', () => {
    cy.clock()
    cy.contains('Pesquisa Avançada').click()
    cy.tick(1000)
})