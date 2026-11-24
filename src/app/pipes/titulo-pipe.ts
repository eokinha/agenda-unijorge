import { Pipe, PipeTransform } from '@angular/core';

// palavras de ligação que ficam minúsculas (menos se for a primeira)
const MINUSCULAS = ['de', 'da', 'do', 'das', 'dos', 'e', 'a', 'o', 'ao', 'aos', 'em', 'no', 'na', 'nos', 'nas'];

@Pipe({
  name: 'titulo',
})
export class TituloPipe implements PipeTransform {
  transform(texto: string | null | undefined): string {
    if (!texto || texto.trim() === '') return '';

    const palavras = texto.trim().toLowerCase().split(/\s+/);

    return palavras
      .map((p, i) => {
        if (i > 0 && MINUSCULAS.includes(p)) {
          return p;
        }
        return p[0].toUpperCase() + p.slice(1);
      })
      .join(' ');
  }
}
