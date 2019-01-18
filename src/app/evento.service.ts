import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Evento } from './evento';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class EventoService {

  private eventosUrl = 'api/eventos';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getEventos(): Observable<any> {
    return this.http.get('https://facepet-api.herokuapp.com/eventos');
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Evento> {
    const url = `${this.eventosUrl}/?id=${id}`;
    return this.http.get<Evento[]>(url)
      .pipe(
        map(eventos => eventos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} evento id=${id}`);
        }),
        catchError(this.handleError<Evento>(`getEvento id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getEvento(id: number): Observable<Evento> {
    const url = `${this.eventosUrl}/${id}`;
    return this.http.get<Evento>(url).pipe(
      tap(_ => this.log(`fetched evento id=${id}`)),
      catchError(this.handleError<Evento>(`getEvento id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchEventos(term: string): Observable<Evento[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Evento[]>(`${this.eventosUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Evento[]>('searchEventos', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addEvento (evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.eventosUrl, evento, httpOptions).pipe(
      tap((evento: Evento) => this.log(`added evento w/ id=${evento.id}`)),
      catchError(this.handleError<Evento>('addEvento'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteEvento (evento: Evento | number): Observable<Evento> {
    const id = typeof evento === 'number' ? evento : evento.id;
    const url = `${this.eventosUrl}/${id}`;

    return this.http.delete<Evento>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted evento id=${id}`)),
      catchError(this.handleError<Evento>('deleteEvento'))
    );
  }

  /** PUT: update the hero on the server */
  updateEvento (evento: Evento): Observable<any> {
    return this.http.put(this.eventosUrl, evento, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${evento.id}`)),
      catchError(this.handleError<any>('updateEvento'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EventoService: ${message}`);
  }
}
