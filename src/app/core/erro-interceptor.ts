import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth-service';

export const erroInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService); // inject sempre no topo (senão NG0203)
  const router = inject(Router);

  return next(req).pipe(
    catchError((erro: HttpErrorResponse) => {
      if (erro.status === 401) {
        // crachá vencido ou falso
        auth.sair();
        router.navigate(['/entrar']);
      }
      return throwError(() => erro); // a tela também precisa saber
    }),
  );
};
