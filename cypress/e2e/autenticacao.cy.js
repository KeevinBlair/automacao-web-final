
const registro = require('../modules/usuario/registro');
const autenticacao = require('../modules/usuario/autenticacao');

describe('Testes de autenticação', () => {

    it('Caso 2 - Deve realizar login com email e senha corretos', () => {
        cy.fixture('dados-teste').then((dados) => {
            const usuario = dados.usuario;
            const email = usuario.email.replace('@', `.caso2.${Date.now()}@`);

            registro.acessarTelaCadastro();
            registro.iniciarCadastro(usuario.nome, email);
            registro.preencherDadosConta(usuario);
            registro.validarCadastroRealizado();

            autenticacao.efetuarLogout();
            autenticacao.acessarLogin();
            autenticacao.efetuarLogin(email, usuario.senha);
            autenticacao.validarLoginRealizado(usuario.nome);

            registro.excluirConta();
        });
    });

    it('Caso 3 - Deve exibir mensagem ao tentar login com dados incorretos', () => {
        autenticacao.acessarLogin();

        autenticacao.efetuarLogin(
            'email.incorreto@example.com',
            'senhaIncorreta123'
        );

        autenticacao.validarMensagemLoginInvalido();
    });

    it('Caso 4 - Deve realizar logout com sucesso', () => {
        cy.fixture('dados-teste').then((dados) => {
            const usuario = dados.usuario;
            const email = usuario.email.replace('@', `.caso4.${Date.now()}@`);

            registro.acessarTelaCadastro();
            registro.iniciarCadastro(usuario.nome, email);
            registro.preencherDadosConta(usuario);
            registro.validarCadastroRealizado();

            autenticacao.efetuarLogout();

            cy.url().should('include', '/login');
            cy.contains('Login to your account').should('be.visible');

            autenticacao.efetuarLogin(email, usuario.senha);
            autenticacao.validarLoginRealizado(usuario.nome);

            registro.excluirConta();
        });
    });
});
