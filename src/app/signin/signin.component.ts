import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthHttp } from 'angular2-jwt';

import { User } from '../user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user: any;

  constructor(public authHttp: AuthHttp) {}

  ngOnInit() {
  }

  signIn(formData) {
    console.log('SIGN IN FUNCTION!');
    console.log(formData);
    let username = formData;
    this.authHttp.post('api/auth/login', username)
      .subscribe(
        data => this.user = data,
        err => console.log(err),
        () => console.log('Request Complete')
      );
  }

  FBsignIn() {
    console.log('FB SIGN IN');
    this.authHttp.get('api/auth/facebook')
    .subscribe(
      data => this.user = data,
      err => console.log(err),
      () => console.log('Request Complete')
    );
  }

}
