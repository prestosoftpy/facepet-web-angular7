import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { ToastrService } from 'ngx-toastr';
import { Ciudad } from '../../modelos/ciudad';
import { CiudadService } from '../../servicios/ciudad.service';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { EmpresaService } from 'src/app/servicios/empresa.service';
@Component({
  selector: 'app-empresas-form',
  templateUrl: './empresas-form.component.html',
  styleUrls: ['./empresas-form.component.css']
})
export class EmpresasFormComponent implements OnInit {

  imagenUrlDefault = 'https://myaco.lemans.org/GED/content/4805C9CE-ECF4-4232-AEF4-3580948695DC.jpg';

  empresa: any = {
    id: 0,
    nombre: '',
    ruc: '',
    telefono: '',
    celular: '',
    direccion: '',
    imagenUrl: '',
    horarios: '',
  };

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'facepet-upload', uploadPreset: 'j279gbw1' })
  );

  loading: any;
  ActivedRoute: any;
  sw = false;

  constructor(private empresaService: EmpresaService, private activedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.empresaService.getEmpresa(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.empresa = res;
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
      this.empresa.imagenUrl = fr.result;
    };
    fr.readAsDataURL(file._file);
  }

  add() {
    this.empresaService.saveEmpresa(this.empresa)
      .subscribe(
        result => {
          console.log('empresa', result);
          this.toastr.success('Registro guardado con éxito', 'Creación de empresa');
          this.router.navigate(['empresas-list']);
        },
        error => {
          console.error(error);
        }
      );
  }
  validForm(): boolean {
    if (this.empresa.nombre === '') {
      this.toastr.error('Complete el nombre');
      return false;
    }
    if (this.sw === false) {
      this.toastr.error('Cargue una imagen válida!');
      return false;
    }
    return true;
  }


  save() {
    if (this.validForm()) {
      this.loading = true;
      this.uploader.uploadAll();
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
        const result: any = JSON.parse(response);
        console.log(result);
        this.empresa.imagenUrl = result.url;
        const params = this.activedRoute.snapshot.params;
        if (params.id) {
          this.updateEmpresa();
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

  updateEmpresa() {
    this.empresaService.updateEmpresa(this.empresa.id, this.empresa)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/empresas']);
        },
        err => console.error(err)
      );
  }
}
