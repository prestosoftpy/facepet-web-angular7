import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario.service';
import { AdopcionService } from '../../servicios/adopcion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adopcion-form',
  templateUrl: './adopcion-form.component.html',
  styleUrls: ['./adopcion-form.component.css']
})
export class AdopcionFormComponent implements OnInit {

  myForm: FormGroup;

  adopcion: any = {
    idusuario: 1,
    nombreusuario: '',
    celular: '+5959',
    direccion: '',
    obs: '',
    situacion: 'Pendiente'
  };

  constructor(private adopcionService: AdopcionService, private usuarioService: UsuarioService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getNombreUsuario(this.adopcion.idusuario);
  }

  clearFields(){
      this.adopcion.idusuario = 1,
      this.adopcion.nombreusuario = '',
      this.adopcion.celular = '+5959',
      this.adopcion.direccion = '',
      this.adopcion.obs = ''
  }

  getNombreUsuario(id: number){
    this.usuarioService.getUsuario(id).subscribe(
      res =>{
        this.adopcion.nombreusuario = res.nombre;
      }
    );
  }

  validForm(): boolean{
    if(this.adopcion.idusuario === ''){
      this.toastr.error('Informe del ID de usuario!');
      return false;
    }

    if(this.adopcion.celular === ''){
      this.toastr.error('Complete el campo celular para continuar!');
      return false;
    }

    if(this.adopcion.obs === ''){
      this.toastr.error('Complete el campo observaciones para continuar!');
      return false;
    }

    if(this.adopcion.direccion === ''){
      this.toastr.error('Complete el campo dirección para continuar!');
      return false;
    }
    return true;
  }

  save(){
    if(this.validForm()){
      this.adopcionService.saveAdopcion(this.adopcion).subscribe(
        result => {
          this.toastr.success('Adopción Registrada!', 'Adopción');
          this.clearFields();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

}
