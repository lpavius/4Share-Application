import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  selectedFiles: File[] = [];
  progressInfos = [];
  filesUploaded: Files[];
  uploaded = false;
  msg: string = '';
  progress: any;
  uploadResponse: any;
  error: string;

  constructor(private apiFiles: ApiFilesService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.apiFiles.getUserFiles()
    .subscribe(files => {
      // console.log(files);
      this.listFiles = files;
      // console.log(this.listFiles);
    });
  }

  /* convertis byte en Ko */
  converterSize(number: number) {
    let num = number / 1000;
    return num.toFixed(2);
  }

  /* Assigne les fichiers selectionnés à selectFiles */
  selectFiles(event) {
      this.selectedFiles = event;
      console.log(this.selectedFiles);
  }

  onUpload() {
    let files = this.selectedFiles;
    this.progress = 0;
    this.error = '';
    if (!files.length) {
      this.msg = "Aucun fichier sélectionné";
      console.log(this.msg);
      return;
    }
      this.apiFiles.upload(files)
        .subscribe(
          /*event => {
            console.log(event);
            this.uploadResponse = event;
          },
          err => {
            console.error(err);
            this.error = err
          }*/

          /*event => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                this.progress = Math.round(100 * event.loaded / event.total);
                console.log(this.progress);
                break;
              case HttpEventType.Response:
                console.log(event.body);
                return event.body;
            }
          },
          error => {
            this.msg = "Les fichiers n'ont pas pu être uploader.";
            console.log(this.msg);
          }*/
          event => {
            console.log(event);
            this.uploaded = true;
            console.log(HttpEventType.UploadProgress);
            console.log(HttpEventType.Response);
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
              console.log(this.progress);
            } else if (event.type === HttpEventType.ResponseHeader) {
              this.progress = null;
            }
            
            console.log(event);
            // this.filesUploaded = data;
            // this.progress = event;
            // console.log(this.progress);
            this.ngOnInit();
            
          },
          (error) => {
            // this.uploaded = false;
            // this.progress = 0;
            this.error = "Echec de l'upload"
            console.log(this.msg);
            console.log(error);
          }
        )
  }

  close() {
    this.uploaded = false;
    this.progress = 0;
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
    let del = confirm(`Le fichier ${file.filename} va être supprimé`);
    if (del) {
      this.apiFiles.delete(file)
      .subscribe(
        () => this.ngOnInit()
      );
    }
    
  }

}
