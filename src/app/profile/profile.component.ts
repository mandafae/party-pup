import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { JsonPipe } from '@angular/common';

import { User } from '../user';
import { UserService } from '../user.service';
import { DogsService } from '../dogs.service';

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
    private dogsService: DogsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Get user from user service
    this.userService.currentUser.subscribe((user) => {
      this.userState = user;
      // Get dogs for current user (profile route)
      this.userService.getUser(this.userState.id).subscribe(user => {
        this.user = user
        // Parse each dog's play styles
        this.user.dogs.forEach(dog => {
          dog.play_style = JSON.parse(dog.play_style);
        });
      })
    });
  }

  getUser() {
    this.userService.getUser(this.userState.id).subscribe(user => this.user = user)
  }

  deleteUser() {
    this.userService.deleteUser(this.userState.id);
    this.userService.setState(null);
    this.router.navigate(['']);
  }

  deleteDog(dog_id) {
    this.dogsService.deleteDog(dog_id);
    this.router.navigate([`${this.userState.id}/profile`]);
    this.getUser();
  }

}
