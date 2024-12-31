import React from 'react'
import RightSideBar from './RightSideBar'

describe('<RightSideBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RightSideBar />)
    cy.get('div').should('exist'); // Or another element to check

  })
})