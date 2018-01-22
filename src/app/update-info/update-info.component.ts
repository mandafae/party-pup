import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {
  userState: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => this.userState = user)
  }

  updateInfo(formData) {
    // Build data to send to database
    let id = this.userState.id;
    formData.id = id;
    // Send to database, update user state, and redirect back to profile
    this.userService.editUser(formData).subscribe((user) => {
      this.userState = user[0];
      this.userService.setState(this.userState);
      this.router.navigate([`${this.userState.id}/profile`])
    })
  }

  goBack(): void {
    this.location.back();
  }

}
