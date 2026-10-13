import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Evento } from '../../models/evento';
import {
  LOCAIS,
  validarData,
  validarEmail,
  validarLocal,
  validarTitulo,
  validarVagas,
} from '../../models/evento.validacao';

@Component({
  imports: [FormsModule],
  selector: 'app-cadastro-evento',
  styleUrl: './cadastro-evento.css',
  templateUrl: './cadastro-evento.html',
})
export class CadastroEvento {
  locais = LOCAIS;

  titulo = '';
  data = '';
  local = '';
  emailResponsavel = '';
  vagas: number | null = null;

  tocado = {
    titulo: false,
    data: false,
    local: false,
    emailResponsavel: false,
    vagas: false,
  };

  eventos: Evento[] = [];

  get erroTitulo() {
    return validarTitulo(this.titulo);
  }

  get erroData() {
    return validarData(this.data);
  }

  get erroLocal() {
    return validarLocal(this.local);
  }

  get erroEmail() {
    return validarEmail(this.emailResponsavel);
  }

  get erroVagas() {
    return validarVagas(this.vagas, this.local);
  }

  get temErro() {
    return !!(this.erroTitulo || this.erroData || this.erroLocal || this.erroEmail || this.erroVagas);
  }

  salvar() {
    if (this.temErro) {
      return;
    }

    const evento: Evento = {
      id: Date.now(),
      titulo: this.titulo.trim(),
      data: this.data,
      local: this.local,
      emailResponsavel: this.emailResponsavel.trim(),
      vagas: this.vagas,
    };
    this.eventos.push(evento);
    this.limpar();
  }

  limpar() {
    this.titulo = '';
    this.data = '';
    this.local = '';
    this.emailResponsavel = '';
    this.vagas = null;
    this.tocado = {
      titulo: false,
      data: false,
      local: false,
      emailResponsavel: false,
      vagas: false,
    };
  }
}
