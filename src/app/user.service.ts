import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private usersUrl = 'api/users';

  getUser (id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`
    return this.http.get<User>(url)
  }

  constructor(
    private http: HttpClient,
  ) { }

}
