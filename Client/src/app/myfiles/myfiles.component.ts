import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiFilesService } from '../api-files.service';
import { Files } from '../models/files';

@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.component.html',
  styleUrls: ['./myfiles.component.css']
})
export class MyfilesComponent implements OnInit {
  faPlus = faPlus;
  filesInfos: FormGroup;
  listFiles: Files[];
  progress: number;
  selectedFiles: File[];
  progressInfos = [];
  isActive: boolean;
  filesUploaded: Files[];
  uploaded = false;

  private baseUrl = 'http://localhost:8083/api';

  constructor(private apiFiles: ApiFilesService, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.apiFiles.getUserFiles()
    .subscribe(files => {
      console.log(files);
      this.listFiles = files;
      console.log(this.listFiles);
    });
    this.filesInfos = this.formBuilder.group({file: ['']});
  }

  selectFiles(event) {
      this.progressInfos = [];
      this.selectedFiles = event;
      console.log(this.selectedFiles);
      if (typeof this.filesUploaded === 'undefined') {
        console.log("filesUploaded is undefined");
      } else {
        console.log("il ne l'est pas !!");
      }
      console.log(this.filesUploaded);
  }
 
  deleteFileSelected() {

  }

  onSubmit() {
    this.apiFiles.upload(this.selectedFiles)
      .subscribe(
        data => {
          this.uploaded = true;
          console.log(data);
          this.filesUploaded = data;
        }
      ) 
  }

  visibilityFilesDefault(files: Files[]) {
    for (let index = 0; index < files.length; index++) {
      
    }
  }

  checkboxPublic(event) {
    console.log(event.target.checked);
  }

}
