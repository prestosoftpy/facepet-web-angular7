import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Adopcion} from '../adopcion';


const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application-json'})
};

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  API_URI = '//localhost:3000';
  selectedAdopcion: Adopcion;
  constructor(private http: HttpClient) { }

  getAdopciones() {
    return this.http.get(`${this.API_URI}/adopciones`);
  }

  getAdopcion(id: string) {
    return this.http.get(`${this.API_URI}/adopciones/${id}`);
  }

  saveAdopcion(ciudad: Adopcion) {
    return this.http.post(`${this.API_URI}/adopciones/`, ciudad);
  }

  updateAdopcion(id: string|number, updateAdopcion: Adopcion) {
    return this.http.put(`${this.API_URI}/adopciones/${id}`, updateAdopcion);
  }

  deleteAdopcion(id: number) {
    return this.http.delete(`${this.API_URI}/adopciones/${id}`);
  }
}
