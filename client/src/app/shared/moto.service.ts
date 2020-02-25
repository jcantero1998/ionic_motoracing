import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Moto } from './moto';

@Injectable({
  providedIn: 'root'
})
export class MotoService {
  //private motosUrl = 'api/motos';
  private motosUrl = '127.0.0.1:8101/motos';

  constructor(private http: HttpClient) { }

  getMotos(): Observable<Moto[]> {
    return this.http.get<Moto[]>(this.motosUrl)
      .pipe(
        tap(data =>{
           console.log(JSON.stringify(data));
           }  ),
        catchError(this.handleError)
      );
  }

  getMaxMotoId(): Observable<Moto> {
    return this.http.get<Moto[]>(this.motosUrl)
    .pipe(
      // Get max value from an array
      map(data => Math.max.apply(Math, data.map(function(o) { return o.id; }))   ),
      catchError(this.handleError)
    );
  }

  getMotoById(id: number): Observable<Moto> {
    const url = `${this.motosUrl}/${id}`;
    return this.http.get<Moto>(url)
      .pipe(
        tap(data => console.log('getMoto: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createMoto(moto: Moto): Observable<Moto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    moto.id = null;
    return this.http.post<Moto>(this.motosUrl, moto, { headers: headers })
      .pipe(
        tap(data => console.log('createMoto: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteMoto(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.motosUrl}/${id}`;
    return this.http.delete<Moto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteMoto: ' + id)),
        catchError(this.handleError)
      );
  }

  updateMoto(moto: Moto): Observable<Moto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.motosUrl}/${moto.id}`;
    return this.http.put<Moto>(url, moto, { headers: headers })
      .pipe(
        tap(() => console.log('updateMoto: ' + moto.id)),
        // Return the moto on an update
        map(() => moto),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}