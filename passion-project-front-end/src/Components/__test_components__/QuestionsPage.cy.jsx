/* eslint-disable no-undef */
import React from 'react'
import QuestionsPage from '../QuestionsPage'
import 'styled-components'; // Ensure styled-components is imported
import { mount } from '@cypress/react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../../CurrentUser';
import GlobalStyles from '../../styled-components/GlobalStyles';

describe('<QuestionsPage />', () => {
  it('renders', () => {
    cy.intercept("GET", "/api/questions", {
      body: 
        [{
          "id": 1500,
          "title": "From Cypress",
          "question": "sdfg",
          "liked": 53,
          "createdDate": null,
          "answers": null,
          "tags": [
              {
                  "id": 1,
                  "tagName": "co-producer scramble",
                  "tagDescription": "lest",
                  "createdDate": "2024-08-23",
                  "labName": "failing pish",
                  "labTopic": "sprinkles manage"
              }
          ],
          "assignment": {
              "id": 1
          },
          "userProfile": {
              "id": 1
          }
      }]
    })

    cy.mount(
    <BrowserRouter>
     <GlobalStyles/>
    <UserProvider>
    <QuestionsPage />
   </UserProvider>
   </BrowserRouter>
  
  
  )
  cy.get('div').contains('All Questions')
  })
})