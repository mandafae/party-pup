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
  index: number;
  currentDog: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService,
    private dogsService: DogsService
  ) { }

  ngOnInit(): void {
    this.dog_id = this.route.snapshot.paramMap.get('dog_id');
    this.userService.currentUser.subscribe((user) => {
      this.userState = user;
    });
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.userState.id).subscribe(user => this.userState = user)
  }

  updateDogInfo(formData) {
    formData.id = this.currentDog.id;
    this.dogsService.editDog(formData).subscribe((dog) => {
      this.router.navigate([`${this.userState.id}/profile`])
    })
  }

  ngAfterContentChecked() {
    // console.log("UPDATE DOG USER:", this.userState);
    // console.log("DOG ID:", this.dog_id);
    // console.log("CURRENT DOG:", this.currentDog);
    // console.log("THIS.USERSTATE.DOGS:", this.userState.dogs);
    this.currentDog = this.userState.dogs.find((dogs) => {
      return dogs.id == this.dog_id;
    })
  }

  goBack(): void {
    this.location.back();
  }

}
