class Menu {
    navegarParaLogin () {
     cy.get('a[href="/login"]').click()
    }
}

export default new Menu()

//primeira opção foi a de baixo, depois fizemos a de cima

// export function navegarParaLogin () {
//     cy.get('a[href="/login"]').click()
// }