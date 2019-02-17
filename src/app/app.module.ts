import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios-form/usuarios.component';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { EventosListComponent } from './components/eventos-list/eventos-list.component';
import { EventoFormComponent } from './components/eventos-form/evento-form.component';
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
    EventoFormComponent,
    CiudadFormComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2CloudinaryModule,
    FileUploadModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
