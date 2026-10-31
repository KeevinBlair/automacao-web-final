const seletores = {
  tituloAssinatura: '#footer h2',
  campoEmail: '#susbscribe_email',
  botaoAssinar: '#subscribe',
  mensagemSucesso: '.alert-success'
};

function acessarPaginaInicial() {
  cy.visit('/');
  cy.contains('a', 'Home').should('be.visible');
}

function verificarAreaAssinatura() {
  cy.get(seletores.tituloAssinatura)
    .scrollIntoView()
    .should('contain.text', 'Subscription');
}

function realizarAssinatura(email) {
  cy.get(seletores.campoEmail).type(email);
  cy.get(seletores.botaoAssinar).click();
}

function validarAssinaturaRealizada() {
  cy.get(seletores.mensagemSucesso)
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!');
}

module.exports = {
  acessarPaginaInicial,
  verificarAreaAssinatura,
  realizarAssinatura,
  validarAssinaturaRealizada
};