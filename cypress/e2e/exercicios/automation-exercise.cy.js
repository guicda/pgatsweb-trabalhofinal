//<reference types="cypress" />

//
// describe / context - suíte ou conjunto de testes em um mesmo arquivo
// it - um teste dentreo de um bloco ou conjunto de testes

// describe -> Automation Exercise
// it -> Cadastrar um usuário
// it -> Teste abcde

//extensao ES6 a gente começa escrever e autocompleta com o tab
//facilita escrever o describe e it com o describeAndIt

import {
    getRandomNumber,
    getRandomEmail
} from '../../support/helpers.js'

describe('Automation Exercise', () => {

    beforeEach(() => {
        
        // Navega para a página inicial antes de cada teste
        cy.visit('https://automationexercise.com/');
    });

    it('Exemplos de Logs', () => {
        cy.log('PGATS AUTOMAÇÃO WEB CY LOG')
        console.log('PGATS AUTOMAÇÃO WEB CONSOLE LOG')

        cy.log(`getRandomNumber: ${getRandomNumber()}`)
        cy.log(`getRandomEmail: ${getRandomEmail()}`)
    })

    it('Cadastrar um usuário', () => {
        //cy.viewport() para alterar layout da página (se for responsivo)

        // Triplo A - Arranje
        cy.get('a[href="/login"]').click()
        cy.get('[data-qa="signup-name"]').type('Joaquina')
        cy.get('[data-qa="signup-email"]').type(getRandomEmail())
        cy.contains('button','Signup').click()    //cy.get('[data-qa="signup-button"]').click()
        //radio ou checkboxes -> check
        cy.get('#id_gender1').check()   //cy.get('input[type=radio]').check('Mrs')
        cy.get('input#password').type('123456'), {log:false}  //cy.get('[data-qa="password"]').type('123456')
        //para comboboxes ou selects -> select
        cy.get('select[data-qa="days"]').select('10')
        cy.get('select[data-qa="months"]').select('September')
        cy.get('select[data-qa="years"]').select('1995')
        //radio ou checkboxes -> check
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()
        cy.get('input#first_name').type('Joaquina')
        cy.get('input#last_name').type('Herreira')
        cy.get('input#company').type('QA FreeLancer')
        cy.get('input#address1').type('Rua Rue Irène-Sénécal, n 2004')
        //cy.get('input#address2')
        cy.get('select#country').select('Canada')
        cy.get('input#state').type('Quebec')
        cy.get('input#city').type('Montreal')
        //copiando do "inspector" da aplicação cypress 
        cy.get('[data-qa="zipcode"]').type('H1A 0A5')            //cy.get('input#zipcode')
        cy.get('[data-qa="mobile_number"]').type('+1 438 555-5555')      //cy.get('input#mobile_number')
        
        // Triplo A - Act
        cy.get('[data-qa="create-account"]').click()

        // Triplo A - Assert
        cy.url().should('includes', 'account_created')

        cy.contains('b', 'Account Created')
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')

    });
    it('Enviar um formulário Contact Us com arquivo anexo', () => {
        //cy.viewport() para alterar layout da página (se for responsivo)

        // Triplo A - Arranje
        cy.get('a[href="/contact_us"]').click()
        cy.get('[data-qa="name"]').type('Joaquina')
        cy.get('[data-qa="email"]').type(getRandomEmail())
        cy.get('[data-qa="subject"]').type('Exercício Extra Aula 05')
        cy.get('[data-qa="message"]').type('Estou fazendo o trabalho do envio deste formulário com um arquivo em anexo. Desde já agradeço! Atenciosamente Amanda.')
        
        cy.fixture('asc.jpg').as('arquivo')
        cy.get('input[type=file]').selectFile('@arquivo')
        
        
        // // Triplo A - Act
        cy.get('[data-qa="submit-button"]').click()
        
        // // Triplo A - Assert
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text','Success! Your details have been submitted successfully.')

    });
});

