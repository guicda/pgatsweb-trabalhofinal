//<reference types="cypress" />

// Funções utilitárias para geração de dados aleatórios

/**
 * Gera um nome aleatório composto por primeiro nome e sobrenome
 * @returns {string} Nome completo aleatório
 */
export function gerarNomeAleatorio() {
    const primeiroNomes = [
        'João', 'Maria', 'José', 'Ana', 'Carlos', 'Lucia', 'Pedro', 'Fernanda',
        'Marcos', 'Patricia', 'Ricardo', 'Juliana', 'Rafael', 'Camila', 'Bruno',
        'Amanda', 'Diego', 'Leticia', 'Gabriel', 'Carla', 'Felipe', 'Beatriz',
        'Lucas', 'Priscila', 'André', 'Vanessa', 'Thiago', 'Renata', 'Daniel',
        'Monica'
    ];

    const sobrenomes = [
        'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves',
        'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho',
        'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa', 'Rocha',
        'Dias', 'Monteiro', 'Mendes', 'Ramos', 'Moreira', 'Azevedo', 'Cardoso',
        'Melo', 'Campos'
    ];

    const primeiroNome = primeiroNomes[Math.floor(Math.random() * primeiroNomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    
    return `${primeiroNome} ${sobrenome}`;
}

/**
 * Gera um e-mail aleatório baseado em um nome ou usando um nome aleatório
 * @param {string} nome - Nome para base do e-mail (opcional)
 * @returns {string} E-mail aleatório
 */
export function gerarEmailAleatorio(nome = null) {
    const dominios = [
        'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'teste.com',
        'email.com', 'mail.com', 'example.com', 'test.org', 'demo.net'
    ];

    let baseEmail;
    
    if (nome) {
        // Remove acentos e caracteres especiais, converte para minúsculo
        baseEmail = nome
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/\s+/g, '.') // Substitui espaços por pontos
            .replace(/[^a-z0-9.]/g, ''); // Remove caracteres especiais
    } else {
        // Gera um nome base aleatório
        const nomes = ['usuario', 'teste', 'demo', 'exemplo', 'user', 'admin', 'cliente'];
        baseEmail = nomes[Math.floor(Math.random() * nomes.length)];
    }

    // Adiciona números aleatórios para garantir unicidade
    const numeroAleatorio = Math.floor(Math.random() * 9999) + 1;
    const dominio = dominios[Math.floor(Math.random() * dominios.length)];
    
    return `${baseEmail}${numeroAleatorio}@${dominio}`;
}

/**
 * Gera dados completos de usuário (nome e e-mail)
 * @returns {object} Objeto contendo nome e email gerados
 */
export function gerarDadosUsuario() {
    const nome = gerarNomeAleatorio();
    const email = gerarEmailAleatorio(nome);
    
    return {
        nome: nome,
        email: email
    };
}