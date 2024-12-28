/* eslint-disable no-undef */
describe('template spec', ()=>{
    beforeEach(()=>{
        it('passes', ()=>{
            cy.visit('localhost:3000/')
        })
    })

    it('left nav bar', ()=>{
        cy.get('.sc-foMnoT gIbPFj')
    })
    
})