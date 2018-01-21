import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { DogsService } from '../dogs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searching: boolean = true;
  displayResults: boolean = false;
  searchResults: any;

  constructor(
    private userService: UserService,
    private dogsService: DogsService
  ) { }

  ngOnInit() {
  }

  search(formData) {
    this.dogsService.searchDogs(formData).subscribe(dogs => {
      console.log(dogs)
      this.searchResults = dogs;
      this.searching = false;
      this.displayResults = true;
    })
  }

}
