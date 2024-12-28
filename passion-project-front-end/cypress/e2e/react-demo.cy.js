/* eslint-disable no-undef */
describe('template spec', ()=>{
    beforeEach(()=>{
  
            cy.visit('localhost:3000/')
    })

    it('left nav bar', ()=>{
        // cy.get('.left-side-bar > :nth-child(1)').should('contain', 'Home')
                // cy.get('.left-side-bar nav').eq(1).should('contain', 'Question')
            // testing the left side bar has proper list 
        cy.get('.left-side-bar').then(navBar=>{
                cy.wrap(navBar).should('contain', 'Question')
                cy.wrap(navBar).should('contain', 'Home')
                cy.wrap(navBar).should('contain', 'Assignment')
                cy.wrap(navBar).should('contain', 'Tags')
                // cy.wrap(navBar).contains('Question').click()
        })
            // testing the course assignment home page
        cy.get('[div-cypress="assignment"]').then(assignment=>{
            cy.wrap(assignment).contains("for")
        })

    })

    // testing that click on each section in left navbar should direct to the correct endpoint

    it('left nav bar endpoints ', ()=>{
        cy.visit('localhost:3000/')
        // cy.get('.left-side-bar > :nth-child(1)').should('contain', 'Home')
                // cy.get('.left-side-bar nav').eq(1).should('contain', 'Question')
            // testing the left side bar has proper list 
        cy.get('.left-side-bar').then(navBar=>{
            // testing question section 
                cy.wrap(navBar).should('contain', 'Question')
                 cy.wrap(navBar).contains('Question').click()
                 cy.url().should('contain', '/questionspage')


                // testing home section 
                cy.wrap(navBar).should('contain', 'Home')
                cy.wrap(navBar).contains('Home').click()
                cy.url().should('contain', '/profile')
                // testing assignment section
                cy.wrap(navBar).should('contain', 'Assignment')
                cy.wrap(navBar).contains('Assignment').click()
                cy.url().should('contain', '/')
                // testing tags section
                cy.wrap(navBar).should('contain', 'Tags')
                cy.wrap(navBar).contains('Tags').click()
                cy.url().should('contain', 'tags')
             
        })
            // testing the course assignment home page
        // cy.get('[div-cypress="assignment"]').then(assignment=>{
        //     cy.wrap(assignment).contains("for")
        // })

    })

    it('test header', ()=>{
       cy.get('[div-cypress="header"]').then(header=>{

       })
    })
    
})