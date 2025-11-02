import { createRandomUser } from '../support/data.js'
import login from '../modules/login/index.js'
import cadastro from '../modules/cadastro/index.js'
import account from '../modules/account/index.js'
import contato from '../modules/contato/index.js'
import carrinho from '../modules/carrinho/index.js'

describe('Trabalho Final PGATS - Automação Web', () => {
    let user

    before(() => {
        user = createRandomUser()
        cy.log(`Usuário gerado: ${user.fullName} - ${user.email}`)
    })

    beforeEach(() => {
        cy.visit('/')
        cy.url().should('include', 'automationexercise.com')
    })

    it('Test Case 1: Register User', () => {
        cy.navegarParaLogin()
        login.preencherFormularioDePreCadastro(user)
        cadastro.preencherFormularioDeCadastroCompleto(user)
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
        cy.get('a[data-qa="continue-button"]').click()
        account.assertLoggedInAs(user.fullName)
        cy.logout()
    })

    it('Test Case 2: Login User with correct email and password', () => {
        cy.navegarParaLogin()
        cy.contains('Login to your account').should('be.visible')
        login.preencherFormularioDeLogin(user.email, user.password)
        account.assertLoggedInAs(user.fullName)
        cy.logout()
    })

    it('Test Case 3: Login User with incorrect email and password', () => {
        cy.navegarParaLogin()
        cy.contains('Login to your account').should('be.visible')
        login.preencherFormularioDeLogin('email.incorreto@teste.com', 'senhaIncorreta123')
        cy.contains('Your email or password is incorrect!').should('be.visible')
    })

    it('Test Case 4: Logout User', () => {
        cy.navegarParaLogin()
        cy.contains('Login to your account').should('be.visible')
        login.preencherFormularioDeLogin(user.email, user.password)
        account.assertLoggedInAs(user.fullName)
        cy.logout()
        cy.url().should('include', '/login')
        cy.contains('Login to your account').should('be.visible')
    })

    it('Test Case 5: Register User with existing email', () => {
        cy.navegarParaLogin()
        cy.contains('New User Signup!').should('be.visible')
        login.preencherFormularioDePreCadastro({ fullName: 'Novo Usuario Teste', email: user.email })
        cy.contains('Email Address already exist!').should('be.visible')
    })

    it('Test Case 6: Contact Us Form', () => {
        const contact = createRandomUser()
        contato.navegarParaContato()
        cy.get('h2.title.text-center').should('be.visible').and('contain.text', 'Get In Touch')
        contato.enviarFormularioDeContato(contact)
        cy.get('.status').should('be.visible')
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
        contato.clicarHome()
        cy.url().should('include', '/')
        cy.contains('Home').should('be.visible')

    })

    it('Test Case 8: Verify All Products and product detail page', () => {
        carrinho.navegarParaProdutos()
        cy.url().should('include', '/products')
        cy.get('h2.title.text-center').should('be.visible').and('contain.text', 'All Products')
        carrinho.abrirPrimeiroProduto()
        cy.get('button.btn.btn-default.cart').should('be.visible').and('contain.text', 'Add to cart')
        // optei por validar de forma genérica para o caso de o primeiro produto ser alterado
        cy.get('.product-information h2').should('exist').and('be.visible')
        cy.contains('.product-information p', /^\s*Category\s*:/).should('be.visible')
        cy.contains('.product-information span', /^\s*Rs\./).should('be.visible')
        cy.contains('.product-information b', 'Availability:').should('be.visible')
        cy.contains('.product-information b', 'Condition:').should('be.visible')
        cy.contains('.product-information b', 'Brand:').should('be.visible')
    })

    it('Test Case 9: Search Product', () => {

        carrinho.navegarParaProdutos()
        cy.url().should('include', '/products')
        cy.get('h2.title.text-center').should('be.visible').and('contain.text', 'All Products')
        carrinho.pesquisarProduto('frozen')
        cy.get('h2.title.text-center').should('be.visible').and('contain.text', 'Searched Products')
        cy.get('.features_items .product-image-wrapper').should('have.length', 1)
        cy.get('img[alt="ecommerce website products"][src="/get_product_picture/13"]').should('be.visible')
        cy.contains('.features_items .product-image-wrapper .productinfo p', 'Frozen Tops For Kids').should('be.visible')
    })

    it('Test Case 10: Verify Subscription in home page', () => {
        cy.scrollTo('bottom')
        cy.contains('h2', 'Subscription').should('be.visible')
        const email = createRandomUser().email
        cy.get('#susbscribe_email').should('be.visible').clear().type(email)
        cy.get('#subscribe').should('be.visible').click()
        cy.contains('You have been successfully subscribed!').should('be.visible')
    })

    it('Test Case 15: Place Order: Register before Checkout', () => {
        const tempUser = createRandomUser()
        cy.navegarParaLogin()
        login.preencherFormularioDePreCadastro(tempUser)
        cadastro.preencherFormularioDeCadastroCompleto(tempUser)
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
        cy.get('a[data-qa="continue-button"]').click()
        account.assertLoggedInAs(tempUser.fullName)

        cy.contains('.productinfo p', 'Sleeveless Dress').should('be.visible')
        carrinho.adicionarProdutoAoCarrinhoPorId('1')
        carrinho.clicarContinuarComprandoNoModal()
        cy.contains('.productinfo p', 'Summer White Top').should('be.visible')
        carrinho.adicionarProdutoAoCarrinhoPorId('6')
        carrinho.clicarVerCarrinhoNoModal()
        cy.url().should('include', '/view_cart')
        cy.get('li.active').should('have.text', 'Shopping Cart')

        carrinho.prosseguirParaCheckout()
        carrinho.preencherMensagemNoPlaceOrder('Favor enviar embrulhado para presente!')
        carrinho.irParaPagamento()

        const randomDigits = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('')
        const cardNumber = randomDigits(16)
        const cvc = randomDigits(3)
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
        const year = String(new Date().getFullYear() + 2)
        carrinho.preencherDadosDoPagamento({
            nameOnCard: tempUser.fullName,
            cardNumber,
            cvc,
            expiryMonth: month,
            expiryYear: year,
        })

        carrinho.pagarEConfirmar()

        account.excluirConta()
    })
});
