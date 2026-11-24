import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

// DummyJSON: a nossa API de treino (no projeto final, vira o backend Spring)
export const API_URL = 'https://dummyjson.com';

const CHAVE_TOKEN = 'token';

export interface RespostaLogin {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

export interface Perfil {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

@Service()
export class AuthService {
  private http = inject(HttpClient);

  entrar(usuario: string, senha: string): Observable<RespostaLogin> {
    return this.http
      .post<RespostaLogin>(`${API_URL}/auth/login`, { username: usuario, password: senha })
      .pipe(tap((r) => this.guardar(r.accessToken)));
  }

  // o serviço não fala de token: quem põe o header é o authInterceptor
  perfil(): Observable<Perfil> {
    return this.http.get<Perfil>(`${API_URL}/auth/me`);
  }

  token(): string | null {
    // no SSR não existe localStorage
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(CHAVE_TOKEN);
  }

  sair() {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(CHAVE_TOKEN);
  }

  private guardar(token: string) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(CHAVE_TOKEN, token);
  }
}
