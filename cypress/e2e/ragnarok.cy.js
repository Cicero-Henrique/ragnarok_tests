describe('Hacker Stories', { baseUrl: 'https://ragnarokwiki.com.br' }, () => {

    context('Hitting the real API', () => {
        beforeEach(() => {
            cy.intercept({
                method: 'GET',
                url: '**/api/monsters?**',
            }).as('getMonsters');
        })
        it('Verify Initial Items Load', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.get('.card').should('have.length', 60)
            cy.contains('Monstros').should('be.visible')
        })
        it('Load More Items on Scroll', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.contains('#1060').scrollIntoView()
            cy.wait('@getMonsters').then(interception => {
                expect(interception.response.statusCode).to.eq(200);
            })
        })
        it('Back to Top Button Functionality', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.contains('#1030').scrollIntoView()
            cy.get('#backToTopButton').should('be.visible')
            cy.get('#backToTopButton').click()
            cy.contains('Monstros').should('be.visible')
        })
        it('Search Using Short Text', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.get('#search-name').type('sha{enter}')
            cy.wait('@getMonsters')
            cy.get('h5.card-title span').each(($span) => {
                const text = $span.text().trim().toLowerCase();
                expect(text).to.contain('sha');
            });
        })
        it('Search Using Long Text', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.get('#search-name').type('shadow{enter}')
            cy.wait('@getMonsters')
            cy.get('h5.card-title span').then((element) => {
                expect(element.length).to.equal(2)
            }).each(($span) => {
                const text = $span.text().trim().toLowerCase();
                expect(text).to.contain('shadow');
            });
        })
    })
})
