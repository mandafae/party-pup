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

  private usersUrl = 'api/users';
  private dogsUrl = 'api/dogs';

  getDogs (): Observable<Dog[]> {
    return this.http.get<Dog[]>(this.dogsUrl)
      .pipe(
        catchError(this.handleError('getUser', []))
      );
  }

  getDog (owner_id: number, dog_id: number): Observable<Dog> {
    const url = `${this.usersUrl}/${owner_id}/dogs/${dog_id}`
    return this.http.get<Dog>(url)
      .pipe(
        catchError(this.handleError<Dog>(`getDog id=${dog_id}`))
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
