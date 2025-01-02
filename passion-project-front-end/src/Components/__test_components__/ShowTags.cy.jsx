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
          "tagName": "Cypress tagName 1",
          "tagDescription": "Cypress description 1",
          "createdDate": "2024-08-23",
          "labName": "failing pish",
          "labTopic": "sprinkles manage",
          "questions": null
      },
      {
          "id": 2,
          "tagName": "Cypress tagName 2",
          "tagDescription": "Cypress description 2",
          "createdDate": "2024-08-23",
          "labName": "narrowcast",
          "labTopic": "how shrill",
          "questions": null
      },
      {
          "id": 3,
          "tagName": "Cypress tagName 3",
          "tagDescription": "Cypress description 3",
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

  cy.wait("@getTags").getBySel("tags-header").should("contain", "Tags")
  cy.getBySel("tags-header-description").should("contain", "A tag is a keyword")
  // test add tag button
  cy.getBySel("tags-addtag-button").then(button=>{
    cy.wrap(button).should("contain", `Tag`)
    cy.wrap(button).click()
    cy.url().should("contain", "/addtag")
  })

  // test individual tag
  cy.getBySel("tags-individual-tag").then(tag=>{
    // test first tag
    cy.wrap(tag).getBySel("tags-individual-tag-name").eq(0).should("contain", "Cypress tagName 1")
    cy.wrap(tag).getBySel("tags-individual-tag-description").eq(0).should("contain", "Cypress description 1")
    cy.wrap(tag).getBySel("tags-individual-tag-name").eq(0).click()
    cy.url().should("contain", "/tagquestions/1")

    // test second tag
    cy.wrap(tag).getBySel("tags-individual-tag-name").eq(1).should("contain", "Cypress tagName 2")
    cy.wrap(tag).getBySel("tags-individual-tag-description").eq(1).should("contain", "Cypress description 2")
    cy.wrap(tag).getBySel("tags-individual-tag-name").eq(1).click()
    cy.url().should("contain", "/tagquestions/2")

    // test third tag
    cy.wrap(tag).getBySel("tags-individual-tag-name").eq(2).should("contain", "Cypress tagName 3")
    cy.wrap(tag).getBySel("tags-individual-tag-description").eq(2).should("contain", "Cypress description 3")
    cy.wrap(tag).getBySel("tags-individual-tag-name").eq(2).click()
    cy.url().should("contain", "/tagquestions/3")

    // ensure there are no additional tags
    cy.wrap(tag).getBySel("tags-individual-tag-name").eq(3).should("not.exist")
  })

  })
})


// <StyledHeader data-test="tags-header"> Tags </StyledHeader>
// <BlueButton data-test="tags-addtag-button" onClick={routeChange}>Add&nbsp;Tag</BlueButton>  
// </HeaderRow>
// <div  data-test="tags-header-description" style={{margin: "30px"}}>
// A tag is a keyword or label that groups your question with other related questions. Using appropriate tags helps others find and respond to your question more easily.</div>

//     <DivEle>
    
//     {assignments?.map(ele=>{
//       return(
//       <AssignmentEle data-test="tags-individual-tag" >
//         <LinkTag data-test="tags-individual-tag-name" to={`/tagquestions/${ele.id}`}>
//         <span className="tag">{ele.tagName}</span>
//         </LinkTag>

//         <Description data-test="tags-individual-tag-description">{ele.tagDescription}</Description>
         
    
//       </AssignmentEle>
