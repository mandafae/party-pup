import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dog } from '../dog';
import { DogsService } from '../dogs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dogs: Dog[];

  constructor(
    private route: ActivatedRoute,
    private dogsService: DogsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDogs();
  }

  getDogs(): void {
    this.dogsService.getDogs()
      .subscribe(dogs => this.dogs = dogs);
  }

}
