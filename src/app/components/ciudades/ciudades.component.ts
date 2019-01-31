import { Component, OnInit } from '@angular/core';
import { CiudadService } from '../../servicios/ciudad.service';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  ciudades: any = [];
  constructor(private ciudadService: CiudadService) { }

  ngOnInit() {
    this.ciudadService.getCiudades().subscribe(
      res => {
        this.ciudades = res;
      },
      err => console.error(err)
    );
  }
}
