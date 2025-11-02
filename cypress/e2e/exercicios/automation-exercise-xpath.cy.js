require('cypress-xpath')

describe('Automation Exercise - XPath Version', () => {
    let timestamp;

    beforeEach(() => {
        // Gera timestamp único para cada teste
        timestamp = new Date().getTime();
        
        // Navega para a página inicial antes de cada teste
        cy.visit('https://automationexercise.com/');
    });

    it('Cadastrar um usuário usando XPath', () => {
        //cy.viewport() para alterar layout da página (se for responsivo)

        // Triplo A - Arranje
        cy.xpath('//a[@href="/login"]').click()
        cy.xpath('//input[@data-qa="signup-name"]').type('Joaquina')
        cy.xpath('//input[@data-qa="signup-email"]').type(`joaquina-${timestamp}@uorak.com`)
        cy.xpath('//button[text()="Signup"]').click()    //cy.xpath('//button[@data-qa="signup-button"]').click()
        //radio ou checkboxes -> check
        cy.xpath('//input[@id="id_gender1"]').check()   //cy.xpath('//input[@type="radio"]').check('Mrs')
        cy.xpath('//input[@id="password"]').type('123456', {log:false})  //cy.xpath('//input[@data-qa="password"]').type('123456')
        //para comboboxes ou selects -> select
        cy.xpath('//select[@data-qa="days"]').select('10')
        cy.xpath('//select[@data-qa="months"]').select('September')
        cy.xpath('//select[@data-qa="years"]').select('1995')
        //radio ou checkboxes -> check
        cy.xpath('//input[@type="checkbox" and @id="newsletter"]').check()
        cy.xpath('//input[@type="checkbox" and @id="optin"]').check()
        cy.xpath('//input[@id="first_name"]').type('Joaquina')
        cy.xpath('//input[@id="last_name"]').type('Herreira')
        cy.xpath('//input[@id="company"]').type('QA FreeLancer')
        cy.xpath('//input[@id="address1"]').type('Rua Rue Irène-Sénécal, n 2004')
        //cy.xpath('//input[@id="address2"]')
        cy.xpath('//select[@id="country"]').select('Canada')
        cy.xpath('//input[@id="state"]').type('Quebec')
        cy.xpath('//input[@id="city"]').type('Montreal')
        //copiando do "inspector" da aplicação cypress 
        cy.xpath('//input[@data-qa="zipcode"]').type('H1A 0A5')            //cy.xpath('//input[@id="zipcode"]')
        cy.xpath('//input[@data-qa="mobile_number"]').type('+1 438 555-5555')      //cy.xpath('//input[@id="mobile_number"]')
        
        // Triplo A - Act
        cy.xpath('//button[@data-qa="create-account"]').click()

        // Triplo A - Assert
        cy.url().should('includes', 'account_created')

        //cy.xpath('//b[text()="Account Created"]').should('be.visible') REMOVIDO
        cy.xpath('//h2[@data-qa="account-created"]').should('have.text', 'Account Created!')

    });
});

