import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resumo',
})
export class ResumoPipe implements PipeTransform {
  transform(texto: string | null | undefined, limite: number = 30): string {
    if (!texto) return '';
    if (texto.length <= limite) return texto;

    // pega um caractere a mais pra saber se a palavra terminou bem no limite
    let corte = texto.slice(0, limite + 1);
    const ultimoEspaco = corte.lastIndexOf(' ');

    if (ultimoEspaco > 0) {
      corte = corte.slice(0, ultimoEspaco);
    } else {
      corte = texto.slice(0, limite); // palavra gigante, não tem como não partir
    }

    return corte.trimEnd() + '…';
  }
}
