import { Component, OnInit } from '@angular/core';

import { Ciudad } from '../ciudad';
import { CiudadService } from '../ciudad.service';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  ciudades: Ciudad[];

  constructor(private ciudadService: CiudadService) { }

  ngOnInit() {
    this.getCiudades();
  }

  getCiudades(): void {
    this.ciudadService.getCiudades()
    .subscribe(ciudades => this.ciudades = ciudades);
  }

}
