import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { format } from 'url';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = this.form.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  submitted = false;


  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private form: FormBuilder) { }

  ngOnInit() {
  }

  modalLogin() {
    this.modalService.dismissAll(RegisterComponent);
    this.modalService.open(LoginComponent);
  }

  get myForm() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      // this.registerForm.reset();
      this.modalService.dismissAll(RegisterComponent);
    } else {
      return;
    }

    alert('Inscription réussi !!');
  }

}
