import { Component, OnInit } from '@angular/core';
import { Files } from '../models/files';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApiUserService } from '../services/api-user.service';
import { ApiFilesService } from '../services/api-files.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpEventType } from '@angular/common/http';

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
  url: any;

  constructor(private apiFiles: ApiFilesService, private apiUser: ApiUserService) { }

  ngOnInit(): void {
    this.apiUser.loggedOut();
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

  /**
   * Envoie les fichiers selectionnés au serveur
   */
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
        // Réponse du serveur au format httpEvent
        .subscribe(
          event => {
            this.uploaded = true;
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event.type === HttpEventType.ResponseHeader) {
              this.progress = null;
            }
            this.ngOnInit();
          },
          (error) => {
            this.error = "Echec de l'upload";
          }
        )
  }

  /* Ferme le modal progress */
  close() {
    this.uploaded = false;
    this.progress = 0;
  }

  /**
   * switch on/off le partage
   * @param event : les fichiers selectionné dans l'exporateur de fichier
   */
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

  downloadFile(id: number) {
    this.apiUser.loggedOut();
    this.apiFiles.download(id)
      .subscribe(
        response => {
          console.log(response)
          this.url = response;
          console.log(this.url.url);
          window.location.href = this.url.url;
          //this.loadFile(this.url.url); 
        },
        (error) => console.log('Download failed')
      )
  }

}
