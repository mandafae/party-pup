import { Component, OnInit } from '@angular/core';

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
    private dogsService: DogsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.userState = user;
    });
    console.log("ADD DOG USER:", this.userState);
  }

  addDog(formData) {
    formData.owner_id = this.userState.id;
    formData.fixed = formData.fixed? true : false;
    formData.fence_required = formData.fence_required? true : false;
    formData.health_issues = formData.health_issues? true : false;
    console.log(formData)
    this.dogsService.postDog(formData).subscribe((dog) => {
        console.log(dog)
      });
  }

}
