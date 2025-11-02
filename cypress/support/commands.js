// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cy.

// uma vez que tenho navegarParaLogin aqui definido como commands, eu não preciso mais dos imports no arquivo de teste,
// diferente do navegarParaLogin presente no menu/index.js

Cypress.Commands.add('navegarParaLogin', () => {
    cy.get('a[href="/login"]').click()
})

// comando para fazer logout (clique no link de logout)
Cypress.Commands.add('logout', () => {
    cy.get('a[href="/logout"]').click()
})

// navega para a página 'Test Cases'
Cypress.Commands.add('navegarParaTestCases', () => {
    cy.get('a[href="/test_cases"]').click()
})