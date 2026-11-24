import { Component, inject } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Evento } from '../../models/evento';
import { FormaPagamento, Participante } from '../../models/participante';
import {
  FORMAS_PAGAMENTO,
  validarDescricao,
  validarEmailParticipante,
  validarFormaPagamento,
  validarTelefone,
} from '../../models/participante.validacao';
import { EventoService } from '../../services/evento-service';
import { TelefonePipe } from '../../pipes/telefone-pipe';
import { FormaPagamentoPipe } from '../../pipes/forma-pagamento-pipe';
import { IniciaisPipe } from '../../pipes/iniciais-pipe';
import { DiasParaPipe } from '../../pipes/dias-para-pipe';
import { TituloPipe } from '../../pipes/titulo-pipe';
import { MascaraEmailPipe } from '../../pipes/mascara-email-pipe';

@Component({
  imports: [
    FormsModule,
    RouterLink,
    DatePipe,
    UpperCasePipe,
    TelefonePipe,
    FormaPagamentoPipe,
    IniciaisPipe,
    DiasParaPipe,
    TituloPipe,
    MascaraEmailPipe,
  ],
  selector: 'app-participantes',
  styleUrl: './participantes.css',
  templateUrl: './participantes.html',
})
export class Participantes {
  private eventoService = inject(EventoService);
  private route = inject(ActivatedRoute);

  formas = FORMAS_PAGAMENTO;

  eventoId = Number(this.route.snapshot.paramMap.get('id'));
  evento: Evento | undefined = this.eventoService.buscarEvento(this.eventoId);
  participantes: Participante[] = this.eventoService.participantesDoEvento(this.eventoId);

  // quando estiver editando guarda o id do participante, senão fica null
  editandoId: number | null = null;

  descricao = '';
  email = '';
  telefone = '';
  formaPagamento: FormaPagamento = '';

  tocado = {
    descricao: false,
    email: false,
    telefone: false,
    formaPagamento: false,
  };

  get erroDescricao() {
    return validarDescricao(this.descricao);
  }

  get erroEmail() {
    return validarEmailParticipante(this.email);
  }

  get erroTelefone() {
    return validarTelefone(this.telefone);
  }

  get erroFormaPagamento() {
    return validarFormaPagamento(this.formaPagamento);
  }

  get temErro() {
    return !!(this.erroDescricao || this.erroEmail || this.erroTelefone || this.erroFormaPagamento);
  }

  salvar() {
    if (this.temErro) {
      return;
    }

    const participante: Participante = {
      id: this.editandoId ?? Date.now(),
      eventoId: this.eventoId,
      descricao: this.descricao.trim(),
      email: this.email.trim(),
      telefone: this.telefone.replace(/\D/g, ''), // guarda só os números
      formaPagamento: this.formaPagamento,
    };

    if (this.editandoId) {
      this.eventoService.editarParticipante(participante);
    } else {
      this.eventoService.adicionarParticipante(participante);
    }

    this.atualizarLista();
    this.limpar();
  }

  editar(p: Participante) {
    this.editandoId = p.id;
    this.descricao = p.descricao;
    this.email = p.email;
    this.telefone = p.telefone;
    this.formaPagamento = p.formaPagamento;
  }

  excluir(p: Participante) {
    if (confirm(`Excluir o participante ${p.descricao}?`)) {
      this.eventoService.excluirParticipante(p.id);
      this.atualizarLista();
      if (this.editandoId === p.id) {
        this.limpar();
      }
    }
  }

  limpar() {
    this.editandoId = null;
    this.descricao = '';
    this.email = '';
    this.telefone = '';
    this.formaPagamento = '';
    this.tocado = {
      descricao: false,
      email: false,
      telefone: false,
      formaPagamento: false,
    };
  }

  private atualizarLista() {
    this.participantes = this.eventoService.participantesDoEvento(this.eventoId);
  }
}
