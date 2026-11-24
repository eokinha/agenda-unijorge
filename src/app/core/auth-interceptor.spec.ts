import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from './auth-interceptor';
import { API_URL } from './auth-service';

describe('authInterceptor', () => {
  let http: HttpClient;
  let ctrl: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    ctrl = TestBed.inject(HttpTestingController);
  });

  afterEach(() => ctrl.verify());

  it('com token, põe o Authorization nas chamadas da nossa API', () => {
    localStorage.setItem('token', 'abc123');
    http.get(`${API_URL}/auth/me`).subscribe();

    const req = ctrl.expectOne(`${API_URL}/auth/me`);
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
    req.flush({});
  });

  it('nunca manda o token para o ViaCEP', () => {
    localStorage.setItem('token', 'abc123');
    http.get('https://viacep.com.br/ws/40140110/json/').subscribe();

    const req = ctrl.expectOne('https://viacep.com.br/ws/40140110/json/');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('sem token, a chamada passa como veio', () => {
    http.get(`${API_URL}/auth/me`).subscribe();

    const req = ctrl.expectOne(`${API_URL}/auth/me`);
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });
});
