import { Component, OnInit } from '@angular/core';
import { Files } from '../models/files';
import { ApiFilesService } from '../services/api-files.service';
import { ApiUserService } from '../services/api-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  files: Files[];
  url: any;

  constructor(private apiFile: ApiFilesService, private apiUser: ApiUserService) { }

  ngOnInit(): void {
    this.apiUser.loggedOut();
    this.apiFile.getFiles().subscribe(
      data => {
        console.log(data);
        this.files = data;
      }
    )
  }

  loggedIn(): boolean {
    if (this.apiUser.getToken() && this.apiUser.tokenExpired() == false) {
      return true;
    }
    return false;
  }

  converterSize(number: number) {
    let num = number / 1000;
    return num.toFixed(2);
  }

  downloadFile(id: number) {
    this.apiUser.loggedOut();
    this.apiFile.download(id)
      .subscribe(
        response => {
          this.url = response;
          window.location.href = this.url.url;
        },
        (error) => console.log('Download failed')
      )
  }

}
