import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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
  userState: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
    ) { }

  signIn(formData) {
    this.http.post('auth/login', formData).subscribe((user) => {
        this.userState = user;
        console.log("SIGNIN this.userState:", this.userState)
        this.userService.setState(this.userState);
        this.router.navigate([`${this.userState.id}/dashboard`])
      });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.userService.googleGetUser(user).subscribe((user) => {
        this.userState = user;
        this.userService.setState(this.userState);
        console.log("GOOGLE SIGN IN USER:", this.userState)
        this.router.navigate([`${this.userState.id}/dashboard`])
      });
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.userService.FBgetUser(user).subscribe((user) => {
        this.userState = user;
        this.userService.setState(this.userState);
        console.log("FB SIGN IN USER:", this.userState)
        this.router.navigate([`${this.userState.id}/dashboard`])
      });
    });
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.userState = user)
  }

}
