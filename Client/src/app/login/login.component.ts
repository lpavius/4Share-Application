import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiUsersService } from '../api-users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loginFailed = false;
  public message: string;

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, 
              private form: FormBuilder, private apiUser: ApiUsersService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.form.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      grant_type: 'password',
      client_id: 'forshare-app'
    });
  }

  modalRegister() {
    this.modalService.dismissAll(LoginComponent);
    this.modalService.open(RegisterComponent);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
    return this.apiUser.login(this.myForm.username.value, this.myForm.password.value, 
                              this.myForm.grant_type.value, this.myForm.client_id.value)
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.modalService.dismissAll(LoginComponent);
          return this.router.navigate(['/myfiles']);
        } else {
          this.loginFailed = true;
          this.message = 'E-mail ou mot de passe invalide';
        }
      })

  }

  get myForm() {
    return this.loginForm.controls;
  }

}
