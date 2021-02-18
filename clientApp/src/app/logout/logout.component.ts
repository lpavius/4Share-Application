import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUserService } from '../services/api-user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private apiService: ApiUserService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.clearToken();
    this.router.navigate(['']);
  }

}
