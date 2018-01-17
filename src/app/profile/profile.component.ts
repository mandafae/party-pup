import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.userState = user;
      this.getUser();
      console.log("PROFILE USER:", this.user);
    });
  }

  getUser() {
    this.userService.getUser(this.userState.id).subscribe(user => this.user = user)
  }

  goBack(): void {
    this.location.back();
  }

}
