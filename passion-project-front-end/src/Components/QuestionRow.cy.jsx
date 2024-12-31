import React from 'react'
import QuestionRow from './QuestionRow'
import { BrowserRouter } from 'react-router-dom'
import WholePage from '../styled-components/WholePageDivStyle'
import GlobalStyles from '../styled-components/GlobalStyles'
import { UserProvider } from '../CurrentUser'

describe('<QuestionRow />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
      <WholePage>
        <GlobalStyles/>
        <UserProvider>
        <QuestionRow />
       </UserProvider>
       </WholePage>
       </BrowserRouter>
   
  
  
  )
  })
})