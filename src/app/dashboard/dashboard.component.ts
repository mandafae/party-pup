import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Dog } from '../dog';
import { DogsService } from '../dogs.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dogs: Dog[];
  userState: User;

  constructor(
    private dogsService: DogsService,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => this.userState = user)
    this.getDogs();
  }

  getDogs(): void {
    this.dogsService.getDogs()
      .subscribe(dogs => this.dogs = dogs);
  }

}
