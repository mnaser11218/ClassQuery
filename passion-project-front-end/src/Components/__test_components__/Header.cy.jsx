/* eslint-disable no-undef */
import React from 'react'
import Header from '../Header'
import styled from 'styled-components'
import { mount } from '@cypress/react';
import { UserProvider } from '../../CurrentUser';
import { BrowserRouter } from 'react-router-dom'; // If you're using react-router
import GlobalStyles from '../../styled-components/GlobalStyles';
import WholePage from '../../styled-components/WholePageDivStyle';

describe('<Header />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // Cypress.on('uncaught:exception', (err, runnable) => {
    //   // Prevent Cypress from failing the test due to this specific error
    //   if (err.message.includes('Cannot destructure property')) {
    //     return false; // Returning false prevents the test from failing
    //   }
    // });
    mount(
      <BrowserRouter>
    <WholePage>
      <GlobalStyles/>
      <UserProvider>
    <Header />
     </UserProvider>
     </WholePage>
     </BrowserRouter>
    )

    cy.get('input').should("have.attr", "placeholder","Search..."); 
    // test login button
    cy.getBySel("login-button").should("have.text", "Login")
    cy.getBySel("login-button").click()
    cy.url().should("contain", "/login")

    //test register button
    cy.getBySel("register-button").should("have.text", "Register")
    cy.getBySel("register-button").click()
    cy.url().should("contain", "/register")
  })
})