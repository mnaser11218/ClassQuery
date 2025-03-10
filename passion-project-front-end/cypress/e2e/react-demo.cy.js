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

    it.only('left nav bar endpoints ', ()=>{
        cy.visit('localhost:3000/')
        // cy.get('.left-side-bar > :nth-child(1)').should('contain', 'Home')
                // cy.get('.left-side-bar nav').eq(1).should('contain', 'Question')
            // testing the left side bar has proper list 
        cy.get('.left-side-bar').then(navBar=>{
            // testing question section 
                cy.wrap(navBar).should('contain', 'Question')
                 cy.wrap(navBar).contains('Question').click()
                 cy.url().should('contain', '/questionspage')
                //  cy.get('[div-cypress="questions-page"]').first().should('have.text', 'ffgsdf')

                
                // // testing home section 
                // cy.wrap(navBar).should('contain', 'Home')
                // cy.wrap(navBar).contains('Home').click()
                // cy.url().should('contain', '/profile')
                // // testing assignment section
                // cy.wrap(navBar).should('contain', 'Assignment')
                // cy.wrap(navBar).contains('Assignment').click()
                // cy.url().should('contain', '/')
                // // testing tags section
                // cy.wrap(navBar).should('contain', 'Tags')
                // cy.wrap(navBar).contains('Tags').click()
                // cy.url().should('contain', 'tags')
             
        })
            // testing the course assignment home page
        // cy.get('[div-cypress="assignment"]').then(assignment=>{
        //     cy.wrap(assignment).contains("for")
        // })

    })

    it('test register and login', ()=>{
     
    

        cy.get('[div-cypress="register-button"]').click()
        cy.url().should('include', '/register')
       
        // cy.get('[div-cypress="name-input"]').type('cypress')

        // cy.get('[div-cypress="email-input"]').type('cypress@gmail.com')
        // cy.get('[div-cypress="password-input"]').type('cypress')
        // cy.get('[div-cypress="button-submit-register"]').click()

        // cy.url().should('include', '/login')
        // cy.get('[div-cypress="login-input"]').type('cypress@gmail.com')
        // cy.get('[div-cypress="login-password-input"]').type('cypress')

        
        // cy.url().should('include', '/login')
    })
    
})