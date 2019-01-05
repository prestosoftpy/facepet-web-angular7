import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CiudadesComponent }  from './ciudades/ciudades.component';

const routes: Routes = [
  { path: 'ciudades', component: CiudadesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
