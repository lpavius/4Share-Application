import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { ApiFilesService } from '../services/api-files.service';
import { ApiUserService } from '../services/api-user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  faSearch = faSearch;
  logged: boolean;
  static keyword: string;

  constructor(private userService: ApiUserService,
    private route: Router,
    private modalService: NgbModal,
    private apiFile: ApiFilesService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.logged = this.userService.loggedIn();
    console.log(this.logged);
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
