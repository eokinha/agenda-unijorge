import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

// formato que o ViaCEP devolve
interface ViaCepDTO {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: string | boolean;
}

// formato que a nossa tela usa
export interface Endereco {
  rua: string;
  bairro: string;
  cidade: string;
  uf: string;
}

@Service()
export class CepService {
  private http = inject(HttpClient);

  buscar(cep: string): Observable<Endereco | null> {
    const digitos = cep.replace(/\D/g, ''); // tira o traço
    return this.http.get<ViaCepDTO>(`https://viacep.com.br/ws/${digitos}/json/`).pipe(
      // CEP inexistente volta com 200 e { "erro": "true" }
      map((dto) =>
        dto.erro
          ? null
          : {
              rua: dto.logradouro ?? '',
              bairro: dto.bairro ?? '',
              cidade: dto.localidade ?? '',
              uf: dto.uf ?? '',
            },
      ),
    );
  }
}
