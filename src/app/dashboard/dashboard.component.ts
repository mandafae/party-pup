import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  user: User;

  constructor(
    private route: ActivatedRoute,
    private dogsService: DogsService,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDogs();
    this.getUser();
  }

  getDogs(): void {
    this.dogsService.getDogs()
      .subscribe(dogs => this.dogs = dogs);
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
        console.log("DASHBOARD USER:", this.user);
      })
  }

}
