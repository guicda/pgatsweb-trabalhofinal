class Cadastro {

    preencherFormularioDeCadastroCompleto(user) {

        cy.get('#id_gender1').check()
        cy.get('input#password').type(user.password, { log: false })
        cy.get('select[data-qa="days"]').select(user.dob.day)
        cy.get('select[data-qa="months"]').select(user.dob.month)
        cy.get('select[data-qa="years"]').select(user.dob.year)
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()
        cy.get('input#first_name').type(user.firstName)
        cy.get('input#last_name').type(user.lastName)
        cy.get('input#company').type(user.company)
        cy.get('input#address1').type(user.address1)
        cy.get('select#country').select(user.country)
        cy.get('input#state').type(user.state)
        cy.get('input#city').type(user.city)
        cy.get('[data-qa="zipcode"]').type(user.zipcode)            
        cy.get('[data-qa="mobile_number"]').type(user.mobile)     
        cy.get('[data-qa="create-account"]').click()
    }

}

export default new Cadastro()