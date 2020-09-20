import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { ApiUsersService } from '../api-users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private modalService: NgbModal, private apiService: ApiUsersService, private router: Router) { }

  ngOnInit() {
  }

  modalLogin() {
    this.modalService.open(LoginComponent);
  }

  loggedIn(): boolean {
    return this.apiService.getToken() && this.apiService.getToken().length !== 0;
  }

  logout() {
    this.apiService.clearToken();
    this.router.navigate(['']);
  }
}
