import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_URL, AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('entrar com a senha certa guarda o token', () => {
    service.entrar('emilys', 'emilyspass').subscribe();

    const req = http.expectOne(`${API_URL}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'emilys', password: 'emilyspass' });
    req.flush({ accessToken: 'abc123' });

    expect(service.token()).toBe('abc123');
  });

  it('entrar com a senha errada não guarda nada', () => {
    service.entrar('emilys', 'errada').subscribe({ error: () => {} });

    http
      .expectOne(`${API_URL}/auth/login`)
      .flush({ message: 'Invalid credentials' }, { status: 400, statusText: 'Bad Request' });

    expect(service.token()).toBeNull();
  });

  it('perfil faz GET em /auth/me', () => {
    service.perfil().subscribe();
    const req = http.expectOne(`${API_URL}/auth/me`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('sair apaga o token', () => {
    localStorage.setItem('token', 'abc123');
    service.sair();
    expect(service.token()).toBeNull();
  });
});
