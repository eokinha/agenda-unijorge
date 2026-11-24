import { ResumoPipe } from './resumo-pipe';

describe('ResumoPipe', () => {
  const pipe = new ResumoPipe();
  const texto = 'Semana de Tecnologia da Unijorge com palestras e oficinas';

  it('sem parâmetro corta em 30', () => {
    expect(pipe.transform(texto)).toBe('Semana de Tecnologia da…');
  });

  it('com parâmetro 40', () => {
    expect(pipe.transform(texto, 40)).toBe('Semana de Tecnologia da Unijorge com…');
  });

  it('texto curto fica igual', () => {
    expect(pipe.transform('Palestra')).toBe('Palestra');
  });

  it('vazio', () => {
    expect(pipe.transform('')).toBe('');
  });
});
