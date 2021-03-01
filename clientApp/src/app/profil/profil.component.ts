import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from '../services/api-user.service';

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
  submitted = false;
  username: string;

  constructor(private userApi: ApiUserService, private form: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // if (this.userApi.tokenExpired()) {
    //   this.router.navigate(['']);
    // } else {
      this.userApi.loggedOut();
      this.userApi.getProfil()
        .subscribe(
          user => {
            this.users = user;
            console.log(user);
            // this.getUserForm(user);
            this.username = this.users.userName;
            this.userForm = this.form.group({
              firstName: [this.users.firstName, Validators.required],
              lastName: [this.users.lastName, Validators.required],
              userName: [this.users.userName, [Validators.required, Validators.email]],
              // password: [this.users.password]
            });
          },
        )
    //}
  }

  // getUserForm(user: any) {
  //   this.userForm = this.form.group({
  //     firstName: [user.firstName],
  //     lastName: [user.lastName],
  //     userName: [user.userName.toLowerCase, Validators.email],
  //     password: [user.password]
  //   });
  // }

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
    let diffUsername = false;
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    if (this.username !== this.userForm.value.userName) {
      alert("Vous avez changer votre Email, vous allez être déconnecter. Veuillez vous reconnecter avec votre nouvelle Email");
      diffUsername = true;
    }
    this.userApi.update(this.userForm.value)
      .subscribe(
        response => {
          console.dir(response);
          this.isDisabled = true;
          this.modified = false;
          if (diffUsername) {
            this.userApi.clearToken();
            this.router.navigate(['/']);
          }
        }
      )
  }

}
