import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.userState = user;
      const sender_id = +this.route.snapshot.paramMap.get('sender_id');
      this.viewMessageThread(sender_id);
    });
  }

  viewMessageThread(sender_id) {
    const receiver_id = this.userState.id;
    this.userService.getMessageThread(sender_id, receiver_id).subscribe(messages => {
      this.messages = messages;
    })
  }

 submitMessage(message) {
   // Build message to send to database
    message.sender_id = this.userState.id;
    message.receiver_id = +this.route.snapshot.paramMap.get('sender_id');
    message.created_at = Date.now();
    // Send message to database
    this.userService.sendMessage(message).subscribe(res => {
      // Retrieve updated message thread
      this.userService.getMessageThread(this.userState.id, message.receiver_id).subscribe((data) => {
        this.messages = data;
      })
    })
  }

  goBack(): void {
    this.location.back();
  }

}
