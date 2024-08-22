describe('Hacker Stories', { baseUrl: 'https://ragnarokwiki.com.br' }, () => {

    context('Hitting the real API', () => {
        beforeEach(() => {
            cy.intercept({
                method: 'GET',
                url: '**/api/monsters?**',
            }).as('getMonsters');
            cy.intercept({
                method: 'GET',
                url: '**/api/monsters?**&dragon=true**',
              }).as('filterByRace');
            cy.intercept({
            method: 'GET',
            url: '**/api/monsters?**&dragon=true**&water=true**',
            }).as('filterByRaceAndProperty');
            cy.intercept({
                method: 'GET',
                url: '**/api/monsters?**&water=true**',
            }).as('getMonstersFiltered');
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
            cy.wait('@filterByRace')
            cy.contains('Fafnir').should('be.visible')
            cy.contains('Dragão Mutante').should('be.visible')
        })
        it('Filter by Two Races', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.clock()
            cy.contains('Pesquisa Avançada').click()
            cy.tick(1000)
            cy.get('.icon-dragon').click()
            cy.get('.icon-angel').click()
            cy.wait('@filterByRace')
            cy.contains('Angeling').should('be.visible')
            cy.contains('Dragão Mutante').should('be.visible')
        })
        it('Filter by Property', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.clock()
            cy.contains('Pesquisa Avançada').click()
            cy.tick(1000)
            cy.get('.btn.btn-water').click()
            cy.wait('@getMonsters')
            cy.contains('Poring').should('be.visible')
            cy.contains('Lobisomem').should('be.visible')
        })
        it('Filter by Race and Property', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.clock()
            cy.contains('Pesquisa Avançada').click()
            cy.tick(1000)
            cy.get('.icon-dragon').click()
            cy.wait('@filterByRace')
            cy.get('.btn.btn-water').click()
            cy.wait('@filterByRaceAndProperty')
            cy.get('.list-group > :nth-child(2) > .badge').then((element) => {
                expect(element.length).to.equal(9)
            }).each(($span) => {
                const text = $span.text().trim().toLowerCase();
                expect(text).to.contain('água');
            });
        })
        it('Filter by Two Races and Two Properties', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.clock()
            cy.contains('Pesquisa Avançada').click()
            cy.tick(1000)
            cy.get('.btn.btn-plant').click()
            cy.get('.btn.btn-brute').click()
            cy.wait('@getMonsters')
            cy.get('.btn.btn-water').click()
            cy.get('.btn.btn-fire').click()
            cy.wait('@getMonstersFiltered')
            cy.get('.list-group > :nth-child(2) > .badge').then((elements) => {
                expect(elements.length).to.equal(60);
                const firstTenElements = Cypress._.slice(elements, 0, 10);
                Cypress._.each(firstTenElements, ($span) => {
                    const text = Cypress.$($span).text().trim().toLowerCase();
                    expect(text).to.satisfy((txt) => txt.includes('fogo') || txt.includes('água'));
                });
            });
        })
    })
})
