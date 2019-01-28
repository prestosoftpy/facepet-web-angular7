import { Component, OnInit, Input } from '@angular/core';

import {Ciudad} from '../ciudad';
import { CiudadService } from '../ciudad.service';


@Component({
  selector: 'app-ciudad-form',
  templateUrl: './ciudad-form.component.html',
  styleUrls: ['./ciudad-form.component.css']
})
export class CiudadFormComponent implements OnInit {

  ciudad: Ciudad;

  constructor(private ciudadService: CiudadService) { }

  ngOnInit() {
  }

  add(ciudad: Ciudad): void {
    console.log(ciudad)
    // this.ciudadService.addCiudad(ciudad).subscribe(result => {
    // });
  }
}
