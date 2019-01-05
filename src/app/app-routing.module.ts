import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosListComponent }      from './usuarios-list/usuarios-list.component';

const routes: Routes = [
  { path: 'usuarios', component: UsuariosListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
