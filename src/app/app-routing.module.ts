import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosListComponent } from './components/eventos-list/eventos-list.component';

import {HomeComponent} from './components/home/home.component';
import {UsuariosComponent} from './components/usuarios-form/usuarios.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { CiudadFormComponent } from './components/ciudad-form/ciudad-form.component';
import { EventoFormComponent } from './components/eventos-form/evento-form.component';
import { AdopcionesComponent } from './adopciones/adopciones.component';
import { AdopcionFormComponent } from './components/adopcion-form/adopcion-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'usuarios', component: UsuariosListComponent },
  { path: 'usuarios-form', component: UsuariosComponent },
  { path: 'ciudades', component: CiudadesComponent},
  { path: 'ciudades-nuevo', component: CiudadFormComponent },
  { path: 'ciudades-editar/:id', component: CiudadFormComponent},
  { path: 'eventos', component: EventosListComponent },
  { path: 'eventos-nuevo', component: EventoFormComponent },
  { path: 'eventos-editar/:id', component: EventoFormComponent},
  { path: 'adopciones', component: AdopcionesComponent},
  { path: 'adopciones-nuevo', component: AdopcionFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
