import { MascaraEmailPipe } from './mascara-email-pipe';

describe('MascaraEmailPipe', () => {
  const pipe = new MascaraEmailPipe();

  it('esconde o usuário menos as duas primeiras letras', () => {
    expect(pipe.transform('joaoguedes@gmail.com')).toBe('jo********@gmail.com');
  });

  it('sem @ devolve igual', () => {
    expect(pipe.transform('joao')).toBe('joao');
  });

  it('vazio', () => {
    expect(pipe.transform('')).toBe('');
  });
});
