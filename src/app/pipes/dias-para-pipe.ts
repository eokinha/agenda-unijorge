import { Pipe, PipeTransform } from '@angular/core';

const UM_DIA = 24 * 60 * 60 * 1000;

@Pipe({
  name: 'diasPara',
})
export class DiasParaPipe implements PipeTransform {
  transform(data: string | null | undefined, hoje: Date = new Date()): string {
    if (!data) return '';

    // não dá pra usar new Date('2026-11-20') por causa do fuso
    const [ano, mes, dia] = data.split('-').map(Number);
    const evento = Date.UTC(ano, mes - 1, dia);
    const agora = Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

    const dias = Math.round((evento - agora) / UM_DIA);

    if (dias < 0) return 'Encerrado';
    if (dias === 0) return 'Hoje';
    if (dias === 1) return 'Amanhã';
    return `Faltam ${dias} dias`;
  }
}
