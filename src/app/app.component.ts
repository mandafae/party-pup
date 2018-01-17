import { Component, ViewChild } from '@angular/core';

import { SigninComponent } from './signin/signin.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild(SigninComponent)
  // private signin: SigninComponent;
  title = 'Party Pup';
  user: any;

  // userEmitter(user: any) {
  //   this.user = user;
  //   console.log("APP USER:", this.user)
  // }

  ngAfterViewChecked() {
    // console.log("APP LEVEL USER:", this.user)
  }
}
