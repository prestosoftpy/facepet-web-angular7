import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '../../modelos/evento';
import { EventoService } from '../../servicios/evento.service';

@Component({
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.component.html',
  styleUrls: ['./eventos-list.component.css']
})
export class EventosListComponent implements OnInit {

  eventos: Evento[];

  constructor(private eventoService: EventoService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos(): void {
    this.eventoService.getEventos()
    .subscribe(result => this.eventos = result);
  }

  adoptar(id) {
    if (window.confirm('Desea adoptar esta mascota?')) {
      const situacion = 1;
      const usuarioIdAdoptador = 1;
      this.update(id, {id, situacion, usuarioIdAdoptador} as Evento);
    }
  }

  update(id: number, evento: Evento): void {
    this.eventoService.updateEvento(id, evento).subscribe(result => {
      this.toastr.success('Gracias, su solicitud está siendo procesada!', 'Solicitud de adopción');
      this.getEventos();
    });
  }

}
