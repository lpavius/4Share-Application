import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiFilesService } from '../api-files.service';
import { ApiUsersService } from '../api-users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  logged: boolean;
  static keyword: string;

  constructor(private userService: ApiUsersService,
              private route: Router,
              private apiFile: ApiFilesService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    /*if (this.userService.getToken() && this.userService.tokenExpired() == false) {
      this.logged = false;
    } else
      {this.logged = true;}*/
    /*SearchComponent.keyword = this.formBuilder.group({
      words: ['', Validators.required]
    })*/
  }

  submitSearch(keyword: NgForm) {
    
    console.log(keyword.value.words);
    if (keyword.value.words != '') {
      console.log(this.route);
      SearchComponent.keyword = keyword.value.words;
      console.log(SearchComponent.keyword);
      this.route.navigate(['/result']);
    }
  }


}
