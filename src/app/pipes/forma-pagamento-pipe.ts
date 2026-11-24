import { Pipe, PipeTransform } from '@angular/core';
import { FormaPagamento } from '../models/participante';

const ROTULOS: Record<FormaPagamento, string> = {
  pix: 'Pix',
  cartao: 'Cartão de crédito',
  boleto: 'Boleto',
  dinheiro: 'Dinheiro',
  '': 'Não informado',
};

@Pipe({
  name: 'formaPagamento',
})
export class FormaPagamentoPipe implements PipeTransform {
  transform(valor: FormaPagamento | null | undefined): string {
    if (!valor) return 'Não informado';
    return ROTULOS[valor] ?? 'Não informado';
  }
}
