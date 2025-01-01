/* eslint-disable no-undef */
import React from 'react'
import RegisterPage from '../RegisterPage'
import { UserProvider } from '../../CurrentUser'
import GlobalStyles from '../../styled-components/GlobalStyles'
import WholePage from '../../styled-components/WholePageDivStyle'
import { BrowserRouter } from 'react-router-dom'

describe('<RegisterPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <BrowserRouter>
      <WholePage>
        <GlobalStyles/>
        <UserProvider>
        <RegisterPage />
       </UserProvider>
       </WholePage>
       </BrowserRouter>
    
  
  )
  })
})