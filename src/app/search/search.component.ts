import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { DogsService } from '../dogs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private userService: UserService,
    private dogService: DogsService
  ) { }

  ngOnInit() {
  }

  search(formData) {
    console.log(formData);
  }

}
