import { TituloPipe } from './titulo-pipe';

describe('TituloPipe', () => {
  const pipe = new TituloPipe();

  it('palavras de ligação minúsculas', () => {
    expect(pipe.transform('semana de tecnologia da unijorge')).toBe('Semana de Tecnologia da Unijorge');
  });

  it('tudo maiúsculo e ligação no começo', () => {
    expect(pipe.transform('DE VOLTA AO CAMPUS')).toBe('De Volta ao Campus');
  });

  it('só espaços', () => {
    expect(pipe.transform('   ')).toBe('');
  });

  it('vazio', () => {
    expect(pipe.transform('')).toBe('');
  });
});
