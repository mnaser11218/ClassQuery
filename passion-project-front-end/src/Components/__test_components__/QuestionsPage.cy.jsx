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


    cy.intercept('GET', `/api/user-profiles/*`, {
      statusCode: 201,
      body:  {
        "id": 1,
        "name": "Cypress Tester",
        "emailAddress": "ChatGPT",
        "password": "ChatGPT",
        "aboutMe": "ChatGPT",
        "created": "2024-08-23",
        "answers": null,
        "questions": null
    },
    }).as('getUserProfile');


  
    cy.intercept('GET', `/api/answers/count/*`, {
      statusCode: 200,
      body: 5,
    }).as("getAnswerCount")
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
      },
      {
        "id": 1501,
        "title": "what is postman?",
        "question": "Why do we use postman?",
        "liked": 7,
        "createdDate": "2024-12-21",
        "answers": null,
        "tags": [],
        "assignment": {
            "id": 1500
        },
        "userProfile": {
            "id": 1500
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
  cy.getBySel("question-row").then(row=>{
    cy.wrap(row).eq(0).should('contain', 'From Cypress')
    cy.wrap(row).eq(1).should('contain', 'what is postman')
    cy.wrap(row).eq(1).should('exist')
    cy.wrap(row).eq(2).should('not.exist')
  })
  })
})