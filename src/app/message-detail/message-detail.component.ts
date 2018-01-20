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

  ngAfterContentChecked() {
    console.log("DETAIL USER:", this.userState);
    console.log("MESSAGES:", this.messages)
  }

  goBack(): void {
    this.location.back();
  }

}
