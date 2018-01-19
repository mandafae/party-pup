import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { UserService } from '../user.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {
  userState: any;
  messages: any;

  constructor(
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.userState = user;
    });
  }

  viewMessageThread(sender_id) {
    const receiver_id = this.userState.id;
    this.userService.getMessageThread(sender_id, receiver_id).subscribe(messages => {
      this.messages = messages;
    })
  }

  goBack(): void {
    this.location.back();
  }

}
