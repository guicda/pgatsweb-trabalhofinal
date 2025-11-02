/// <reference types="cypress" />

import { gerarNomeAleatorio, gerarEmailAleatorio, gerarDadosUsuario } from '../../support/utils.js';

describe('Automation Exercise - Test Cases', () => {
    // Dados do usuário compartilhados entre os testes
    let dadosUsuario;
    let nomeUsuario;
    let emailUsuario;
    const senhaUsuario = '123456'; // Senha padrão para os testes

    before(() => {
        // Gera dados aleatórios do usuário uma única vez para todos os testes
        dadosUsuario = gerarDadosUsuario();
        nomeUsuario = dadosUsuario.nome;
        emailUsuario = dadosUsuario.email;
        
        // Log para debug
        cy.log(`Dados gerados para os testes:`);
        cy.log(`Nome: ${nomeUsuario}`);
        cy.log(`Email: ${emailUsuario}`);
    });

    beforeEach(() => {
        // Navega para a página inicial antes de cada teste
        cy.visit('https://automationexercise.com/');
        
        // Verifica se a home page está visível
        cy.url().should('include', 'automationexercise.com');
    });

    afterEach(() => {
        // Garante que o usuário seja deslogado após cada teste
        cy.get('body').then(($body) => {
            // Verifica se existe botão de logout (usuário logado)
            if ($body.find('a[href="/logout"]').length > 0) {
                cy.get('a[href="/logout"]').click();
            }
        });
    });

    // Função auxiliar para fazer login
    const fazerLogin = (email, senha) => {
        cy.get('a[href="/login"]').click();
        cy.get('[data-qa="login-email"]').type(email);
        cy.get('[data-qa="login-password"]').type(senha);
        cy.get('[data-qa="login-button"]').click();
    };

    // Função auxiliar para ir para página de signup
    const irParaSignup = () => {
        cy.get('a[href="/login"]').click();
        cy.contains('New User Signup!').should('be.visible');
    };
    
    it('Test Case 1: Register User', () => {

        // 1. Launch browser (já é feito automaticamente pelo Cypress)
        
        // 2. Navigate to url 'http://automationexercise.com'
        cy.visit('https://automationexercise.com/')
        
        // 3. Verify that home page is visible successfully
        cy.url().should('include', 'automationexercise.com')
        
        // 4. Click on 'Signup / Login' button
        cy.get('a[href="/login"]').click()
        
        // 5. Verify 'New User Signup!' is visible
        cy.contains('New User Signup!').should('be.visible')
        
        // 6. Enter name and email address
        cy.get('[data-qa="signup-name"]').type(nomeUsuario)
        cy.get('[data-qa="signup-email"]').type(emailUsuario)
        
        // 7. Click 'Signup' button
        cy.contains('button', 'Signup').click()
        
        // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        cy.contains('Enter Account Information').should('be.visible')
        
        // 9. Fill details: Title, Name, Email, Password, Date of birth
        // Title (Mr./Mrs.)
        cy.get('#id_gender1').check()      
        
        // Password
        cy.get('input#password').type(senhaUsuario)
        
        // Date of birth
        cy.get('select[data-qa="days"]').select('10')
        cy.get('select[data-qa="months"]').select('September')
        cy.get('select[data-qa="years"]').select('1995')
        
        // 10. Select checkbox 'Sign up for our newsletter!'
        cy.get('input[type=checkbox]#newsletter').check()
        
        // 11. Select checkbox 'Receive special offers from our partners!'
        cy.get('input[type=checkbox]#optin').check()
        
        // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        // First name
        cy.get('input#first_name').type(nomeUsuario.split(' ')[0])
        
        // Last name
        cy.get('input#last_name').type(nomeUsuario.split(' ')[1] || 'Sobrenome')
        
        // Company
        cy.get('input#company').type('QA FreeLancer')
        
        // Address
        cy.get('input#address1').type('Rua Teste, n 123')
        
        // Address2 (opcional)
        cy.get('input#address2').type('Apartamento 45')
        
        // Country
        cy.get('select#country').select('Canada')
        
        // State
        cy.get('input#state').type('Quebec')
        
        // City
        cy.get('input#city').type('Montreal')
        
        // Zipcode
        cy.get('[data-qa="zipcode"]').type('H1A 0A5')
        
        // Mobile Number
        cy.get('[data-qa="mobile_number"]').type('+1 438 555-5555')
        
        // 13. Click 'Create Account' button
        cy.get('[data-qa="create-account"]').click()
        
        // 14. Verify that 'ACCOUNT CREATED!' is visible
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
        
        // 15. Click 'Continue' button
        cy.get('a[data-qa="continue-button"]').click()
        
        // 16. Verify that 'Logged in as username' is visible
        cy.contains(`Logged in as ${nomeUsuario}`).should('be.visible')
        
        // 17. Click 'Delete Account' button - REMOVIDO para permitir login no Test Case 2
        // TODO: Descomentar se quiser deletar a conta ao final do Test Case 1
        // cy.contains('Delete Account').click()
        
        // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button - REMOVIDO
        // TODO: Descomentar se quiser deletar a conta ao final do Test Case 1
        // cy.contains('Account Deleted!').should('be.visible')
        // cy.contains('Continue').click()
        
        // Fazer logout para permitir login no próximo teste
        cy.get('a[href="/logout"]').click()
    });

    it('Test Case 2: Login User with correct email and password', () => {
        // Usa o usuário criado no Test Case 1

        // 1. Launch browser (já é feito automaticamente pelo Cypress)
        
        // 2. Navigate to url 'http://automationexercise.com'
        cy.visit('https://automationexercise.com/')
        
        // 3. Verify that home page is visible successfully
        cy.url().should('include', 'automationexercise.com')
        
        // 4. Click on 'Signup / Login' button
        cy.get('a[href="/login"]').click()
        
        // 5. Verify 'Login to your account' is visible
        cy.contains('Login to your account').should('be.visible')
        
        // 6. Enter correct email address and password
        cy.get('[data-qa="login-email"]').type(emailUsuario)
        cy.get('[data-qa="login-password"]').type(senhaUsuario)
        
        // 7. Click 'login' button
        cy.get('[data-qa="login-button"]').click() // TODO: Verificar locator correto
        
        // 8. Verify that 'Logged in as username' is visible
        cy.contains(`Logged in as ${nomeUsuario}`).should('be.visible')
        
        //REMOVIDO PARA USAR MESMA CONTA NO TESTE 4
        // 9. Click 'Delete Account' button
        //cy.contains('Delete Account').click()
        
        //REMOVIDO PARA USAR MESMA CONTA NO TESTE 4
        // 10. Verify that 'ACCOUNT DELETED!' is visible
        //cy.contains('Account Deleted!').should('be.visible')
    });

    it('Test Case 3: Login User with incorrect email and password', () => {
        // Usa credenciais incorretas para testar erro de login

        // 1. Launch browser (já é feito automaticamente pelo Cypress)
        
        // 2. Navigate to url 'http://automationexercise.com'
        cy.visit('https://automationexercise.com/')
        
        // 3. Verify that home page is visible successfully
        cy.url().should('include', 'automationexercise.com')
        
        // 4. Click on 'Signup / Login' button
        cy.get('a[href="/login"]').click()
        
        // 5. Verify 'Login to your account' is visible
        cy.contains('Login to your account').should('be.visible')
        
        // 6. Enter incorrect email address and password
        cy.get('[data-qa="login-email"]').type('email.incorreto@teste.com')
        cy.get('[data-qa="login-password"]').type('senhaIncorreta123')
        
        // 7. Click 'login' button
        cy.get('[data-qa="login-button"]').click()
        
        // 8. Verify error 'Your email or password is incorrect!' is visible
        cy.contains('Your email or password is incorrect!').should('be.visible')
    });

    it('Test Case 4: Logout User', () => {
        // Usa o usuário criado no Test Case 1 para fazer login e depois logout

        // 1. Launch browser (já é feito automaticamente pelo Cypress)
        
        // 2. Navigate to url 'http://automationexercise.com'
        cy.visit('https://automationexercise.com/')
        
        // 3. Verify that home page is visible successfully
        cy.url().should('include', 'automationexercise.com')
        
        // 4. Click on 'Signup / Login' button
        cy.get('a[href="/login"]').click()
        
        // 5. Verify 'Login to your account' is visible
        cy.contains('Login to your account').should('be.visible')
        
        // 6. Enter correct email address and password
        cy.get('[data-qa="login-email"]').type(emailUsuario)
        cy.get('[data-qa="login-password"]').type(senhaUsuario)
        
        // 7. Click 'login' button
        cy.get('[data-qa="login-button"]').click()
        
        // 8. Verify that 'Logged in as username' is visible
        cy.contains(`Logged in as ${nomeUsuario}`).should('be.visible')
        
        // 9. Click 'Logout' button
        cy.get('a[href="/logout"]').click()
        
        // 10. Verify that user is navigated to login page
        cy.url().should('include', '/login')
        cy.contains('Login to your account').should('be.visible')
    });

    it('Test Case 5: Register User with existing email', () => {
        // Tenta registrar com o email já usado no Test Case 1

        // 1. Launch browser (já é feito automaticamente pelo Cypress)
        
        // 2. Navigate to url 'http://automationexercise.com'
        cy.visit('https://automationexercise.com/')
        
        // 3. Verify that home page is visible successfully
        cy.url().should('include', 'automationexercise.com')
        
        // 4. Click on 'Signup / Login' button
        cy.get('a[href="/login"]').click()
        
        // 5. Verify 'New User Signup!' is visible
        cy.contains('New User Signup!').should('be.visible')
        
        // 6. Enter name and already registered email address
        cy.get('[data-qa="signup-name"]').type('Novo Usuario Teste')
        cy.get('[data-qa="signup-email"]').type(emailUsuario) // Usa o mesmo email do Test Case 1
        
        // 7. Click 'Signup' button
        cy.contains('button', 'Signup').click()
        
        // 8. Verify error 'Email Address already exist!' is visible
        cy.contains('Email Address already exist!').should('be.visible')
    });
});
