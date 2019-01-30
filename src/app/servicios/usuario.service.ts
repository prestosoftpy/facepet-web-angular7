import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Usuario } from '../usuario';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  private usuariosUrl = 'https://facepet-api.herokuapp.com/usuarios';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET usuarios from the server
  getUsuarios (): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuariosUrl)
      .pipe(
        tap(_ => this.log('fetched usuarios')),
        catchError(this.handleError('getUsuarios', []))
      );
  }*/
  getUsuarios(): Observable<any> {
    return this.http.get('https://facepet-api.herokuapp.com/usuarios');
  }

  /** GET usuario by id. Return `undefined` when id not found */
  getUsuarioNo404<Data>(id: number): Observable<Usuario> {
    const url = `${this.usuariosUrl}/?id=${id}`;
    return this.http.get<Usuario[]>(url)
      .pipe(
        map(usuarios => usuarios[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} usuario id=${id}`);
        }),
        catchError(this.handleError<Usuario>(`getUsuario id=${id}`))
      );
  }

  /** GET usuario by id. Will 404 if id not found */
  getUsuario(id: number): Observable<Usuario> {
    const url = `${this.usuariosUrl}/${id}`;
    return this.http.get<Usuario>(url).pipe(
      tap(_ => this.log(`fetched usuario id=${id}`)),
      catchError(this.handleError<Usuario>(`getUsuario id=${id}`))
    );
  }

  /* GET usuarios whose name contains search term */
  searchUsuarios(term: string): Observable<Usuario[]> {
    if (!term.trim()) {
      // if not search term, return empty usuario array.
      return of([]);
    }
    return this.http.get<Usuario[]>(`${this.usuariosUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found usuarios matching "${term}"`)),
      catchError(this.handleError<Usuario[]>('searchUsuarios', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addUsuario (usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.usuariosUrl, usuario, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((usuario: Usuario) => this.log(`added usuario w/ id=${usuario.id}`)),
      catchError(this.handleError<Usuario>('addUsuario'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteUsuario (usuario: Usuario | number): Observable<Usuario> {
    const id = typeof usuario === 'number' ? usuario : usuario.id;
    const url = `${this.usuariosUrl}/${id}`;

    return this.http.delete<Usuario>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted usuario id=${id}`)),
      catchError(this.handleError<Usuario>('deleteUsuario'))
    );
  }

  /** PUT: update the hero on the server */
  updateUsuario (usuario: Usuario): Observable<any> {
    return this.http.put(this.usuariosUrl, usuario, httpOptions).pipe(
      tap(_ => this.log(`updated usuario id=${usuario.id}`)),
      catchError(this.handleError<any>('updateUsuario'))
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

  /** Log a usuarioService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UsuarioService: ${message}`);
  }
}
