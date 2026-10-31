
const seletores = {
  menuProdutos: 'a[href="/products"]',
  listaProdutos: '.features_items',
  primeiroProduto: '.features_items .product-image-wrapper',
  botaoVerProduto: 'a[href="/product_details/1"]',
  nomeProduto: '.product-information h2',
  precoProduto: '.product-information span span',
  campoPesquisa: '#search_product',
  botaoPesquisa: '#submit_search',
  resultadoPesquisa: '.features_items .product-image-wrapper'
};

function acessarProdutos() {
  cy.visit('/');

  cy.get(seletores.menuProdutos).click();

  cy.url().should('include', '/products');
  cy.get(seletores.listaProdutos).should('be.visible');
}

function verificarListaProdutos() {
  cy.get(seletores.primeiroProduto).should('have.length.greaterThan', 0);
}

function abrirPrimeiroProduto() {
  cy.get(seletores.botaoVerProduto).click();

  cy.url().should('include', '/product_details/1');
  cy.get(seletores.nomeProduto).should('be.visible');
  cy.get(seletores.precoProduto).should('be.visible');
}

function pesquisarProduto(nome) {
  cy.get(seletores.campoPesquisa).type(nome);
  cy.get(seletores.botaoPesquisa).click();

  cy.contains('h2', 'Searched Products').should('be.visible');
}

function verificarResultadoPesquisa(nome) {
  cy.get(seletores.resultadoPesquisa)
    .should('have.length.greaterThan', 0)
    .and('contain.text', nome);
}

module.exports = {
  acessarProdutos,
  verificarListaProdutos,
  abrirPrimeiroProduto,
  pesquisarProduto,
  verificarResultadoPesquisa
};
