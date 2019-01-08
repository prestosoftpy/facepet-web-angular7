import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application-json'})
};

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(
    private http: HttpClient) { }

    getCiudades(): Observable<any>{
      return this.http.get('http://localhost:3000/ciudades');
    }
}
