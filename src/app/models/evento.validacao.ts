export const LOCAIS = ['Auditório', 'Laboratório 1', 'Laboratório 2', 'Sala 101'];

export function validarTitulo(titulo: string): string | null {
  const texto = (titulo ?? '').trim();
  if (texto === '') {
    return 'O título é obrigatório.';
  }
  if (texto.length < 5 || texto.length > 80) {
    return 'O título deve ter entre 5 e 80 caracteres.';
  }
  return null;
}

function hoje(): string {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

export function validarData(data: string): string | null {
  if (!data) {
    return 'A data é obrigatória.';
  }
  // as duas datas estão no formato aaaa-mm-dd, então dá pra comparar como texto
  if (data < hoje()) {
    return 'A data não pode estar no passado.';
  }
  return null;
}

export function validarLocal(local: string): string | null {
  if (!local) {
    return 'O local não pode ficar em branco.';
  }
  return null;
}

export function validarEmail(email: string): string | null {
  const texto = (email ?? '').trim();
  if (texto === '') {
    return 'O e-mail é obrigatório.';
  }
  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formato.test(texto)) {
    return 'E-mail em formato inválido.';
  }
  return null;
}

export function validarVagas(vagas: number | null, local: string = ''): string | null {
  if (vagas === null || vagas === undefined) {
    return 'O número de vagas é obrigatório.';
  }
  if (!Number.isInteger(vagas) || vagas < 1 || vagas > 200) {
    return 'As vagas devem ser um número inteiro de 1 a 200.';
  }
  // bônus: laboratório comporta no máximo 30 pessoas
  if ((local === 'Laboratório 1' || local === 'Laboratório 2') && vagas > 30) {
    return 'Eventos em laboratório podem ter no máximo 30 vagas.';
  }
  return null;
}
