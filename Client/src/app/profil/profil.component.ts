import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUsersService } from '../api-users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  users: any;
  userForm: FormGroup;
  modified = false;
  isDisabled = true;

  constructor(private userApi: ApiUsersService, private form: FormBuilder, private router: Router) { }
            
  ngOnInit(): void {
    // if (this.userApi.tokenExpired()) {
    //   this.router.navigate(['']);
    // } else {
      this.userApi.getProfil()
        .subscribe(
          user => {
            this.users = user;
            console.log(user);
            this.userForm = this.form.group({
              firstName: this.users.firstName,
              lastName: this.users.lastName,
              userName: [this.users.userName, Validators.email],
              password: this.users.password,
            });
          },
          //error => alert(`You need to be logged in to see this page: ${error}`)
        )
    //}
  }

  get myForm() {
    return this.userForm.controls;
  }

  updateForm(): void {
    if (this.modified === false) {
      this.modified = true;
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
      this.modified = false;
      this.ngOnInit();
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    this.userApi.update(this.userForm.value)
      .subscribe(
        response => {
          console.dir(response);
          this.isDisabled = true;
          this.modified = false;
        }
      )
  }

}
