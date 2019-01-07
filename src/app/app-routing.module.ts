import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {UsuariosComponent} from './usuarios-calito/usuarios.component';
import { UsuariosListComponent }      from './usuarios-list/usuarios-list.component';
  
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'usuarios', component: UsuariosComponent },
  // { path: '**', pathMatch: 'full', redirectTo: 'home' }
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
