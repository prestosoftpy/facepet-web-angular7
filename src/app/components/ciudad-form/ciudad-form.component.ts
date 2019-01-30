import { Component, OnInit, HostBinding } from '@angular/core';
import { Ciudad } from '../../modelos/ciudad';
import { CiudadService } from '../../servicios/ciudad.service';

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

  constructor(private ciudadService: CiudadService) { }

  ngOnInit() {
  }

  add() {
    delete this.ciudad.id;
    this.ciudadService.saveCiudad(this.ciudad)
      .subscribe(
        result => {
          console.log(result);
          alert("Registro guardado con éxito!");
        },
        error => console.error(error)
      );
  }
}
