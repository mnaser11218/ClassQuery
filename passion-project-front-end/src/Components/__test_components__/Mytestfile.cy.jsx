import React from 'react'
import Mytestfile from '../Mytestfile'
import { mount } from 'cypress/react18'
import { UserProvider } from '../../CurrentUser'

describe('<Mytestfile />', () => {
  it('renders', () => {
    // Cypress.on('uncaught:exception', (err, runnable) => {
    //   // Prevent Cypress from failing the test due to this specific error
    //   if (err.message.includes('Cannot destructure property')) {
    //     return false; // Returning false prevents the test from failing
    //   }
    // });
    // see: https://on.cypress.io/mounting-react
    mount(
    <UserProvider>
    <Mytestfile />
    </UserProvider>
    )
  })
})