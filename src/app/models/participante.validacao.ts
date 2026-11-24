import { validarEmail } from './evento.validacao';

export const FORMAS_PAGAMENTO = [
  { valor: 'pix', texto: 'Pix' },
  { valor: 'cartao', texto: 'Cartão de crédito' },
  { valor: 'boleto', texto: 'Boleto' },
  { valor: 'dinheiro', texto: 'Dinheiro' },
];

export function validarDescricao(descricao: string): string | null {
  if ((descricao ?? '').trim() === '') {
    return 'A descrição é obrigatória.';
  }
  return null;
}

export function validarEmailParticipante(email: string): string | null {
  return validarEmail(email);
}

export function validarTelefone(telefone: string): string | null {
  const digitos = (telefone ?? '').replace(/\D/g, '');
  if (digitos === '') {
    return 'O telefone é obrigatório.';
  }
  if (digitos.length !== 10 && digitos.length !== 11) {
    return 'O telefone deve ter DDD + número (10 ou 11 dígitos).';
  }
  return null;
}

export function validarFormaPagamento(forma: string): string | null {
  if (!forma) {
    return 'Escolha a forma de pagamento.';
  }
  return null;
}
