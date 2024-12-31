/* eslint-disable no-undef */
import React from 'react'; // Add this import

import QuestionsPage from "../../src/Components/QuestionsPage";
describe('ParentComponent', () => {
  beforeEach(() => {
    // Mount the component using Cypress
    cy.mount(<QuestionsPage />);
  });

//   it('should render ChildComponent1', () => {
//     // Check that ChildComponent1 is rendered
//     cy.get('[data-testid="child-component"]').should('exist'); // Using a data-testid or class
//   });

});