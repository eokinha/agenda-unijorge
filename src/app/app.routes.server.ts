import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // essas telas usam o localStorage, então só rodam no navegador
  { path: 'eventos', renderMode: RenderMode.Client },
  { path: 'eventos/:id/participantes', renderMode: RenderMode.Client },
  // o token fica no localStorage: login e perfil também só no navegador
  { path: 'entrar', renderMode: RenderMode.Client },
  { path: 'perfil', renderMode: RenderMode.Client },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
