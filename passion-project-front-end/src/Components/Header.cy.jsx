/* eslint-disable no-undef */
import React from 'react'
import Header from './Header'
import styled from 'styled-components'
import { mount } from '@cypress/react';
import { UserProvider } from '../CurrentUser';
import { BrowserRouter } from 'react-router-dom'; // If you're using react-router

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
      <UserProvider>
    <Header />
     </UserProvider>
     </BrowserRouter>
    )

    cy.get('div').should('exist'); // Or another element to check

  })
})