class Account {
    assertLoggedInAs(fullName) {
        if (!fullName) {
            throw new Error('assertLoggedInAs: informe fullName')
        }
        cy.contains(`Logged in as ${fullName}`).should('be.visible')
    }

	// Excluir a conta e prosseguir
	excluirConta() {
		cy.get('a[href="/delete_account"]').should('be.visible').click()
		cy.contains('b', 'Account Deleted!').should('be.visible')
		cy.get('a[data-qa="continue-button"]').should('be.visible').click()    
	}
}

export default new Account()
