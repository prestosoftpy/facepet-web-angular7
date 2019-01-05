import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosListComponent } from './eventos-list/eventos-list.component';

const routes: Routes = [
 
  { path: 'eventos', component: EventosListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
