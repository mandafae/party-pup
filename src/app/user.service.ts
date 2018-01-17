import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  user: User;
  private usersUrl = 'api/users';
  private userState = new BehaviorSubject<User>(null);
  currentUser = this.userState.asObservable();

  setState(user: any) {
    this.userState.next(user);
  }

  // postUser (user: User): Observable<User> {
  //   return this.http.post<User>(this.usersUrl, user, httpOptions)
  // }

  getUser (id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`
    return this.http.get<User>(url)
      .pipe(
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  FBgetUser(user: any): Observable<User> {
    return this.http.post<User>(`auth/facebook/${user.id}`, user, httpOptions)
      .pipe(
        catchError(this.handleError<User>('FBgetUser'))
      );
  }

  // editUser (user: User): Observable<any> {
  //   const url = `${this.usersUrl}/${id}`
  //   return this.http.patch(url, user, httpOptions)
  // }
  //
  // deleteUser (id: number): Observable<User> {
  //   const url = `${this.usersUrl}/${id}`
  //   return this.http.delete<User>(url)
  // }

  // Error handling
  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    //this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}

  constructor(
    private http: HttpClient
  ) { }

}
