import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Perfil as DadosPerfil } from '../../core/auth-service';
import { CepService, Endereco } from '../../core/cep-service';

@Component({
  imports: [FormsModule],
  selector: 'app-perfil',
  styleUrl: './perfil.css',
  templateUrl: './perfil.html',
})
export class Perfil implements OnInit {
  private auth = inject(AuthService);
  private cepService = inject(CepService);
  private router = inject(Router);

  perfil = signal<DadosPerfil | null>(null);
  erroPerfil = signal('');

  cep = signal('');
  endereco = signal<Endereco | null>(null);
  erroCep = signal('');
  buscando = signal(false);

  ngOnInit() {
    // o 401 (sem token ou token falso) é tratado pelo erroInterceptor
    this.auth.perfil().subscribe({
      next: (p) => this.perfil.set(p),
      error: () => this.erroPerfil.set('Não foi possível carregar o perfil.'),
    });
  }

  buscarCep() {
    this.endereco.set(null);
    this.erroCep.set('');

    // sem 8 dígitos o ViaCEP devolve uma página HTML, então nem chama
    if (this.cep().replace(/\D/g, '').length !== 8) {
      this.erroCep.set('Digite um CEP com 8 números.');
      return;
    }

    this.buscando.set(true);
    this.cepService.buscar(this.cep()).subscribe({
      next: (e) => {
        if (e) this.endereco.set(e);
        else this.erroCep.set('CEP não encontrado.');
        this.buscando.set(false);
      },
      error: () => {
        this.erroCep.set('Erro ao consultar o CEP.');
        this.buscando.set(false);
      },
    });
  }

  sair() {
    this.auth.sair();
    this.router.navigate(['/entrar']);
  }
}
