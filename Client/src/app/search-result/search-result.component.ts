import { Component, OnInit } from '@angular/core';
import { ApiFilesService } from '../api-files.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  search: any;

  constructor(private apiFile: ApiFilesService) { }

  ngOnInit(): void {
    // this.search = this.searchComp.keyword;
    console.log(this.search);
    // this.apiFile.getSearch(this.search);
  }

}
