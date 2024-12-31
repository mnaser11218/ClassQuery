import React from 'react'
import RegisterPage from './RegisterPage'

describe('<RegisterPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RegisterPage />)
  })
})