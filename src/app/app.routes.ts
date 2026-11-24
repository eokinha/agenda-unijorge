import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CadastroEvento } from './pages/cadastro-evento/cadastro-evento';
import { ListaEventos } from './pages/lista-eventos/lista-eventos';
import { Participantes } from './pages/participantes/participantes';
import { Entrar } from './pages/entrar/entrar';
import { Perfil } from './pages/perfil/perfil';
import { NaoEncontrado } from './pages/nao-encontrado/nao-encontrado';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'eventos', component: ListaEventos },
  { path: 'eventos/novo', component: CadastroEvento },
  { path: 'eventos/:id/participantes', component: Participantes },
  { path: 'entrar', component: Entrar },
  { path: 'perfil', component: Perfil },
  { path: '**', component: NaoEncontrado },
];
