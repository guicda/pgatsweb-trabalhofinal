import { createRandomUser } from '../../support/data.js'

describe('Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/');
    });

    it('Exemplos de Logs', () => {
        cy.log('Cadastrando usuário gerado a partir da bibioteca faker.js')
    })

    it('Cadastrar um usuário', () => {
        //cy.viewport() para alterar layout da página (se for responsivo)
        const user = createRandomUser()

        // Triplo A - Arranje
        cy.get('a[href="/login"]').click()
        cy.get('[data-qa="signup-name"]').type(user.fullName)
        cy.get('[data-qa="signup-email"]').type(user.email)
        cy.contains('button', 'Signup').click()    //cy.get('[data-qa="signup-button"]').click()
        //radio ou checkboxes -> check
        cy.get('#id_gender1').check()   //cy.get('input[type=radio]').check('Mrs')
        cy.get('input#password').type(user.password, { log: false })  //cy.get('[data-qa="password"]').type('123456')
        //para comboboxes ou selects -> select
        cy.get('select[data-qa="days"]').select(user.dob.day)
        cy.get('select[data-qa="months"]').select(user.dob.month)
        cy.get('select[data-qa="years"]').select(user.dob.year)
        //radio ou checkboxes -> check
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()
        cy.get('input#first_name').type(user.firstName)
        cy.get('input#last_name').type(user.lastName)
        cy.get('input#company').type(user.company)
        cy.get('input#address1').type(user.address1)
        //cy.get('input#address2')
        cy.get('select#country').select(user.country)
        cy.get('input#state').type(user.state)
        cy.get('input#city').type(user.city)
        //copiando do "inspector" da aplicação cypress 
        cy.get('[data-qa="zipcode"]').type(user.zipcode)            //cy.get('input#zipcode')
        cy.get('[data-qa="mobile_number"]').type(user.mobile)      //cy.get('input#mobile_number')

        // Triplo A - Act
        cy.get('[data-qa="create-account"]').click()

        // Triplo A - Assert
        cy.url().should('includes', 'account_created')

        cy.contains('b', 'Account Created')
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')

    });
    it('Enviar um formulário Contact Us com arquivo anexo', () => {
        const contact = createRandomUser()
        //cy.viewport() para alterar layout da página (se for responsivo)

        // Triplo A - Arranje
        cy.get('a[href="/contact_us"]').click()
        cy.get('[data-qa="name"]').type(contact.fullName)
        cy.get('[data-qa="email"]').type(contact.email)
        cy.get('[data-qa="subject"]').type('Exercício Extra Aula 05')
        cy.get('[data-qa="message"]').type('Estou fazendo o trabalho do envio deste formulário com um arquivo em anexo. Desde já agradeço! Atenciosamente Amanda.')

        cy.fixture('asc.jpg').as('arquivo')
        cy.get('input[type=file]').selectFile('@arquivo')


        // // Triplo A - Act
        cy.get('[data-qa="submit-button"]').click()

        // // Triplo A - Assert
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

    });
});

