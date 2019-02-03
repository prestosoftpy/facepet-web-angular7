import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosListComponent } from './components/eventos-list/eventos-list.component';

import {HomeComponent} from './components/home/home.component';
import {UsuariosComponent} from './components/usuarios-form/usuarios.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { CiudadFormComponent} from './components/ciudad-form/ciudad-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'usuarios-form', component: UsuariosComponent },
  { path: 'usuarios', component: UsuariosListComponent },
  { path: 'ciudades', component: CiudadesComponent},
  { path: 'eventos', component: EventosListComponent },
  { path: 'ciudad-form', component: CiudadFormComponent },
  { path: 'ciudades/edit/:id', component: CiudadFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
