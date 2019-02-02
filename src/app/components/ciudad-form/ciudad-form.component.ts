import { Component, OnInit } from '@angular/core';
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

  imagenUrlDefault = 'https://myaco.lemans.org/GED/content/4805C9CE-ECF4-4232-AEF4-3580948695DC.jpg';

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
  sw : boolean = false;

  constructor(private ciudadService: CiudadService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = file => {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
      this.setPreview(file);
      this.sw = true;
    };

  }

  public setPreview(file) {
    file.withCredentials = false;
    let fr = null;
    fr = new FileReader();
    fr.onload = () => {
      this.ciudad.imagenUrl = fr.result;
    }
    fr.readAsDataURL(file._file);

  }

  add() {
    this.ciudadService.saveCiudad(this.ciudad)
      .subscribe(
        result => {
          console.log("ciudad", result);
          this.toastr.success("Registro guardado con éxito", 'Creación de ciudad');
          this.router.navigate(['ciudades']);
        },
        error => {
          console.error(error);
        }
      );
  }

  save() {
    if (this.validForm()) {
        this.loading = true;
        this.uploader.uploadAll();
        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
          let result: any = JSON.parse(response);
          console.log(result);
          this.ciudad.imagenUrl = result.url;
          this.add();
        }
        this.uploader.onErrorItem = function (fileItem, response, status, headers) {
          console.info('onErrorItem', fileItem, response, status, headers);
        };
    }
  }

  validForm(): boolean {
    if (this.ciudad.nombre == '') {
      this.toastr.error("Complete el nombre");
      return false;
    }
    if (this.sw == false) {
      this.toastr.error("Cargue una imagen válida!");
      return false;
    }
    return true;
  }
}
