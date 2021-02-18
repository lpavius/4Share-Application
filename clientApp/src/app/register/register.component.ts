import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { User } from '../models/user';
import { ApiUserService } from '../services/api-user.service';

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
    private form: FormBuilder, private apiUser: ApiUserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.form.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=[^a-z]*[a-z])(?=.*[-$@$!%*?&])(?=[^A-Z]*[A-Z]).{8,16}$')]],
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
