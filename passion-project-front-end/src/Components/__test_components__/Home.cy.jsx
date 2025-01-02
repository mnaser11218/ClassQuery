/* eslint-disable no-undef */
import React from 'react'
import Home from '../Home'
import GlobalStyles from '../../styled-components/GlobalStyles';
import { UserProvider } from '../../CurrentUser';
import WholePage from '../../styled-components/WholePageDivStyle';
import { BrowserRouter } from 'react-router-dom';

describe('<Home />', () => {
  it('renders', () => {
  
    cy.intercept("GET", "/api/assignments", {
      body:[{
          "id": 1,
          "name": "although",
          "topic": "indeed",
          "courseName": "um",
          "description": "in commercial",
          "created": "2024-08-23",
          "questions": null
      }, 
    {
      
        "id": 2,
        "name": "for",
        "topic": "that daily gah",
        "courseName": "breakable hierarchy",
        "description": "step-mother bog likewise",
        "created": "2024-08-23",
        "questions": null
    }]
    }).as("getAssignments")

    cy.mount(
      <>
        <BrowserRouter>
      <WholePage>
        <GlobalStyles/>
        <UserProvider>
        <Home />
       </UserProvider>
       </WholePage>
       </BrowserRouter>
   
    </>
    )
    cy.getBySel("assignment-header").should("contain", "Course Assignments")
    cy.wait("@getAssignments").getBySel("assignment").then(assignments=>{
      // testing first assignment in home page: 
      cy.wrap(assignments).getBySel("assignment-name").eq(0).should("have.text", "although")
      cy.wrap(assignments).getBySel("assignment-description").eq(0).should("have.text", "um")
       // test clicking on title should route to correct assignment endpoint: 
      cy.wrap(assignments).getBySel("assignment-name").eq(0).click()
      cy.url().should("contain", "/assignmentquestion/1")
     
     




      // testing second assignment in home page
      cy.wrap(assignments).getBySel("assignment-name").eq(1).should("have.text", "for")
      cy.wrap(assignments).getBySel("assignment-name").eq(1).click()
      cy.url().should("contain", "/assignmentquestion/2")



    })
  })
})


{/* <AssignmentEle data-test="assignment"  >
     
<LinkTag   data-test="assignment-id" to={`/assignmentquestion/${ele.id}`}>
<span  data-test="assignment-name"  className="tag">{ele.name}</span> 
 </LinkTag>
<Description  data-test="assignment-description" >{ele.courseName}</Description>

</AssignmentEle> */}