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
            cy.get('#search-name').type('sha{enter}', { delay: 0 })
            cy.wait('@getMonsters')
            cy.get('h5.card-title span').each(($span) => {
                const text = $span.text().trim().toLowerCase();
                expect(text).to.contain('sha');
            });
        })
        it('Search Using Long Text', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.get('#search-name').type('shadow{enter}', { delay: 0 })
            cy.wait('@getMonsters')
            cy.get('h5.card-title span').then((element) => {
                expect(element.length).to.equal(2)
            }).each(($span) => {
                const text = $span.text().trim().toLowerCase();
                expect(text).to.contain('shadow');
            });
        })
        it('Clear Search Bar After Search', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.get('#search-name').clear()
            cy.get('#search-name').type('{enter}', { delay: 0 })
            cy.wait('@getMonsters')
            cy.get('h5.card-title span').then((element) => {
                expect(element.length).to.equal(60)
            })
        })
        it('Search Using Special Characters', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.get('#search-name').type('aço{enter}', { delay: 0 })
            cy.wait('@getMonsters')
            cy.get('h5.card-title span').then((element) => {
                expect(element.length).to.equal(2)
            }).each(($span) => {
                const text = $span.text().trim().toLowerCase();
                expect(text).to.contain('aço');
            });
        })
        it('Show Advanced Search Bar', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.contains('Pesquisa Avançada').click()
            cy.get('#filter').should('be.visible')
        })
        it('Hide Advanced Search Bar', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.clock()
            cy.contains('Pesquisa Avançada').click()
            cy.tick(1000)
            cy.get('#filter').should('be.visible')
            cy.contains('Pesquisa Avançada').click()
            cy.get('#filter').should('not.be.visible')
        })
        it('Filter by Race', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.clock()
            cy.contains('Pesquisa Avançada').click()
            cy.tick(1000)
            cy.get('.icon-dragon').click()
            cy.wait('@getMonsters')
            cy.contains('Fafnir').should('be.visible')
            cy.contains('Dragão Mutante').should('be.visible')
        })
    })
})
