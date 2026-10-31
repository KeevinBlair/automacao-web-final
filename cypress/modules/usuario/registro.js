
const seletores = {
  botaoCadastro: 'a[href="/login"]',
  campoNome: 'input[data-qa="signup-name"]',
  campoEmail: 'input[data-qa="signup-email"]',
  botaoSignup: 'button[data-qa="signup-button"]',

  tituloConta: 'input#id_gender1',
  campoSenha: 'input[data-qa="password"]',
  diaNascimento: 'select[data-qa="days"]',
  mesNascimento: 'select[data-qa="months"]',
  anoNascimento: 'select[data-qa="years"]',

  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: 'input[data-qa="first_name"]',
  ultimoNome: 'input[data-qa="last_name"]',
  empresa: 'input[data-qa="company"]',
  endereco: 'input[data-qa="address"]',
  pais: 'select[data-qa="country"]',
  estado: 'input[data-qa="state"]',
  cidade: 'input[data-qa="city"]',
  cep: 'input[data-qa="zipcode"]',
  telefone: 'input[data-qa="mobile_number"]',

  botaoCriarConta: 'button[data-qa="create-account"]',
  botaoContinuar: 'a[data-qa="continue-button"]',
  botaoExcluirConta: 'a[href="/delete_account"]'
};

function acessarTelaCadastro() {
  cy.visit('/');

  cy.contains('a', 'Home').should('be.visible');
  cy.get(seletores.botaoCadastro).click();

  cy.contains('h2', 'New User Signup!').should('be.visible');
}

function iniciarCadastro(nome, email) {
  cy.get(seletores.campoNome).type(nome);
  cy.get(seletores.campoEmail).type(email);
  cy.get(seletores.botaoSignup).click();

  cy.contains('b', 'Enter Account Information').should('be.visible');
}

function preencherDadosConta(usuario) {
  cy.get(seletores.tituloConta).check();
  cy.get(seletores.campoSenha).type(usuario.senha);

  cy.get(seletores.diaNascimento).select('10');
  cy.get(seletores.mesNascimento).select('5');
  cy.get(seletores.anoNascimento).select('1990');

  cy.get(seletores.newsletter).check();
  cy.get(seletores.ofertas).check();

  cy.get(seletores.primeiroNome).type(usuario.primeiroNome);
  cy.get(seletores.ultimoNome).type(usuario.ultimoNome);
  cy.get(seletores.empresa).type(usuario.empresa);
  cy.get(seletores.endereco).type(usuario.endereco);
  cy.get(seletores.pais).select(usuario.pais);
  cy.get(seletores.estado).type(usuario.estado);
  cy.get(seletores.cidade).type(usuario.cidade);
  cy.get(seletores.cep).type(usuario.cep);
  cy.get(seletores.telefone).type(usuario.telefone);

  cy.get(seletores.botaoCriarConta).click();
}

function validarCadastroRealizado() {
  cy.contains('b', 'Account Created!').should('be.visible');
  cy.get(seletores.botaoContinuar).click();
}

function excluirConta() {
  cy.contains('Logged in as').should('be.visible');

  cy.get(seletores.botaoExcluirConta).click();

  cy.contains('b', 'Account Deleted!').should('be.visible');
  cy.get(seletores.botaoContinuar).click();
}

function tentarCadastroComEmailExistente(nome, email) {
  cy.get(seletores.campoNome).type(nome);
  cy.get(seletores.campoEmail).type(email);
  cy.get(seletores.botaoSignup).click();

  cy.contains('Email Address already exist!').should('be.visible');
}

module.exports = {
  acessarTelaCadastro,
  iniciarCadastro,
  preencherDadosConta,
  validarCadastroRealizado,
  excluirConta,
  tentarCadastroComEmailExistente
};
