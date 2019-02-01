import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from "@angular/router";
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

import { Ciudad } from '../../modelos/ciudad';
import { CiudadService } from '../../servicios/ciudad.service';

@Component({
  selector: 'app-ciudad-form',
  templateUrl: './ciudad-form.component.html',
  styleUrls: ['./ciudad-form.component.css']
})
export class CiudadFormComponent implements OnInit {

  // @HostBinding('class') classes = 'row';

  ciudad: Ciudad = {
    id: 0,
    nombre: '',
    imagenUrl: '',
    activo: null
  };

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'facepet-upload', uploadPreset: 'j279gbw1' })
  );

  loading: any;

  constructor(private ciudadService: CiudadService, private router: Router) { }

  ngOnInit() {}

  add() {
    // delete this.ciudad.id;
    this.ciudadService.saveCiudad(this.ciudad)
      .subscribe(
        result => {
          console.log(result);
          alert("Registro guardado con éxito!");
          this.router.navigate(['ciudades']);
        },
        error => {
          console.error(error);
        }
      );
  }

  save() {
    this.loading = true;
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res);
      this.ciudad.imagenUrl = res.url;
      this.add();
    }
    this.uploader.onErrorItem = function (fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };
  }
}
