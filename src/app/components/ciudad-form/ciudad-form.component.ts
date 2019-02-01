import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from "@angular/router";
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { ToastrService } from 'ngx-toastr';

import { Ciudad } from '../../modelos/ciudad';
import { CiudadService } from '../../servicios/ciudad.service';

@Component({
  selector: 'app-ciudad-form',
  templateUrl: './ciudad-form.component.html',
  styleUrls: ['./ciudad-form.component.css']
})
export class CiudadFormComponent implements OnInit {

  // @HostBinding('class') classes = 'row';

  imagenUrlDefault = 'https://pbs.twimg.com/profile_images/706996453894447106/iUzEkqtp_400x400.jpg';

  ciudad: Ciudad = {
    id: 0,
    nombre: '',
    imagenUrl: this.imagenUrlDefault,
    activo: null
  };

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'facepet-upload', uploadPreset: 'j279gbw1' })
  );

  loading: any;

  constructor(private ciudadService: CiudadService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = f => {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
    };
  }

  add() {
    // delete this.ciudad.id;
    this.ciudadService.saveCiudad(this.ciudad)
      .subscribe(
        result => {
          console.log(result);
          this.toastr.success("Registro guardado con éxito2", 'Nueva ciudad');
          this.router.navigate(['ciudades']);
        },
        error => {
          console.error(error);
        }
      );
  }

  save() {
    if (this.validForm()) {
      if (this.ciudad.imagenUrl == this.imagenUrlDefault) {
        this.add();
      } else {
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
  }

  validForm(): boolean {
    if (this.ciudad.nombre == '') {
      alert("Complete el nombre");
      return false;
    }
    return true;
  }
}
