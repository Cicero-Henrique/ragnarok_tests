describe('Ragnarok Wiki Test Execution', { baseUrl: 'https://ragnarokwiki.com.br' }, () => {

    context('Hitting the real API', () => {
        beforeEach(() => {
            cy.intercept({
                method: 'GET',
                url: '**/api/monsters?name=&page=*&per_page=*&**=false',
            }).as('getMonsters');
            cy.intercept({
                method: 'GET',
                url: '**/api/monsters?**&dragon=true**',
            }).as('filterByRace');
            cy.intercept({
                method: 'GET',
                url: '**/api/monsters?name=*&**',
            }).as('searchByName');
        })
        it('Verify Initial Items Load', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.get('.card').should('have.length', 60)
            cy.contains('Monstros').should('be.visible')
        })
        it('Load More Items on Scroll', () => {
            cy.intercept({
                method: 'GET',
                url: '**/api/monsters?name=&page=2&per_page=*&**=false',
            }).as('getMoreMonsters');
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.contains('#1060').scrollIntoView()
            cy.wait('@getMoreMonsters').then(interception => {
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
            cy.wait('@searchByName')
            cy.contains('Quick Dark Shadow').should('be.visible')
            cy.get('h5.card-title span').each(($span) => {
                const text = $span.text().trim().toLowerCase();
                expect(text).to.contain('sha');
            });
        })
        it('Search Using Long Text', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.get('#search-name').type('shadow{enter}', { delay: 0 })
            cy.wait('@searchByName')
            cy.contains('Quick Dark Shadow').should('be.visible')
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
            cy.wait('@searchByName')
            cy.get('h5.card-title span').then((element) => {
                expect(element.length).to.equal(60)
            })
        })
        it('Search Using Special Characters', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.get('#search-name').type('aço{enter}', { delay: 0 })
            cy.wait('@searchByName')
            cy.contains('Chonchon de Aço Brutal').should('be.visible')
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
            cy.openAdvancedSearch()
            cy.get('#filter').should('be.visible')
            cy.contains('Pesquisa Avançada').click()
            cy.get('#filter').should('not.be.visible')
        })
        it('Filter by Race', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.openAdvancedSearch()
            cy.get('.icon-dragon').click()
            cy.wait('@filterByRace')
            cy.contains('Fafnir').should('be.visible')
            cy.contains('Dragão Mutante').should('be.visible')
        })
        it('Filter by Two Races', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.openAdvancedSearch()
            cy.get('.icon-dragon').click()
            cy.get('.icon-angel').click()
            cy.wait('@filterByRace')
            cy.contains('Angeling').should('be.visible')
            cy.contains('Dragão Mutante').should('be.visible')
        })
        it('Filter by Property', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.openAdvancedSearch()
            cy.get('.btn.btn-water').click()
            cy.wait('@getMonsters')
            cy.contains('Poring').should('be.visible')
            cy.contains('Lobisomem').should('be.visible')
        })
        it('Filter by Race and Property', () => {
            cy.intercept({
                method: 'GET',
                url: '**/api/monsters?**&dragon=true**&water=true**',
            }).as('filterByRaceAndProperty');
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.openAdvancedSearch()
            cy.get('.icon-dragon').click()
            cy.wait('@filterByRace')
            cy.get('.btn.btn-water').click()
            cy.wait('@filterByRaceAndProperty')
            cy.contains('Buwaya').should('be.visible')
            cy.get('.list-group > :nth-child(2) > .badge').then((element) => {
                expect(element.length).to.equal(9)
            }).each(($span) => {
                const text = $span.text().trim().toLowerCase();
                expect(text).to.contain('água');
            });
        })
        it('Filter by Two Races and Two Properties', () => {
            cy.intercept({
                method: 'GET',
                url: '**/api/monsters?**&water=true**&fire=true**',
            }).as('getMonstersFiltered');
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.openAdvancedSearch()
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
        it('Filter by Races, Properties, and Text', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.openAdvancedSearch()
            cy.get('.btn.btn-plant').click()
            cy.get('.btn.btn-brute').click()
            cy.wait('@getMonsters')
            cy.get('.btn.btn-water').click()
            cy.get('.btn.btn-wind').click()
            cy.wait('@getMonsters')
            cy.get('#search-name').type('lobisomem{enter}', { delay: 0 })
            cy.wait('@searchByName')
            cy.contains('Poring').should('not.exist')
            cy.get('.list-group > :nth-child(2) > .badge').then((element) => {
                expect(element.length).to.equal(1)
            })
            cy.get('h5.card-title span').then((element) => {
                const text = Cypress.$(element).text().trim().toLowerCase();
                expect(text).to.equal('lobisomem');
            })
        })
    })

    context('Moacking the API', () => {
        beforeEach(() => {
            cy.intercept(
                'GET',
                `**/api/monsters?name=&page=*&per_page=*&**=false`,
                { fixture: 'monsters' }
            ).as('getMockedMonsters')
            cy.visit('/')
        })

        it('Mocking a Filter by Race', () => {
            cy.intercept(
                'GET',
                `**/api/monsters?**&dragon=true**`,
                { fixture: 'monsters' }
            ).as('getMockedRace')
            cy.wait('@getMockedMonsters')
            cy.openAdvancedSearch()
            cy.get('.btn.btn-dragon').click()
            cy.wait('@getMockedRace')
            cy.contains('Sombra do Dragão').should('be.visible')
            cy.contains('Dragão Ancestral').should('be.visible')
        })
        it('Mocking a Filter by Two Races', () => {
            cy.intercept(
                'GET',
                `**/api/monsters?**&plant=true**&dragon=true**`,
                { fixture: 'monsters' }
            ).as('getMockedRaces')
            cy.visit('/')
            cy.wait('@getMockedMonsters')
            cy.openAdvancedSearch()
            cy.get('.btn.btn-dragon').click()
            cy.get('.btn.btn-plant').click()
            cy.wait('@getMockedRaces')
            cy.contains('Sombra do Dragão').should('be.visible')
        })
        it('Mocking a Filter by Property', () => {
            cy.intercept(
                'GET',
                `**/api/monsters?**&water=true**`,
                { fixture: 'monsters' }
            ).as('getMockedProperty')
            cy.wait('@getMockedMonsters')
            cy.openAdvancedSearch()
            cy.get('.btn.btn-water').click()
            cy.wait('@getMockedProperty')
            cy.contains('Lobisomem').should('be.visible')
        })
    })
})