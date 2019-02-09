import { Component, OnInit } from '@angular/core';
import { CiudadService } from '../../servicios/ciudad.service';
import { Ciudad } from 'src/app/modelos/ciudad';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { ToastrService } from 'ngx-toastr';


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
