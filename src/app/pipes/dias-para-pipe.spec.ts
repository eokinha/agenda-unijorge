import { DiasParaPipe } from './dias-para-pipe';

describe('DiasParaPipe', () => {
  const pipe = new DiasParaPipe();
  const hoje = new Date(2026, 10, 10); // 10/11/2026

  it('hoje', () => {
    expect(pipe.transform('2026-11-10', hoje)).toBe('Hoje');
  });

  it('amanhã', () => {
    expect(pipe.transform('2026-11-11', hoje)).toBe('Amanhã');
  });

  it('faltam 10 dias', () => {
    expect(pipe.transform('2026-11-20', hoje)).toBe('Faltam 10 dias');
  });

  it('faltam 21 dias (virando o mês)', () => {
    expect(pipe.transform('2026-12-01', hoje)).toBe('Faltam 21 dias');
  });

  it('encerrado', () => {
    expect(pipe.transform('2026-11-09', hoje)).toBe('Encerrado');
  });

  it('vazio', () => {
    expect(pipe.transform('', hoje)).toBe('');
  });
});
