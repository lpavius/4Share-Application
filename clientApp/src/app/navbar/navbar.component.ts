import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { ApiUserService } from '../services/api-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private modalService: NgbModal, private apiService: ApiUserService, private router: Router) { }

  ngOnInit(): void {
  }

  modalLogin() {
    this.modalService.open(LoginComponent);
  }

  loggedIn(): boolean {
    // return this.apiService.getToken() && this.apiService.getToken().length !== 0;
    if (this.apiService.getToken() && this.apiService.tokenExpired() == false) {
      return true;
    }
    return false;
  }

}
