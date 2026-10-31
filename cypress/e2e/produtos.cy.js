
const produtos = require('../modules/catalogo/produtos');

describe('Testes de produtos', () => {

  it('Caso 8 - Deve visualizar a lista de produtos e seus detalhes', () => {
    produtos.acessarProdutos();
    produtos.verificarListaProdutos();
    produtos.abrirPrimeiroProduto();
  });

  it('Caso 9 - Deve pesquisar um produto', () => {
    cy.fixture('dados-teste').then((dados) => {
      produtos.acessarProdutos();
      produtos.pesquisarProduto(dados.produto.nome);
      produtos.verificarResultadoPesquisa(dados.produto.nome);
    });
  });

});
