import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router, provideRouter } from '@angular/router';
import { erroInterceptor } from './erro-interceptor';
import { API_URL } from './auth-service';

describe('erroInterceptor', () => {
  let http: HttpClient;
  let ctrl: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptors([erroInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    ctrl = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => ctrl.verify());

  it('401: apaga o token, manda para /entrar e repassa o erro', () => {
    localStorage.setItem('token', 'inventado');
    const navegar = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    let status = 0;

    http.get(`${API_URL}/auth/me`).subscribe({ error: (e) => (status = e.status) });
    ctrl
      .expectOne(`${API_URL}/auth/me`)
      .flush({ message: 'Invalid token' }, { status: 401, statusText: 'Unauthorized' });

    expect(localStorage.getItem('token')).toBeNull();
    expect(navegar).toHaveBeenCalledWith(['/entrar']);
    expect(status).toBe(401);
  });

  it('400 (senha errada) passa direto, sem redirecionar', () => {
    const navegar = vi.spyOn(router, 'navigate');
    let status = 0;

    http.post(`${API_URL}/auth/login`, {}).subscribe({ error: (e) => (status = e.status) });
    ctrl
      .expectOne(`${API_URL}/auth/login`)
      .flush({ message: 'Invalid credentials' }, { status: 400, statusText: 'Bad Request' });

    expect(navegar).not.toHaveBeenCalled();
    expect(status).toBe(400);
  });
});
