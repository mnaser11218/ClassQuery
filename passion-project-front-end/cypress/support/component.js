/* eslint-disable no-undef */
// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

import { mount } from 'cypress/react18'
import styled from 'styled-components'
import 'styled-components'
Cypress.Commands.add('mount', mount)
Cypress.Commands.add("getBySel", (selector, ...args)=> {
    return cy.get(`[data-test=${selector}]`, ...args)
})

// cy.mount(<MyComponent />)