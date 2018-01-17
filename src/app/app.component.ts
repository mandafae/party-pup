import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Party Pup';
  user: any;

  userEmitter(user: any) {
    this.user = user;
  }

  ngAfterViewChecked() {
    //console.log("APP LEVEL USER:", this.user)
  }
}
