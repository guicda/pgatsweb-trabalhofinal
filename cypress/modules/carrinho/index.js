class Carrinho {
	navegarParaProdutos() {
		cy.get('a[href="/products"]').should('be.visible').click()
	}

	abrirPrimeiroProduto() {
		cy.get('a[href="/product_details/1"]').should('be.visible').click()
	}
	
	pesquisarProduto(termo) {
		cy.get('#search_product').should('be.visible').clear().click().type(termo)
		cy.get('#submit_search').should('be.visible').click()
	}
	
	// Adiciona um produto ao carrinho pelo data-product-id, lidando com múltiplos elementos
	adicionarProdutoAoCarrinhoPorId(productId) {
		cy.get(`a[data-product-id="${productId}"]`)
			.filter(':visible')
			.first()
			.scrollIntoView()
			.should('be.visible')
			.click()
	}

	// Adiciona um produto ao carrinho pelo nome exibido no card
	adicionarProdutoAoCarrinhoPorNome(nomeProduto) {
		cy.contains('.productinfo p', nomeProduto)
			.should('be.visible')
			.closest('.product-image-wrapper')
			.find('a.btn.btn-default.add-to-cart')
			.filter(':visible')
			.first()
			.scrollIntoView()
			.click()
	}

	// Clica no botão 'Continue Shopping' do modal
	clicarContinuarComprandoNoModal() {
		cy.contains('button', 'Continue Shopping').should('be.visible').click()
	}

	// Clica no link 'View Cart' do modal
	clicarVerCarrinhoNoModal() {
		cy.get('a[href="/view_cart"]').filter(':visible').first().should('be.visible').click()
	}

	// Prosseguir para checkout a partir do carrinho
	prosseguirParaCheckout() {
		cy.get('a.btn.btn-default.check_out').contains('Proceed To Checkout').should('be.visible').click()
		cy.get('h2.heading', { timeout: 15000 })
			.should('be.visible')
			.and('contain.text', 'Address Details')
	}

	// Preencher mensagem no passo Place Order
	preencherMensagemNoPlaceOrder(mensagem) {
		if (!mensagem) {
			throw new Error('preencherMensagemNoPlaceOrder: informe a mensagem')
		}
		cy.get('textarea[name="message"]').should('be.visible').clear().type(mensagem)
	}

	// Avançar para a tela de pagamento
	irParaPagamento() {
		cy.get('a.btn.btn-default.check_out[href="/payment"]').should('be.visible').click()
	}

	// Preencher dados do pagamento
	preencherDadosDoPagamento({ nameOnCard, cardNumber, cvc, expiryMonth, expiryYear } = {}) {
		if (!nameOnCard || !cardNumber || !cvc || !expiryMonth || !expiryYear) {
			throw new Error('preencherDadosDoPagamento: informe nameOnCard, cardNumber, cvc, expiryMonth e expiryYear')
		}
		cy.get('input[data-qa="name-on-card"]').should('be.visible').clear().type(nameOnCard)
		cy.get('input[data-qa="card-number"]').should('be.visible').clear().type(cardNumber)
		cy.get('input[data-qa="cvc"]').should('be.visible').clear().type(cvc)
		cy.get('input[data-qa="expiry-month"]').should('be.visible').clear().type(expiryMonth)
		cy.get('input[data-qa="expiry-year"]').should('be.visible').clear().type(expiryYear)
	}

	// Pagar e confirmar a mensagem de sucesso
	pagarEConfirmar( ) {
		cy.get('button[data-qa="pay-button"]').should('be.visible').and('not.be.disabled').click()
		// Verificar elemento de pedido realizado e a mensagem de confirmação
		cy.get('[data-qa="order-placed"] > b', { timeout: 20000 }).should('be.visible')
		cy.get('.col-sm-9 > p', { timeout: 20000 }).should('contain.text', 'Congratulations! Your order has been confirmed!')
	}
}

export default new Carrinho()

