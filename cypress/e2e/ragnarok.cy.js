describe('Hacker Stories', { baseUrl: 'https://ragnarokwiki.com.br' }, () => {
    const initialTerm = 'React'
    const newTerm = 'Cypress'

    context('Hitting the real API', () => {
        beforeEach(() => {
            cy.intercept({
                method: 'GET',
                url: '**/api/monsters?**',
            }).as('getMonsters');
        })
        it('Open the page, and shows 60 monsters', () => {
            cy.visit('/')
            cy.wait('@getMonsters')
            cy.get('.card').should('have.length', 60)
            cy.contains('Monstros').should('be.visible')
        })
        //   beforeEach(() => {
        //     cy.intercept({
        //       method: 'GET',
        //       pathname: '**/search',
        //       query: {
        //         query: initialTerm,
        //         page: '0'
        //       }
        //     }).as('getStories')

        //     cy.visit('/')
        //     cy.wait('@getStories')
        //   })

        //   it('shows 20 stories, then the next 20 after clicking "More"', () => {
        //     cy.intercept({
        //       method: 'GET',
        //       pathname: '**/search',
        //       query: {
        //         query: initialTerm,
        //         page: '1'
        //       }
        //     }).as('getNextStories')

        //     cy.get('.item').should('have.length', 20)

        //     cy.contains('More')
        //       .should('be.visible')
        //       .click()
        //     cy.wait('@getNextStories')

        //     cy.get('.item').should('have.length', 40)
        //   })

        //   it('searches via the last searched term', () => {
        //     cy.intercept(
        //       'GET',
        //       `**/search?query=${newTerm}&page=0`
        //     ).as('getNewTermStories')

        //     cy.get('#search')
        //       .should('be.visible')
        //       .clear()
        //       .type(`${newTerm}{enter}`)

        //     cy.wait('@getNewTermStories')

        //     cy.getLocalStorage('search')
        //       .should('be.equal', newTerm)

        //     cy.get(`button:contains(${initialTerm})`)
        //       .should('be.visible')
        //       .click()

        //     cy.wait('@getStories')

        //     cy.getLocalStorage('search')
        //       .should('be.equal', initialTerm)

        //     cy.get('.item').should('have.length', 20)
        //     cy.get('.item')
        //       .first()
        //       .should('be.visible')
        //       .and('contain', initialTerm)
        //     cy.get(`button:contains(${newTerm})`)
        //       .should('be.visible')
        //   })
    })
})

// https://ragnarokwiki.com.br/api/monsters?name=&page=1&per_page=60&formless=false&undead=false&brute=false&plant=false&insect=false&fish=false&demon=false&human=false&angel=false&dragon=false&neutral=false&water=false&earth=false&fire=false&wind=false&poison=false&holy=false&dark=false&ghost=false&maledict=false