import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosListComponent } from './eventos-list/eventos-list.component';

import {HomeComponent} from './home/home.component';
import {UsuariosComponent} from './usuarios-form/usuarios.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { CiudadFormComponent} from './ciudad-form/ciudad-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'usuarios-form', component: UsuariosComponent },
  { path: 'usuarios', component: UsuariosListComponent },
  { path: 'ciudades', component: CiudadesComponent},
  { path: 'eventos', component: EventosListComponent },
  { path: 'ciudad-form', component: CiudadFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
