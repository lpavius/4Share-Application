import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { ApiFilesService } from '../services/api-files.service';
import { ApiUserService } from '../services/api-user.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  search: any;
  results: Object = [];
  msg = '';

  constructor(private apiFile: ApiFilesService, 
              private apiUser: ApiUserService,
              private route: Router) { 
    route.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }

  ngOnInit(): void {
    this.apiUser.loggedOut();
    this.search = SearchComponent.keyword;
    this.msg = '';
    console.log(this.search);
    console.log("test");
    // this.apiFile.getSearch(this.search);
    this.apiFile.getSearch(this.search)
      .subscribe(mySearch => {
        this.results = mySearch;
        console.log(mySearch);
      })
  }

  myResult() {
    console.log(this.results);
    let objLength = Object.keys(this.results).length;
    if (Object.keys(this.results).length === 0) {
      this.msg = `${objLength} résultats trouvés`;
      console.log("c'est vide");
      return true;
    } else {
      this.msg = `${objLength} résultats trouvés`;
      console.log("ya quelque chose");
      return false;
    }
  }

  converterSize(number: number) {
    let num = number / 1000;
    return num.toFixed(2);
  }

}
