import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';
import { DogsService } from '../dogs.service';

@Component({
  selector: 'app-update-dog',
  templateUrl: './update-dog.component.html',
  styleUrls: ['./update-dog.component.css']
})
export class UpdateDogComponent implements OnInit {
  userState: any;
  dog_id: any;
  currentDog: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService,
    private dogsService: DogsService
  ) { }

  ngOnInit(): void {
    // Get dog id from activated route
    this.dog_id = this.route.snapshot.paramMap.get('dog_id');
    // Get user from user service
    this.userService.currentUser.subscribe((user) => {
      this.userState = user;
      // Get user's dogs (profile route)
      this.userService.getUser(this.userState.id).subscribe(user => {
        this.userState = user
        // Get the current dog
        this.currentDog = this.userState.dogs.find((dogs) => {
          return dogs.id == this.dog_id;
        })
        // Parse the dog's play styles
        this.currentDog.play_style = JSON.parse(this.currentDog.play_style);
      })
    });
  }

  getUser() {
    this.userService.getUser(this.userState.id).subscribe(user => this.userState = user)
  }

  updateDogInfo(formData) {
    // Build the updated information for the database
    formData.id = this.currentDog.id;
    formData.fixed = formData.fixed? true : false;
    formData.play_style = JSON.stringify(formData.play_style);
    formData.fence_required = formData.fence_required? true : false;
    formData.health_issues = formData.health_issues? true : false;
    console.log("UPDATE FORM:", formData)
    // Send form data to database and redirect back to profile
    this.dogsService.editDog(formData).subscribe((dog) => {
      this.router.navigate([`${this.userState.id}/profile`])
    })
  }

  goBack(): void {
    this.location.back();
  }

}
