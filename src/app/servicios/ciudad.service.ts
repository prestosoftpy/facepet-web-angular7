import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { catchError, tap } from 'rxjs/operators';


import { Ciudad } from '../modelos/ciudad';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application-json'})
};

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  API_URI = 'https://facepet-api.herokuapp.com';
  selectedCiudad: Ciudad;
  constructor(private http: HttpClient) { }

  getCiudades() {
    return this.http.get(`${this.API_URI}/ciudades`);
  }

  getCiudad(id: string) {
    return this.http.get(`${this.API_URI}/ciudades/${id}`);
  }

  saveCiudad(ciudad: Ciudad) {
    return this.http.post(`${this.API_URI}/ciudades/`, ciudad);
  }

  updateCiudad(id: string|number, updateCiudad: Ciudad) {
    return this.http.put(`${this.API_URI}/ciudades/${id}`, updateCiudad);
  }

  deleteCiudad(id: string) {
    return this.http.delete(`${this.API_URI}/ciudades/${id}`);
  }
}
