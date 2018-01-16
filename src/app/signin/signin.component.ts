import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthHttp } from 'angular2-jwt';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from "angular4-social-login";

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService
    ) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    location.pathname = '4/dashboard';
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.userService.FBgetUser(user)
        .subscribe(user => this.user = user);
          console.log("USER:", this.user)
      location.pathname = `${this.user.id}/dashboard`;
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit() {
  }



  // signIn(formData) {
  //   console.log('SIGN IN FUNCTION!');
  //   console.log(formData);
  //   let username = formData;
  //   this.http.post('auth/login', username)
  //     .subscribe(
  //       data => this.user = data,
  //       err => console.log(err),
  //       () => console.log('Request Complete')
  //     );
  // }
  //
  // FBsignIn() {
  //   console.log('FB SIGN IN');
  //   this.http.get('auth/facebook')
  //   .subscribe(
  //     data => {
  //       console.log(data)
  //       this.user = data;
  //       location.pathname = "/dashboard";
  //     },
  //     err => console.log(err),
  //     () => console.log('Request Complete')
  //   );
  // }

}
