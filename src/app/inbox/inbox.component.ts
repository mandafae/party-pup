import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  userState: any;
  messages: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      this.userState = user;
      this.userService.getMessages(this.userState.id).subscribe(messages => {
          this.messages = messages;
        });
    });
  }

  ngAfterContentChecked() {
    console.log("INBOX USER:", this.userState);
    console.log("MESSAGES:", this.messages)
  }

}
