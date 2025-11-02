import { createRandomUser } from '../../support/data.js'
//import menu from '../modules/menu'             //import { navegarParaLogin } from '../modules/menu' (primeira alternativa feita em aula)
import login from '../../modules/login/index.js'        // import { preencherFormularioDePreCadastro } from '../modules/login/index.js' (primeira alternativa feita em aula)
import cadastro from '../../modules/cadastro/index.js'
import contato from '../../modules/contato/index.js'

describe('Automation Exercise', () => {

    before(() => {
        cy.log('Cadastrando usuário gerado a partir da bibioteca faker e teste organizado em módulos.js')
    })
    
    beforeEach(() => {
        //cy.viewport() para alterar layout da página (se for responsivo)
        cy.visit('https://automationexercise.com/');
    });

    it('Cadastrar um usuário', () => {
        const user = createRandomUser()
        // Triplo A - Arranje
        //menu.navegarParaLogin()                                   // navegarParaLogin()    (primeira alternativa feita em aula)
        cy.navegarParaLogin()    //navegarParaLogin definido no commands usa assim (não prencisa do import la em cima, por isso ficou comentado)
        login.preencherFormularioDePreCadastro(user)              // preencherFormularioDePreCadastro(user)   (primeira alternativa feita em aula)
        cadastro.preencherFormularioDeCadastroCompleto(user)
        // Triplo A - Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created')
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
    });

    it('Enviar um formulário Contact Us com arquivo anexo', () => {
        const contact = createRandomUser()
        contato.preencherFormularioDeContato(contact)
        // // Triplo A - Assert
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

    });
});

