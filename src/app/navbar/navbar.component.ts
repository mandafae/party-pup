import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService, SocialUser } from "angular4-social-login";

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userState: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.userState = user)
    console.log("NAVBAR this.userState:", this.userState)
  }

  signOut(): void {
    this.authService.signOut();
    this.userService.setState(null);
    this.router.navigate(['']);
  }

  ngOnDestroy() {
  }

}
