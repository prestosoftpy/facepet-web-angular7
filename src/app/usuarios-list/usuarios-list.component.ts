import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';

import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios()
    .subscribe(usuarios => this.usuarios = usuarios);
    console.log(this.usuarios)
  }


  add(nombre: string): void {
    nombre = nombre.trim();
    if (!nombre) { return; }
    this.usuarioService.addUsuario({ nombre } as Usuario)
      .subscribe(usuario => {
        this.usuarios.push(usuario);
      });
  }
  
git
  delete(usuario: Usuario): void {
    this.usuarios = this.usuarios.filter(h => h !== usuario);
    this.usuarioService.deleteUsuario(usuario).subscribe();
  }

}
