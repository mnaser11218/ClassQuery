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
    // cy.intercept("POST", "/api/user-profiles/username/mo", {
    //   statusCode: 200,
    //   body: {
    //       "id" : 1500,
    //       "name" : "Mohammed ",
    //       "emailAddress" : "mo",
    //       "password" : "mo",
    //       "aboutMe" : null,
    //       "created" : "2024-12-21",
    //       "answers" : null,
    //       "questions" : null
        
    //   }
    // }).as("postQuestion")

    // cy.intercept('POST', '/api/users', {
    //   statusCode: 201,
    //   body: { name: 'John Doe', email: 'john@example.com' },
    // }).as('createUser');

    const questionData = {
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
    cy.mount(
      <BrowserRouter>
      <WholePage>
        <GlobalStyles/>
        <UserProvider>
        <QuestionRow props={questionData} />
       </UserProvider>
       </WholePage>
       </BrowserRouter>
   
  
  
  )
  })
})