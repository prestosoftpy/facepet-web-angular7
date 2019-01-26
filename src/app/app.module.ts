import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { CloudinaryModule, CloudinaryConfiguration, provideCloudinary } from '@cloudinary/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios-form/usuarios.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { EventosListComponent } from './eventos-list/eventos-list.component';
import { EventosFormComponent } from './eventos-form/eventos-form.component';
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
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // CloudinaryModule
  ],
  // providers: [provideCloudinary(require('cloudinary-core'), { cloud_name: 'facepet-upload' } as CloudinaryConfiguration)],
  bootstrap: [AppComponent],
})
export class AppModule { }
