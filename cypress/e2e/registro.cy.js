
const autenticacao = require('../modules/usuario/autenticacao');
const registro = require('../modules/usuario/registro');

describe('Testes de registro de usuário', () => {
  it('Caso 1 - Deve cadastrar e excluir uma conta com sucesso', () => {
    cy.fixture('dados-teste').then((dados) => {
      const usuario = dados.usuario;

      const email = usuario.email.replace(
        '@',
        `.${Date.now()}@`
      );

      registro.acessarTelaCadastro();
      registro.iniciarCadastro(usuario.nome, email);
      registro.preencherDadosConta(usuario);
      registro.validarCadastroRealizado();
      registro.excluirConta();
    });
  });

  it('Caso 5 - Deve exibir mensagem ao cadastrar um email já existente', () => {
    cy.fixture('dados-teste').then((dados) => {
      const usuario = dados.usuario;
      const email = usuario.email.replace(
        '@',
        `.caso5.${Date.now()}@`
      );

      registro.acessarTelaCadastro();
      registro.iniciarCadastro(usuario.nome, email);
      registro.preencherDadosConta(usuario);
      registro.validarCadastroRealizado();

      autenticacao.efetuarLogout();

      registro.acessarTelaCadastro();
      registro.tentarCadastroComEmailExistente(usuario.nome, email);

      autenticacao.efetuarLogin(email, usuario.senha);
      autenticacao.validarLoginRealizado(usuario.nome);

      registro.excluirConta();
    });
  });
});
