// https://gist.github.com/samlucax/0df852881249b561cdf8888493b03125

require('cypress-xpath')

describe('Cadastrar entradas e saídas com bugs - XPath Version', () => {
  
  beforeEach(() => {
    // Navega para a aplicação antes de cada teste
    cy.visit("https://devfinance-agilizei.netlify.app");
  });

  afterEach(() => {
    // Limpa dados entre os testes para garantir independência
    cy.window().then((win) => {
      win.localStorage.clear();
      win.sessionStorage.clear();
    });
  });

  // Função auxiliar para criar nova transação
  const criarNovaTransacao = (descricao, valor, data) => {
    cy.xpath('//a[text()="+ Nova Transação"]').click();
    cy.xpath('//input[@id="description"]').type(descricao);
    cy.xpath('//input[@id="amount"]').type(valor);
    cy.xpath('//input[@id="date"]').type(data);
    cy.xpath('//button[text()="Salvar"]').click();
  };

  it('Cadastrar uma nova transação de entrada - falha 1', () => {
    criarNovaTransacao("Mesada", 100, "2023-02-01");
  });

  it('Cadastrar uma nova transação de entrada - falha 2', () => {
    criarNovaTransacao("Mesada", 100, "2023-02-01");
    cy.xpath('//tbody//tr').should("have.length", 1);
  });  

  it('Cadastrar uma nova transação de entrada - falha 3', () => {
    criarNovaTransacao("Mesada", 100, "2023-02-01");
    // Verificação removida intencionalmente
  });

  it('Cadastrar uma nova transação de entrada - falha 4', () => {
    criarNovaTransacao("Mesada", 100, "2023-02-01");
    // Verificação comentada intencionalmente
  });

  it('Cadastrar uma nova transação de entrada - falha 5', () => {
    criarNovaTransacao("Mesada", 100, "2023-02-01");
    // Teste sem verificação de alert removido
  });

  it('Cadastrar uma nova transação de entrada - falha 6', () => {
    criarNovaTransacao("Mesada", 100, "2023-02-01");
    // Verificação incorreta removida
  });
}); 