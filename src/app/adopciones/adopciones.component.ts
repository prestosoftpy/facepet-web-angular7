import { Component, OnInit } from '@angular/core';
import { AdopcionService } from '../servicios/adopcion.service';

@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.component.html',
  styleUrls: ['./adopciones.component.css']
})
export class AdopcionesComponent implements OnInit {

  adopciones: any = [];
  toastr: any;
  constructor(private adopcionService: AdopcionService) { }

  ngOnInit() {
    this.getAdopcion();
  }

  getAdopcion(){
    this.adopcionService.getAdopciones().subscribe(
      res => {
        this.adopciones = res;
      },
      err => console.error(err)
    );
  }

  borrarAdopcion(id: number){
    if(window.confirm('¿Desea borrar la adopción?')){
      this.adopcionService.deleteAdopcion(id).subscribe(
        res => {
          console.log(res);
          this.getAdopcion();
        },
        err => console.log(err)
      );
    }
  }

}
