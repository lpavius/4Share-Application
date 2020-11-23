import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiUsersService } from '../api-users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  logged: boolean;

  constructor(private userService: ApiUsersService) { }

  ngOnInit(): void {
    if (this.userService.getToken() && this.userService.tokenExpired() == false) {
      this.logged = false;
    } else
      this.logged = true;
  }
}
