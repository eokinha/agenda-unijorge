import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CepService, Endereco } from './cep-service';

describe('CepService', () => {
  let service: CepService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CepService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('tira o traço e traduz localidade para cidade', () => {
    let resultado: Endereco | null = null;
    service.buscar('40140-110').subscribe((e) => (resultado = e));

    http.expectOne('https://viacep.com.br/ws/40140110/json/').flush({
      cep: '40140-110',
      logradouro: 'Avenida Sete de Setembro',
      bairro: 'Barra',
      localidade: 'Salvador',
      uf: 'BA',
    });

    expect(resultado).toEqual({
      rua: 'Avenida Sete de Setembro',
      bairro: 'Barra',
      cidade: 'Salvador',
      uf: 'BA',
    });
  });

  it('CEP inexistente (200 com erro) vira null', () => {
    let resultado: Endereco | null | undefined;
    service.buscar('99999-999').subscribe((e) => (resultado = e));

    http.expectOne('https://viacep.com.br/ws/99999999/json/').flush({ erro: 'true' });

    expect(resultado).toBeNull();
  });
});
