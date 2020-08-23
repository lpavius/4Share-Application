import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { format } from 'url';
import { ApiUsersService } from '../api-users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = this.form.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
  });
  submitted = false;


  constructor(public modal: NgbActiveModal,
              private modalService: NgbModal,
              private form: FormBuilder,
              private apiUser: ApiUsersService) { }

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
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }
    this.apiUser.register(this.registerForm.value)
      .subscribe(
        (data) => {
          console.log(data);
          this.modalService.dismissAll(RegisterComponent);
          alert('Inscription réussi !!');
        },
        (error) => console.log(error)
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
