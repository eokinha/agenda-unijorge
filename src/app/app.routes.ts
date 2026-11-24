import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CadastroEvento } from './pages/cadastro-evento/cadastro-evento';
import { ListaEventos } from './pages/lista-eventos/lista-eventos';
import { Participantes } from './pages/participantes/participantes';
import { NaoEncontrado } from './pages/nao-encontrado/nao-encontrado';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'eventos', component: ListaEventos },
  { path: 'eventos/novo', component: CadastroEvento },
  { path: 'eventos/:id/participantes', component: Participantes },
  { path: '**', component: NaoEncontrado },
];
