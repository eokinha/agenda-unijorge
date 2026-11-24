import { Pipe, PipeTransform } from '@angular/core';

const LIGACAO = ['de', 'da', 'do', 'das', 'dos', 'e'];

@Pipe({
  name: 'iniciais',
})
export class IniciaisPipe implements PipeTransform {
  transform(nome: string | null | undefined): string {
    if (!nome || nome.trim() === '') return '';

    const partes = nome
      .trim()
      .split(/\s+/)
      .filter((p) => !LIGACAO.includes(p.toLowerCase()));

    if (partes.length === 1) {
      return partes[0][0].toUpperCase();
    }
    const ultima = partes[partes.length - 1];
    return (partes[0][0] + ultima[0]).toUpperCase();
  }
}
