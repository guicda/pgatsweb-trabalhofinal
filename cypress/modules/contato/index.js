class Contato {

    navegarParaContato() {
        cy.get('a[href="/contact_us"]').click()
    }

    enviarFormularioDeContato(contact) {
        cy.get('[data-qa="name"]').type(contact.fullName)
        cy.get('[data-qa="email"]').type(contact.email)
        cy.get('[data-qa="subject"]').type('Exercício Extra Aula 05')
        cy.get('[data-qa="message"]').type('Estou fazendo o trabalho do envio deste formulário com um arquivo em anexo. Desde já agradeço! Atenciosamente Amanda.')
        cy.fixture('asc.jpg').as('arquivo')
        cy.get('input[type=file]').selectFile('@arquivo')
        cy.get('[data-qa="submit-button"]').click()
    }

    preencherFormularioDeContato(contact) {
        this.navegarParaContato()
        this.enviarFormularioDeContato(contact)
    }

    clicarHome() {
        cy.contains('a', 'Home').click()
    }

}

export default new Contato()