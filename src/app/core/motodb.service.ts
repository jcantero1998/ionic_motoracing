import { IMoto } from '../share/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MotodbService {
  private motosUrl = 'api/motos';

  constructor(private http: HttpClient) { }

  getMotos(): Observable<IMoto[]> {
    return this.http.get<IMoto[]>(this.motosUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getMaxMotoId(): Observable<IMoto> {
    return this.http.get<IMoto[]>(this.motosUrl)
    .pipe(
      // Get max value from an array
      map(data => Math.max.apply(Math, data.map(function(o) { return o.id; }))   ),
      catchError(this.handleError)
    );
  }

  getMotoById(id: number): Observable<IMoto> {
    const url = `${this.motosUrl}/${id}`;
    return this.http.get<IMoto>(url)
      .pipe(
        tap(data => console.log('getMoto: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createMoto(moto: IMoto): Observable<IMoto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    moto.id = null;
    return this.http.post<IMoto>(this.motosUrl, moto, { headers: headers })
      .pipe(
        tap(data => console.log('createMoto: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteMoto(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.motosUrl}/${id}`;
    return this.http.delete<IMoto>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteMoto: ' + id)),
        catchError(this.handleError)
      );
  }

  updateMoto(moto: IMoto): Observable<IMoto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.motosUrl}/${moto.id}`;
    return this.http.put<IMoto>(url, moto, { headers: headers })
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
