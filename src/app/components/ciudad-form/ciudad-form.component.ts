import { Component, OnInit, HostBinding } from '@angular/core';
import { Ciudad } from '../../modelos/ciudad';
import { CiudadService } from '../../servicios/ciudad.service';
import { CuidadesService } from '../../cuidad.service';

@Component({
  selector: 'app-ciudad-form',
  templateUrl: './ciudad-form.component.html',
  styleUrls: ['./ciudad-form.component.css']
})
export class CiudadFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  ciudad: Ciudad = {
    id: 0,
    nombre: '',
    imagenUrl: ''
  };

  constructor(private CuidadService: CiudadService) { }

  ngOnInit() {
  }

  GuardarNuevaCiudad() {
    delete this.ciudad.id;
  this.CuidadService.saveCiudad(this.ciudad)
 .subscribe(
   res => {
     console.log(res);
   },
   err => console.error(err)
 );
  }
}
