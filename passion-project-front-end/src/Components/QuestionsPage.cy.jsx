/* eslint-disable no-undef */
import React from 'react'
import QuestionsPage from './QuestionsPage'
import 'styled-components'; // Ensure styled-components is imported
import { mount } from '@cypress/react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../CurrentUser';

describe('<QuestionsPage />', () => {
  it('renders', () => {
      // see: https://on.cypress.io/mounting-react
   
    // see: https://on.cypress.io/mounting-react
    cy.mount(
    
    
   
    <BrowserRouter>
    <UserProvider>
    <QuestionsPage />
   </UserProvider>
   </BrowserRouter>
  
  
  )
  })
})