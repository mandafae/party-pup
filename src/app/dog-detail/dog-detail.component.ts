import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dog } from '../dog';
import { DogsService } from '../dogs.service';

@Component({
  selector: 'app-dog-detail',
  templateUrl: './dog-detail.component.html',
  styleUrls: ['./dog-detail.component.css']
})
export class DogDetailComponent implements OnInit {
  @Input() dog: Dog;

  constructor(
    private route: ActivatedRoute,
    private dogsService: DogsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDog();
  }

  getDog(): void {
    const owner_id = +this.route.snapshot.paramMap.get('owner_id');
    const dog_id = +this.route.snapshot.paramMap.get('dog_id');
    this.dogsService.getDog(owner_id, dog_id)
      .subscribe(dog => this.dog = dog);
  }

  goBack(): void {
    this.location.back();
  }

}
