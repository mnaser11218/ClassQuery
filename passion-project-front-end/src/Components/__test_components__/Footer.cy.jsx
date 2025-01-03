/* eslint-disable no-undef */
import React from 'react'
import { Footer } from '../Footer'
import { UserProvider } from '../../CurrentUser'
import GlobalStyles from '../../styled-components/GlobalStyles'
import WholePage from '../../styled-components/WholePageDivStyle'
import { BrowserRouter } from 'react-router-dom'

describe('<Footer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
    
      <BrowserRouter>
      <WholePage>
        <GlobalStyles/>
        <UserProvider>
        <Footer />
       </UserProvider>
       </WholePage>
       </BrowserRouter>
    
    )

    cy.getBySel("footer").contains("Copyright 2022. All Rights Reserved")
  })
})