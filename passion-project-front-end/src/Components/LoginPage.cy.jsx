/* eslint-disable no-undef */
import React from 'react'
import LoginPage from './LoginPage'
import { UserProvider } from '../CurrentUser'
import GlobalStyles from '../styled-components/GlobalStyles'
import WholePage from '../styled-components/WholePageDivStyle'
import { BrowserRouter } from 'react-router-dom'

describe('<LoginPage />', () => {
  it('renders', () => {
    cy.intercept("GET", "/api/user-profiles/username/mo", {
      statusCode: 200,
      body: {
          "id" : 1500,
          "name" : "Mohammed ",
          "emailAddress" : "mo",
          "password" : "mo",
          "aboutMe" : null,
          "created" : "2024-12-21",
          "answers" : null,
          "questions" : null
        
      }
    }).as("login")


    // see: https://on.cypress.io/mounting-react
    cy.mount(
    
   
    <BrowserRouter>
      <WholePage>
        <GlobalStyles/>
        <UserProvider>
        <LoginPage />
       </UserProvider>
       </WholePage>
       </BrowserRouter>
  
  )
  cy.getBySel("login-input").type('mo')
  cy.getBySel("login-password-input").type('mo')
  cy.getBySel("submit-login-button").click()
  cy.wait("@login")
  })
})