const seletores = {
  botaoAdicionarCarrinho: 'button.cart',
  linkCarrinho: 'a[href="/view_cart"]',
  botaoFinalizarCompra: 'a.check_out',
  botaoRegistrarLogin: 'a[href="/login"]',

  campoMensagem: 'textarea[name="message"]',
  botaoFazerPedido: 'a[href="/payment"]',

  nomeCartao: 'input[data-qa="name-on-card"]',
  numeroCartao: 'input[data-qa="card-number"]',
  cvc: 'input[data-qa="cvc"]',
  mesValidade: 'input[data-qa="expiry-month"]',
  anoValidade: 'input[data-qa="expiry-year"]',
  botaoConfirmarPagamento: 'button[data-qa="pay-button"]'
};

function adicionarProdutoAoCarrinho() {
  cy.visit('/product_details/1');

  cy.get('.product-information')
    .find('button.cart')
    .click();

  cy.get('.modal-content')
    .find('a[href="/view_cart"]')
    .click();

  cy.url().should('include', '/view_cart');
  cy.contains('Blue Top').should('be.visible');
}

function iniciarFinalizacaoCompra() {
  cy.get(seletores.botaoFinalizarCompra).click();
  cy.contains('Register / Login').should('be.visible');
}

function acessarCadastro() {
  cy.contains('a', 'Register / Login').click();
  cy.contains('New User Signup!').should('be.visible');
}

function continuarCompra() {
  cy.visit('/view_cart');
  cy.get(seletores.botaoFinalizarCompra).click();

  cy.contains('Address Details').should('be.visible');
  cy.contains('Review Your Order').should('be.visible');
}

function preencherPedido() {
  cy.get(seletores.campoMensagem).type('Pedido realizado para teste automatizado.');
  cy.get(seletores.botaoFazerPedido).click();
}

function preencherPagamento(pagamento) {
  cy.get(seletores.nomeCartao).type(pagamento.nomeCartao);
  cy.get(seletores.numeroCartao).type(pagamento.numeroCartao);
  cy.get(seletores.cvc).type(pagamento.cvc);
  cy.get(seletores.mesValidade).type(pagamento.mes);
  cy.get(seletores.anoValidade).type(pagamento.ano);

  cy.get(seletores.botaoConfirmarPagamento).click();
}

function validarPedidoRealizado() {
  cy.contains('Congratulations! Your order has been confirmed!')
    .should('be.visible');
}

module.exports = {
  adicionarProdutoAoCarrinho,
  iniciarFinalizacaoCompra,
  acessarCadastro,
  continuarCompra,
  preencherPedido,
  preencherPagamento,
  validarPedidoRealizado
};