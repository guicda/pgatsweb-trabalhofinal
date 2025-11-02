/// <reference types="cypress" />

require('cypress-xpath')
import { gerarNomeAleatorio, gerarEmailAleatorio, gerarDadosUsuario } from '../../support/utils.js';

describe('Automation Exercise - Test Cases XPath Version', () => {
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
                cy.xpath('//a[@href="/logout"]').click();
            }
        });
    });

    // Função auxiliar para fazer login
    const fazerLogin = (email, senha) => {
        cy.xpath('//a[@href="/login"]').click();
        cy.xpath('//input[@data-qa="login-email"]').type(email);
        cy.xpath('//input[@data-qa="login-password"]').type(senha);
        cy.xpath('//button[@data-qa="login-button"]').click();
    };

    // Função auxiliar para ir para página de signup
    const irParaSignup = () => {
        cy.xpath('//a[@href="/login"]').click();
        cy.xpath('//h2[text()="New User Signup!"]').should('be.visible');
    };
    
    it('Test Case 1: Register User', () => {
        // 4. Click on 'Signup / Login' button
        irParaSignup();
        
        // 6. Enter name and email address
        cy.xpath('//input[@data-qa="signup-name"]').type(nomeUsuario)
        cy.xpath('//input[@data-qa="signup-email"]').type(emailUsuario)
        
        // 7. Click 'Signup' button
        cy.xpath('//button[text()="Signup"]').click()
        
        // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
        cy.xpath('//b[text()="Enter Account Information"]').should('be.visible')
        
        // 9-12. Fill account details
        cy.xpath('//input[@id="id_gender1"]').check()      
        cy.xpath('//input[@id="password"]').type(senhaUsuario)
        cy.xpath('//select[@data-qa="days"]').select('10')
        cy.xpath('//select[@data-qa="months"]').select('September')
        cy.xpath('//select[@data-qa="years"]').select('1995')
        cy.xpath('//input[@type="checkbox" and @id="newsletter"]').check()
        cy.xpath('//input[@type="checkbox" and @id="optin"]').check()
        cy.xpath('//input[@id="first_name"]').type(nomeUsuario.split(' ')[0])
        cy.xpath('//input[@id="last_name"]').type(nomeUsuario.split(' ')[1] || 'Sobrenome')
        cy.xpath('//input[@id="company"]').type('QA FreeLancer')
        cy.xpath('//input[@id="address1"]').type('Rua Teste, n 123')
        cy.xpath('//input[@id="address2"]').type('Apartamento 45')
        cy.xpath('//select[@id="country"]').select('Canada')
        cy.xpath('//input[@id="state"]').type('Quebec')
        cy.xpath('//input[@id="city"]').type('Montreal')
        cy.xpath('//input[@data-qa="zipcode"]').type('H1A 0A5')
        cy.xpath('//input[@data-qa="mobile_number"]').type('+1 438 555-5555')
        
        // 13. Click 'Create Account' button
        cy.xpath('//button[@data-qa="create-account"]').click()
        
        // 14. Verify that 'ACCOUNT CREATED!' is visible
        cy.xpath('//h2[@data-qa="account-created"]').should('be.visible')
        
        // 15. Click 'Continue' button
        cy.xpath('//a[@data-qa="continue-button"]').click()
        
        // 16. Verify that 'Logged in as username' is visible
        cy.xpath(`//b[text()="${nomeUsuario}"]`).should('be.visible')
    });

    it('Test Case 2: Login User with correct email and password', () => {
        // Usa função auxiliar para fazer login
        fazerLogin(emailUsuario, senhaUsuario);
        
        // 8. Verify that 'Logged in as username' is visible
        cy.xpath(`//b[text()="${nomeUsuario}"]`).should('be.visible')
    });

    it('Test Case 3: Login User with incorrect email and password', () => {
        // Usa função auxiliar para fazer login com credenciais incorretas
        fazerLogin('email.incorreto@teste.com', 'senhaIncorreta123');
        
        // 8. Verify error 'Your email or password is incorrect!' is visible
        cy.xpath('//p[text()="Your email or password is incorrect!"]').should('be.visible')
    });

    it('Test Case 4: Logout User', () => {
        // Faz login primeiro
        fazerLogin(emailUsuario, senhaUsuario);
        
        // 8. Verify that 'Logged in as username' is visible
        cy.xpath(`//b[text()="${nomeUsuario}"]`).should('be.visible')
        
        // 9. Click 'Logout' button
        cy.xpath('//a[@href="/logout"]').click()
        
        // 10. Verify that user is navigated to login page
        cy.url().should('include', '/login')
        cy.xpath('//h2[text()="Login to your account"]').should('be.visible')
    });

    it('Test Case 5: Register User with existing email', () => {
        // Vai para página de signup
        irParaSignup();
        
        // 6. Enter name and already registered email address
        cy.xpath('//input[@data-qa="signup-name"]').type('Novo Usuario Teste')
        cy.xpath('//input[@data-qa="signup-email"]').type(emailUsuario) // Usa o mesmo email do Test Case 1
        
        // 7. Click 'Signup' button
        cy.xpath('//button[text()="Signup"]').click()
        
        // 8. Verify error 'Email Address already exist!' is visible
        cy.xpath('//p[text()="Email Address already exist!"]').should('be.visible')
    });
});
