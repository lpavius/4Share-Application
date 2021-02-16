import { Component, OnInit } from '@angular/core';
import { ApiFilesService } from '../api-files.service';
import { ApiUsersService } from '../api-users.service';
import { Files } from '../models/files';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  files: Files[];

  constructor(private apiFile: ApiFilesService, private apiUser: ApiUsersService) { }

  ngOnInit() {
    this.apiFile.getFiles().subscribe(
      data => {
        console.log(data);
        this.files = data;
      }
    )
  }

  loggedIn(): boolean {
    // return this.apiService.getToken() && this.apiService.getToken().length !== 0;
    if (this.apiUser.getToken() && this.apiUser.tokenExpired() == false) {
      return true;
    }
    return false;
  }

  converterSize(number: number) {
    let num = number / 1000;
    return num.toFixed(2);
  }

}
