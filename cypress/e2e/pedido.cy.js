const registro = require('../modules/usuario/registro');
const compra = require('../modules/pedido/compra');

describe('Testes de pedido', () => {
  it('Caso 15 - Deve realizar pedido criando uma conta antes do checkout', () => {
    cy.fixture('dados-teste').then((dados) => {
      const usuario = dados.usuario;
      const pagamento = dados.pagamento;
      const email = usuario.email.replace(
        '@',
        `.caso15.${Date.now()}@`
      );

      compra.adicionarProdutoAoCarrinho();
      compra.iniciarFinalizacaoCompra();
      compra.acessarCadastro();

      registro.iniciarCadastro(usuario.nome, email);
      registro.preencherDadosConta(usuario);
      registro.validarCadastroRealizado();

      compra.continuarCompra();
      compra.preencherPedido();
      compra.preencherPagamento(pagamento);
      compra.validarPedidoRealizado();

      registro.excluirConta();
    });
  });
});