class Login {
    
    preencherFormularioDePreCadastro (user) {
        // validação de parâmetros essenciais
        if (!user || !user.fullName || !user.email) {
        	throw new Error('preencherFormularioDePreCadastro: parâmetro "user" inválido. Esperado objeto com { fullName, email }')
        }
        cy.url().should('include', '/login')
        cy.get('.signup-form', { timeout: 10000 }).scrollIntoView().should('be.visible')
        cy.contains('.signup-form h2', 'New User Signup!', { timeout: 10000 }).should('be.visible')
        cy.get('[data-qa="signup-name"]').scrollIntoView().should('be.visible').and('not.be.disabled').clear().type(user.fullName, { delay: 0 })
        cy.get('[data-qa="signup-email"]').should('be.visible').and('not.be.disabled').clear().type(user.email, { delay: 0 })
        cy.contains('button', 'Signup').should('be.enabled').click()
    }

    preencherFormularioDeLogin (email, password) {
        cy.contains('Login to your account').should('be.visible')
        cy.get('[data-qa="login-email"]').should('be.visible').and('not.be.disabled').clear().type(email)
        cy.get('[data-qa="login-password"]').should('be.visible').and('not.be.disabled').type(password, { log: false })
        cy.get('[data-qa="login-button"]').should('be.enabled').click()
    }
}

export default new Login()


// export function preencherFormularioDePreCadastro (user) {
//     // recebe o objeto user (gerado no spec) e preenche o formulário de pré-cadastro
//     cy.get('[data-qa="signup-name"]').type(user.fullName)
//     cy.get('[data-qa="signup-email"]').type(user.email)
//     cy.contains('button', 'Signup').click()    //cy.get('[data-qa="signup-button"]').click()
// }

