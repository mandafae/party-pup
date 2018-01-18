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
    formData.fixed = formData.fixed? true : false;
    formData.play_style = JSON.stringify(formData.play_style);
    formData.fence_required = formData.fence_required? true : false;
    formData.health_issues = formData.health_issues? true : false;
    console.log("UPDATE FORM:", formData)
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
    this.currentDog.play_style = JSON.parse(this.currentDog.play_style);
    console.log("PLAY STYLE:", this.currentDog.play_style)
  }

  goBack(): void {
    this.location.back();
  }

}
