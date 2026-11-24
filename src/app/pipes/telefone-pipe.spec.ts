import { TelefonePipe } from './telefone-pipe';

describe('TelefonePipe', () => {
  const pipe = new TelefonePipe();

  it('formata celular', () => {
    expect(pipe.transform('71988887777')).toBe('(71) 98888-7777');
  });

  it('formata fixo', () => {
    expect(pipe.transform('7133334444')).toBe('(71) 3333-4444');
  });

  it('já formatado continua igual', () => {
    expect(pipe.transform('(71) 98888-7777')).toBe('(71) 98888-7777');
  });

  it('devolve o que não reconhece', () => {
    expect(pipe.transform('123')).toBe('123');
  });

  it('vazio ou null', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null)).toBe('');
  });
});
