import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: Usuario = {
    id: 0,
    nombre: '',
    ciudadId: 0,
    correo: '',
    clave: '',
    celular: '',

  };

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  consultar() {
    if (this.validForm()) {
      this.usuarioService.getLogIn(this.usuario)
        .subscribe(
          result => {
            console.log(result);
            if (result) {
              this.toastr.success('Logeado con Exito', 'Log in');
              this.router.navigate(['eventos']);
            } else {
              this.toastr.error('Correo o clave incorrecto');
            }
          },
          error => {
            console.error(error);
          }
        );
    }
  }

  validForm(): boolean {
    if (this.usuario.correo === '' ) {
      this.toastr.error('Complete el correo');
      return false;
    }
    if (this.usuario.clave === '') {
      this.toastr.error('Complete el clave');
      return false;
    }
    return true;
  }

}
