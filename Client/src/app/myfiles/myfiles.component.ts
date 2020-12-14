import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApiFilesService } from '../api-files.service';
import { Files } from '../models/files';

@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.component.html',
  styleUrls: ['./myfiles.component.css']
})
export class MyfilesComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  listFiles: Files[];
  selectedFiles: File[];
  progressInfos = [];
  filesUploaded: Files[];
  uploaded = false;

  private baseUrl = 'http://localhost:8083/api';

  constructor(private apiFiles: ApiFilesService) { }

  ngOnInit(): void {
    this.apiFiles.getUserFiles()
    .subscribe(files => {
      console.log(files);
      this.listFiles = files;
      console.log(this.listFiles);
    });
  }

  selectFiles(event) {
      // this.progressInfos = [];
      this.selectedFiles = event;
      console.log(this.selectedFiles);
  }

  onUpload() {
    this.apiFiles.upload(this.selectedFiles)
      .subscribe(
        data => {
          this.uploaded = true;
          // console.log(data);
          // this.filesUploaded = data;
          this.ngOnInit();
        }
      ) 
  }

  switchPublic(event) {
    let file;
    let id = parseFloat(event.target.id);
    //console.log(this.listFiles);
    this.listFiles.forEach(fileId => {
      if (fileId.id === id) {
        file = fileId;
      }
    });
    // console.log(file);
    // console.log(file.id);
    this.apiFiles.update(id, file)
    .subscribe(
      data => {console.log(data)}
    );
  }

  deleteFile(file: Files) {
    this.apiFiles.delete(file)
      .subscribe(
        () => this.ngOnInit()
    );
  }

}
