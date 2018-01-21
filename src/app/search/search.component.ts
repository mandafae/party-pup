import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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
  noResults: boolean = false;
  searchResults: any;

  constructor(
    private location: Location,
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
      if (this.searchResults.length === 0) {
        this.noResults = true;
      }
    })
  }

  goBack(): void {
    this.location.back();
  }

}
