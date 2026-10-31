
const seletores = {
  botaoCadastro: 'a[href="/login"]',
  campoEmail: 'input[data-qa="login-email"]',
  campoSenha: 'input[data-qa="login-password"]',
  botaoLogin: 'button[data-qa="login-button"]',
  botaoLogout: 'a[href="/logout"]'
};

function acessarLogin() {
  cy.visit('/');

  cy.get(seletores.botaoCadastro).click();

  cy.contains('h2', 'Login to your account').should('be.visible');
}

function efetuarLogin(email, senha) {
  cy.get(seletores.campoEmail).type(email);
  cy.get(seletores.campoSenha).type(senha);
  cy.get(seletores.botaoLogin).click();
}

function validarLoginRealizado(nome) {
  cy.contains('Logged in as').should('be.visible');
  cy.contains('Logged in as ' + nome).should('be.visible');
}

function validarMensagemLoginInvalido() {
  cy.contains('Your email or password is incorrect!').should('be.visible');
}

function efetuarLogout() {
  cy.get(seletores.botaoLogout).click();

  cy.contains('h2', 'Login to your account').should('be.visible');
}

module.exports = {
  acessarLogin,
  efetuarLogin,
  validarLoginRealizado,
  validarMensagemLoginInvalido,
  efetuarLogout
};
