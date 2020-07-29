import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.form.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  submitted = false;

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private form: FormBuilder) { }

  ngOnInit() {
  }

  modalRegister() {
    this.modalService.dismissAll(LoginComponent);
    this.modalService.open(RegisterComponent);
  }

  login() {
    this.submitted = true;
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.modalService.dismissAll(LoginComponent);
    }
  }

  get myForm() {
    return this.loginForm.controls;
  }

}
