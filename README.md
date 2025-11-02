Trabalho Final PGATS - Automação Web

Projeto de automação de testes end-to-end (E2E) desenvolvido com Cypress, como parte do Trabalho Final da disciplina PGATS.

Objetivo  
Automatizar os principais fluxos do site Automation Exercise, cobrindo cenários de cadastro, login, contato, navegação e compra.

Estrutura  
- cypress/e2e/trabalho-final-pgats.cy.js — Casos de teste principais  
- cypress/modules/ — Componentização das ações por área (login, cadastro, carrinho, etc.)  
- cypress/support/ — Utilitários e geração de dados dinâmicos  
- .github/workflows/ — Pipeline de integração contínua com GitHub Actions

Casos de Teste Implementados  
- TC01 – Registro de novo usuário  
- TC02 – Login com credenciais corretas  
- TC03 – Login com credenciais incorretas  
- TC04 – Logout de usuário autenticado  
- TC05 – Registro com e-mail existente  
- TC06 – Formulário de contato  
- TC08 – Visualização de produtos e detalhes  
- TC09 – Pesquisa de produto  
- TC10 – Assinatura de newsletter  
- TC15 – Finalização de compra com registro prévio  

Execução Local  
npm install  
npx cypress open  

Integração Contínua  
O projeto executa automaticamente via GitHub Actions em todos os commits na branch main.  
Os relatórios e vídeos dos testes são salvos como artefatos do workflow.

qualquer coisa só chamar samuca, obrigado pelas aulas :D
