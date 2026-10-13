import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CadastroEvento } from './pages/cadastro-evento/cadastro-evento';
import { NaoEncontrado } from './pages/nao-encontrado/nao-encontrado';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'eventos/novo', component: CadastroEvento },
  { path: '**', component: NaoEncontrado },
];
