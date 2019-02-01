import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios-form/usuarios.component';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { EventosListComponent } from './components/eventos-list/eventos-list.component';
import { EventosFormComponent } from './components/eventos-form/eventos-form.component';
import { CiudadFormComponent } from './components/ciudad-form/ciudad-form.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';

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
    CiudadFormComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2CloudinaryModule,
    FileUploadModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
