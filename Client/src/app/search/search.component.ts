import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiFilesService } from '../api-files.service';
import { ApiUsersService } from '../api-users.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  logged: boolean;
  static keyword: string;

  constructor(private userService: ApiUsersService,
              private route: Router,
              private modalService: NgbModal,
              private apiFile: ApiFilesService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.logged = this.userService.loggedIn();
    console.log(this.logged);
    /*if (this.userService.getToken() && this.userService.tokenExpired() == false) {
      this.logged = false;
    } else
      {this.logged = true;}*/
    /*SearchComponent.keyword = this.formBuilder.group({
      words: ['', Validators.required]
    })*/
  }

  modalLogin() {
    this.modalService.open(LoginComponent);
  }

  submitSearch(keyword: NgForm) {  
    console.log(keyword.value.words);
    if (this.logged === true) {
      if (keyword.value.words != '') {
        console.log(this.route);
        SearchComponent.keyword = keyword.value.words;
        console.log(SearchComponent.keyword);
        this.route.navigate(['/result']);
      }
    } else {
      this.modalLogin();
    }
    
  }


}
