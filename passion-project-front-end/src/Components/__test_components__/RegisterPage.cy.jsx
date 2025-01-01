/* eslint-disable no-undef */
import React from 'react'
import RegisterPage from '../RegisterPage'
import { UserProvider } from '../../CurrentUser'
import GlobalStyles from '../../styled-components/GlobalStyles'
import WholePage from '../../styled-components/WholePageDivStyle'
import { BrowserRouter } from 'react-router-dom'

describe('<RegisterPage />', () => {
  it('renders', () => {
 
    cy.intercept("POST", "/api/user-profiles", {
      statusCode: 200,
      body: {
          "name" : "Mohammed ",
          "emailAddress" : "mo",
          "password" : "mo",
          "aboutMe" : null,
          "created" : "2024-12-21",
          "answers" : null,
          "questions" : null
        
      }
    }).as("register")

    cy.mount(
      <BrowserRouter>
      <WholePage>
        <GlobalStyles/>
        <UserProvider>
        <RegisterPage />
       </UserProvider>
       </WholePage>
       </BrowserRouter>
    
  
  )
  })
})