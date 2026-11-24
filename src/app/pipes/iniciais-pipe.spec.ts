import { IniciaisPipe } from './iniciais-pipe';

describe('IniciaisPipe', () => {
  const pipe = new IniciaisPipe();

  it('primeiro e último nome', () => {
    expect(pipe.transform('Maria da Silva Santos')).toBe('MS');
  });

  it('espaços sobrando e minúsculas', () => {
    expect(pipe.transform('  joão   guedes de brito ')).toBe('JB');
  });

  it('um nome só', () => {
    expect(pipe.transform('Ana')).toBe('A');
  });

  it('vazio', () => {
    expect(pipe.transform('')).toBe('');
  });
});
