import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
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
  user: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
    ) { }

  signIn(formData) {
    console.log('SIGN IN FUNCTION!');
    console.log(formData);
    this.http.post('auth/login', formData)
      .subscribe((data) => {
        this.user = data;
        this.router.navigate([`${this.user.id}/dashboard`])
      });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    //location.pathname = '4/dashboard';
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.userService.FBgetUser(user).subscribe((user) => {
        this.user = user;
        console.log("FB SIGN IN USER:", this.user)
        this.router.navigate([`${this.user.id}/dashboard`])
      });
    });
  }

  ngOnInit() {
  }

}
