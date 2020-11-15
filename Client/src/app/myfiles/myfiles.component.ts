import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.component.html',
  styleUrls: ['./myfiles.component.css']
})
export class MyfilesComponent implements OnInit {
  faPlus = faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
