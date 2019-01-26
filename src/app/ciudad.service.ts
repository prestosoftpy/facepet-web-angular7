import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { catchError, tap } from 'rxjs/operators';


import { Ciudad } from './ciudad';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application-json'})
};

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private ciudadesUrl = 'https://facepet-api.herokuapp.com/ciudades';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    getCiudades(): Observable<any> {
      return this.http.get('https://facepet-api.herokuapp.com/ciudades');
    }

  addCiudad (ciudad: Ciudad): Observable<any> {
    return this.http.put(this.ciudadesUrl, ciudad, httpOptions).pipe(
      tap(_ => this.log(`added ciudad id=${ciudad.id}`)),
      catchError(this.handleError<any>('addciudad'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`CiudadService: ${message}`);
  }
}
