import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  keyword: any;

  constructor(private userService: ApiUsersService,
              private route: Router,
              private apiFile: ApiFilesService) { }

  ngOnInit(): void {
    if (this.userService.getToken() && this.userService.tokenExpired() == false) {
      this.logged = false;
    } else
      {this.logged = true;}
    this.keyword = new FormGroup({
      keyword: new FormControl('', [Validators.required])
    })
  }

  submitSearch() {
    // console.log(this.keyword);
    if (this.keyword.value.keyword != '') {
      // this.apiFile.search = this.keyword;
      this.route.navigate(['result']);
    }
  }


}
