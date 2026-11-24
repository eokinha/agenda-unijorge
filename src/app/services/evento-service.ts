import { Service } from '@angular/core';
import { Evento } from '../models/evento';
import { Participante } from '../models/participante';

// como não temos API, os dados ficam salvos no localStorage do navegador
const CHAVE_EVENTOS = 'agenda-eventos';
const CHAVE_PARTICIPANTES = 'agenda-participantes';

@Service()
export class EventoService {
  private eventos: Evento[] = this.ler<Evento>(CHAVE_EVENTOS);
  private participantes: Participante[] = this.ler<Participante>(CHAVE_PARTICIPANTES);

  // ---------- eventos ----------

  listarEventos(): Evento[] {
    return this.eventos;
  }

  buscarEvento(id: number): Evento | undefined {
    return this.eventos.find((e) => e.id === id);
  }

  adicionarEvento(evento: Evento) {
    this.eventos.push(evento);
    this.salvar(CHAVE_EVENTOS, this.eventos);
  }

  excluirEvento(id: number) {
    this.eventos = this.eventos.filter((e) => e.id !== id);
    // se o evento sai, os participantes dele saem junto
    this.participantes = this.participantes.filter((p) => p.eventoId !== id);
    this.salvar(CHAVE_EVENTOS, this.eventos);
    this.salvar(CHAVE_PARTICIPANTES, this.participantes);
  }

  // ---------- participantes ----------

  participantesDoEvento(eventoId: number): Participante[] {
    return this.participantes.filter((p) => p.eventoId === eventoId);
  }

  adicionarParticipante(participante: Participante) {
    this.participantes.push(participante);
    this.salvar(CHAVE_PARTICIPANTES, this.participantes);
  }

  editarParticipante(participante: Participante) {
    const i = this.participantes.findIndex((p) => p.id === participante.id);
    if (i !== -1) {
      this.participantes[i] = participante;
      this.salvar(CHAVE_PARTICIPANTES, this.participantes);
    }
  }

  excluirParticipante(id: number) {
    this.participantes = this.participantes.filter((p) => p.id !== id);
    this.salvar(CHAVE_PARTICIPANTES, this.participantes);
  }

  // ---------- localStorage ----------

  private ler<T>(chave: string): T[] {
    // no servidor (SSR) não existe localStorage
    if (typeof localStorage === 'undefined') {
      return [];
    }
    const texto = localStorage.getItem(chave);
    return texto ? JSON.parse(texto) : [];
  }

  private salvar(chave: string, dados: unknown[]) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(chave, JSON.stringify(dados));
    }
  }
}
