import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mascaraEmail',
})
export class MascaraEmailPipe implements PipeTransform {
  transform(email: string | null | undefined): string {
    if (!email) return '';

    const arroba = email.indexOf('@');
    if (arroba === -1) return email; // não é e-mail, devolve igual

    const usuario = email.slice(0, arroba);
    const dominio = email.slice(arroba); // já com o @

    if (usuario.length <= 2) return email;

    return usuario.slice(0, 2) + '*'.repeat(usuario.length - 2) + dominio;
  }
}
