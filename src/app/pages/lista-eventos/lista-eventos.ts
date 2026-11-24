import { Component, inject } from '@angular/core';
import { DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento-service';
import { DiasParaPipe } from '../../pipes/dias-para-pipe';
import { TituloPipe } from '../../pipes/titulo-pipe';
import { ResumoPipe } from '../../pipes/resumo-pipe';

@Component({
  imports: [RouterLink, DatePipe, UpperCasePipe, DecimalPipe, DiasParaPipe, TituloPipe, ResumoPipe],
  selector: 'app-lista-eventos',
  styleUrl: './lista-eventos.css',
  templateUrl: './lista-eventos.html',
})
export class ListaEventos {
  private eventoService = inject(EventoService);

  eventos: Evento[] = this.eventoService.listarEventos();

  qtdParticipantes(eventoId: number): number {
    return this.eventoService.participantesDoEvento(eventoId).length;
  }

  excluir(evento: Evento) {
    if (confirm(`Excluir o evento "${evento.titulo}" e todos os participantes dele?`)) {
      this.eventoService.excluirEvento(evento.id);
      this.eventos = this.eventoService.listarEventos();
    }
  }
}
