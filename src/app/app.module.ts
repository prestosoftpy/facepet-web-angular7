import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios-form/usuarios.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { EventosListComponent } from './eventos-list/eventos-list.component';
import { EventosFormComponent } from './eventos-form/eventos-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsuariosComponent,
    UsuariosListComponent,
    CiudadesComponent,
    EventosListComponent,
    EventosFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
