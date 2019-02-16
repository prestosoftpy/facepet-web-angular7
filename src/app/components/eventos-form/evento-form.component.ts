import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

import { ToastrService } from 'ngx-toastr';
import { EventoService } from '../../servicios/evento.service';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {

  imagenUrlDefault = 'https://myaco.lemans.org/GED/content/4805C9CE-ECF4-4232-AEF4-3580948695DC.jpg';

  evento: any = {
    id: 0,
    nombre: '',
    descripcion: '',
    ciudadId: 0,
    latitud: 0,
    longitud: 0,
    imagenUrl: this.imagenUrlDefault,
    usuarioId: 1,
    activo: null
  };

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'facepet-upload', uploadPreset: 'j279gbw1' })
  );

  loading: any;
  ActivedRoute: any;
  sw: boolean = false;

  constructor(private eventoService: EventoService, private activedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.eventoService.getEvento(params.id)
        .subscribe(
          res => {
            this.evento = res;
          },
          err => console.error(err)
        );
    }
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
      this.evento.imagenUrl = fr.result;
    };
    fr.readAsDataURL(file._file);
  }

  add() {
    this.eventoService.addEvento(this.evento)
      .subscribe(
        result => {
          this.toastr.success('Registro guardado con éxito', 'Creación de evento');
          this.router.navigate(['eventos']);
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
        const result: any = JSON.parse(response);
        this.evento.imagenUrl = result.url;
        const params = this.activedRoute.snapshot.params;
        if (params.id) {
          this.update();
        } else {
          this.add();
        }
      };
      this.uploader.onErrorItem = function (fileItem, response, status, headers) {
        // tslint:disable-next-line:no-console
        console.info('onErrorItem', fileItem, response, status, headers);
      };
    }
  }


  validForm(): boolean {
    if (this.evento.nombre === '') {
      this.toastr.error('Complete el nombre');
      return false;
    }
    if (this.evento.descripcion === '') {
      this.toastr.error('Complete el descripcion');
      return false;
    }
    if (this.evento.ciudadId === 0) {
      this.toastr.error('Complete la ciudad');
      return false;
    }
    if (this.evento.latitud === 0) {
      this.toastr.error('Complete la latitud');
      return false;
    }
    if (this.evento.longitud === 0) {
      this.toastr.error('Complete la longitud');
      return false;
    }
    if (this.sw === false) {
      this.toastr.error('Cargue una imagen válida!');
      return false;
    }
    return true;
  }

  update() {
    this.eventoService.updateEvento(this.evento.id, this.evento)
      .subscribe(
        res => {
          this.router.navigate(['/eventos']);
        },
        err => console.error(err)
      );
  }
}