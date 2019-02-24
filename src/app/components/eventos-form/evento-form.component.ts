import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
// import {Observable} from 'rxjs';
// import {debounceTime, map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

import { ToastrService } from 'ngx-toastr';
import { EventoService } from '../../servicios/evento.service';
import { CiudadService } from '../../servicios/ciudad.service';

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
    ciudad: {},
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
  ciudades: any = [];

  constructor(private eventoService: EventoService, private activedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService, private ciudadService: CiudadService) { }

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
    this.getCiudades();
  }

  getCiudades() {
    this.ciudadService.getCiudades().subscribe(
      res => {
        this.ciudades = res;
      },
      err => console.error(err)
    );
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

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<any>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => {
        if (term === '') {
          return this.ciudades;
        } else {
          return this.ciudades.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
        }
      })
    );
  }
  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     map(term => term === '' ? []
  //       : this.ciudades.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  //   )

  formatterCiudad = (item: { nombre: string }) => item.nombre;

  selectedItemCiudad = buscadorCiudad => {
    this.evento.ciudadId = buscadorCiudad.item.id;
  }
}