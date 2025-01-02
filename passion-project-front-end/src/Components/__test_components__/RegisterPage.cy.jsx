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
          "name" : "Cypress ",
          "emailAddress" : "cypress@gmail.com",
          "password" : "cypress",
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
  cy.getBySel('register-page-submit-button').click();
  cy.wait('@register').its('response.statusCode').should('eq', 200);
  cy.getBySel("register-page").then(register=>{
      cy.url().should("contain", "login")

  })


  
  })
})

{/* <CenterPageDiv data-test="register-page">
<H1HeaderTag data-test="register-page-header">Register </H1HeaderTag>
<StyledInput data-test="register-page-input-name" div-cypress="name-input" placeholder="name" type="name" value={name}
onChange={e=>setName(e.target.value)}
/>
<StyledInput data-test="register-page-input-email"  div-cypress="email-input" placeholder="email" type="email" value={userName}
onChange={e=>setUserName(e.target.value)}
/>
<StyledInput data-test="register-page-password-email"  div-cypress="password-input" placeholder="password" type="password" value={password} 
autocomplete={'new-password'}
onChange={e=>setPassword(e.target.value)}
/>
<BlueButton data-test="register-page-submit-button"  div-cypress="button-submit-register" onClick={handleRegister}>Register</BlueButton>
</CenterPageDiv> */}