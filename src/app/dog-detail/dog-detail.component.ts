import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dog } from '../dog';
import { DogsService } from '../dogs.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dog-detail',
  templateUrl: './dog-detail.component.html',
  styleUrls: ['./dog-detail.component.css']
})
export class DogDetailComponent implements OnInit {
  dog: any;
  userState: any;

  constructor(
    private route: ActivatedRoute,
    private dogsService: DogsService,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    // Get user info
    this.userService.currentUser.subscribe((user) => {
      this.userState = user;
      console.log("DETAIL USER:", this.userState);
    });
    // Get dog info
    const dog_id = +this.route.snapshot.paramMap.get('dog_id');
    console.log("DOG_ID:", dog_id)
    this.dogsService.getDog(dog_id).subscribe(dog => {
        this.dog = dog
        this.dog.play_style = JSON.parse(this.dog.play_style);
      });
  }

  goBack(): void {
    this.location.back();
  }

}
