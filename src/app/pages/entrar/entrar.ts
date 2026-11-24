import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth-service';

@Component({
  imports: [FormsModule],
  selector: 'app-entrar',
  styleUrl: './entrar.css',
  templateUrl: './entrar.html',
})
export class Entrar {
  private auth = inject(AuthService);
  private router = inject(Router);

  usuario = signal('');
  senha = signal('');
  erro = signal('');
  enviando = signal(false);

  entrar() {
    this.erro.set('');
    this.enviando.set(true);
    this.auth.entrar(this.usuario(), this.senha()).subscribe({
      next: () => this.router.navigate(['/perfil']),
      error: () => {
        this.erro.set('Usuário ou senha inválidos.');
        this.enviando.set(false);
      },
    });
  }
}
