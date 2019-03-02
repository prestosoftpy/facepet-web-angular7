import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Ciudad } from '../modelos/ciudad';


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

  deleteCiudad(id: number) {
    return this.http.delete(`${this.API_URI}/ciudades/${id}`);
  }
}
