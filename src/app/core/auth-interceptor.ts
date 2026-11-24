import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL, AuthService } from './auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Tem crachá?
  const token = inject(AuthService).token();
  // 2. Vai para a NOSSA API?
  const ehNossaApi = req.url.startsWith(API_URL);

  if (!token || !ehNossaApi) {
    return next(req); // passa como veio
  }

  // sim e sim: a requisição é imutável, então manda uma cópia com o crachá
  const comToken = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(comToken);
};
