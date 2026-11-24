import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone',
})
export class TelefonePipe implements PipeTransform {
  transform(valor: string | null | undefined): string {
    if (!valor) return '';

    const d = valor.replace(/\D/g, ''); // só dígitos
    const ddd = d.slice(0, 2);

    if (d.length === 11) {
      return `(${ddd}) ${d.slice(2, 7)}-${d.slice(7)}`;
    }
    if (d.length === 10) {
      return `(${ddd}) ${d.slice(2, 6)}-${d.slice(6)}`;
    }
    return valor; // não reconheceu: devolve como chegou
  }
}
