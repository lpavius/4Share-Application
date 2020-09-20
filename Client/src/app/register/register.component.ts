import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { format } from 'url';
import { ApiUsersService } from '../api-users.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;  
  submitted = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(public modal: NgbActiveModal, private modalService: NgbModal,
              private form: FormBuilder, private apiUser: ApiUsersService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.form.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    });
  }

  get myForm() {
    return this.registerForm.controls;
  }

  modalLogin() {
    this.modalService.dismissAll(RegisterComponent);
    this.modalService.open(LoginComponent);
  }

  onSubmit() {
    this.submitted = true;
    // console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.apiUser.register(this.registerForm.value as User)
      .subscribe(
        response => {
          console.dir(response);
          // this.submitted = true;
          this.modalService.dismissAll(RegisterComponent);
          alert('Inscription réussi !!');
          this.modalLogin();
        },
        err => {
          //this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          console.error(err);
        }
      );
  //   console.log(this.registerForm);
    // if (this.registerForm.valid) {
    //   // this.registerForm.reset();
    //   this.modalService.dismissAll(RegisterComponent);
    // } else {
    //   return;
    // }
    // alert('Inscription réussi !!');
  }

}
