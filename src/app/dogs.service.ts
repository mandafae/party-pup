import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Dog } from './dog';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DogsService {

  private dogsUrl = 'api/dogs';

  getDogs (): Observable<Dog[]> {
    return this.http.get<Dog[]>(this.dogsUrl)
      .pipe(
        catchError(this.handleError('getUser', []))
      );
  }

  // Error handling
  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    //this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}

  constructor( private http: HttpClient ) { }

}
