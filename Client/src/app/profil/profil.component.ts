import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUsersService } from '../api-users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  users: any;

  constructor(private userApi: ApiUsersService) { }
            
  ngOnInit(): void {
    this.userApi.getProfil()
      .subscribe(
        user => {
          this.users = user;
          console.log(this.users);
        },
        // error => alert(`You need to be logged in to see this page: ${error}`)
      )
  }

}
