import { Component, OnInit } from '@angular/core';
import { CiudadService } from '../../servicios/ciudad.service';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  ciudades: any = [];
  toastr: any;
  constructor(private ciudadService: CiudadService) { }

  ngOnInit() {
    this.getCiudad();
  }

  getCiudad() {
    this.ciudadService.getCiudades().subscribe(
      res => {
        this.ciudades = res;
      },
      err => console.error(err)
    );
  }

  borrarCiudad(id: number) {
    if (window.confirm('Desea borrar esta ciudad?')) {
    this.ciudadService.deleteCiudad(id).subscribe(
      res => {
        console.log(res);
        this.getCiudad();
      },
      err => console.log(err)
    );
  }
}

}
