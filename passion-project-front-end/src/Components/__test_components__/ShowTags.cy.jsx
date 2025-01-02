/* eslint-disable no-undef */
import React from 'react'
import ShowTags from '../ShowTags'
import { UserProvider } from '../../CurrentUser'
import GlobalStyles from '../../styled-components/GlobalStyles'
import { BrowserRouter } from 'react-router-dom'

describe('<ShowTags />', () => {
  it('renders', () => {
   
    cy.intercept("GET", "/api/tags", {

      body: [
        {
          "id": 1,
          "tagName": "co-producer scramble",
          "tagDescription": "lest",
          "createdDate": "2024-08-23",
          "labName": "failing pish",
          "labTopic": "sprinkles manage",
          "questions": null
      },
      {
          "id": 2,
          "tagName": "aha circa",
          "tagDescription": "colour charming swiftly",
          "createdDate": "2024-08-23",
          "labName": "narrowcast",
          "labTopic": "how shrill",
          "questions": null
      },
      {
          "id": 3,
          "tagName": "overdub woot woot",
          "tagDescription": "brr and perky",
          "createdDate": "2024-08-23",
          "labName": "pleasure",
          "labTopic": "after once",
          "questions": null
      }
      ]
    }).as("getTags")

    
    cy.mount(
      <BrowserRouter>
      <GlobalStyles/>
     <UserProvider>
     <ShowTags />
    </UserProvider>
    </BrowserRouter>
   
  )

  cy.wait("@getTags")
  })
})