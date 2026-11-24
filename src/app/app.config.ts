import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { authInterceptor } from './core/auth-interceptor';
import { erroInterceptor } from './core/erro-interceptor';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(),
    // sem o withInterceptors os interceptors existem, mas não rodam
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, erroInterceptor])),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ]
};
