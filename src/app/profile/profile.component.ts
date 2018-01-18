import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userState: any;
  user: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.userState = user;
    });
    this.getUser();
    console.log("PROFILE USER:", this.user);
  }

  async getUser() {
    await this.userService.getUser(this.userState.id).subscribe(user => this.user = user)
  }

  deleteUser() {
    this.userService.deleteUser(this.userState.id);
    this.router.navigate(['']);
  }

}
