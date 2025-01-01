/* eslint-disable no-undef */
import React from 'react'
import QuestionRow from '../QuestionRow'
import { BrowserRouter } from 'react-router-dom'
import WholePage from '../../styled-components/WholePageDivStyle'
import GlobalStyles from '../../styled-components/GlobalStyles'
import { UserProvider } from '../../CurrentUser'

describe('<QuestionRow />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const row = {
      id: 1500,
      title: "ffgsdf",
      question: "sdfg",
      liked: 53,
      createdDate: null,
      answers: null,
      tags: [
          {
              id: 1,
              tagName: "co-producer scramble",
              tagDescription: "lest",
              createdDate: "2024-08-23",
              labName: "failing pish",
              labTopic: "sprinkles manage"
          }
      ],
      assignment: {
          id: 1
      },
      userProfile: {
          id: 1
      }
    }

    cy.intercept('GET', `/api/user-profiles/${row.userProfile.id}`, {
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


    const questionId = 1;  // Ensure this is a valid ID
    cy.intercept('GET', `/api/answers/count/*`, {
      statusCode: 200,
      body: 5,
    });
   
    cy.mount(
      <BrowserRouter>
      <WholePage>
        <GlobalStyles/>
        <UserProvider>
        <QuestionRow  question={row.question} title={row.title} createdDate={row.createdDate} tags={row.tags} id={row.id} liked={row.liked ? row.liked: 0} userProfileId={row.userProfile?.id} />
       </UserProvider>
       </WholePage>
       </BrowserRouter>
   
  
  
  )
  })
})

