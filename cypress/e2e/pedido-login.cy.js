const registro = require('../modules/usuario/registro');
const autenticacao = require('../modules/usuario/autenticacao');
const compra = require('../modules/pedido/compra');

describe('Testes de pedido com login', () => {
  it('Caso 16 - Deve realizar pedido após efetuar login', () => {
    cy.fixture('dados-teste').then((dados) => {
      const usuario = dados.usuario;
      const pagamento = dados.pagamento;

      const email = usuario.email.replace(
        '@',
        `.caso16.${Date.now()}@`
      );

      // Criar uma conta
      registro.acessarTelaCadastro();
      registro.iniciarCadastro(usuario.nome, email);
      registro.preencherDadosConta(usuario);
      registro.validarCadastroRealizado();

      // Sair e entrar novamente
      autenticacao.efetuarLogout();
      autenticacao.acessarLogin();
      autenticacao.efetuarLogin(email, usuario.senha);
      autenticacao.validarLoginRealizado(usuario.nome);

      // Adicionar produto e finalizar pedido
      compra.adicionarProdutoAoCarrinho();
      compra.continuarCompra();
      compra.preencherPedido();
      compra.preencherPagamento(pagamento);
      compra.validarPedidoRealizado();

      // Excluir a conta de teste
      registro.excluirConta();
    });
  });
});