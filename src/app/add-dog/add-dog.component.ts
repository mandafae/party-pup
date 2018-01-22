import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';
import { DogsService } from '../dogs.service';

@Component({
  selector: 'app-add-dog',
  templateUrl: './add-dog.component.html',
  styleUrls: ['./add-dog.component.css']
})
export class AddDogComponent implements OnInit {
  userState: any;

  constructor(
    private router: Router,
    private location: Location,
    private dogsService: DogsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.userState = user;
    });
  }

  addDog(formData) {
    // Build data for database
    formData.owner_id = this.userState.id;
    formData.fixed = formData.fixed? true : false;
    formData.play_style = JSON.stringify(formData.play_style);
    formData.fence_required = formData.fence_required? true : false;
    formData.health_issues = formData.health_issues? true : false;
    // Send to database and route back to profile
    this.dogsService.postDog(formData).subscribe((dog) => {
      this.router.navigate([`${this.userState.id}/profile`])
    });
  }

  goBack(): void {
    this.location.back();
  }

}
