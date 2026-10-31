const assinatura = require('../modules/navegacao/assinatura');

describe('Teste de assinatura', () => {
  it('Caso 10 - Deve realizar inscrição na newsletter', () => {
    const email = `assinatura.${Date.now()}@example.com`;

    assinatura.acessarPaginaInicial();
    assinatura.verificarAreaAssinatura();
    assinatura.realizarAssinatura(email);
    assinatura.validarAssinaturaRealizada();
  });
});