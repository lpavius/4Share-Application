import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiUsersService } from './api-users.service';
import { Files } from './models/files';
import { MyfilesComponent } from './myfiles/myfiles.component';

@Injectable({
  providedIn: 'root'
})
export class ApiFilesService {

  private baseUrl = 'http://localhost:8083/api';
  search: any;

  constructor(private http: HttpClient, private apiUser: ApiUsersService) { }

  /**
   * envoie une requête HTTP GET au serveur : 
   * - la liste de tous les fichiers de l'utilisateur connecté
   */
  getUserFiles() {
    return this.http.get<Files[]>(`${this.baseUrl}/profil/files`, {
      headers: {
        Authorization: `Bearer ${this.apiUser.getToken()}`
      }
    });
  }

  /**
   * envoie une requête HTTP GET au serveur :
   * - la liste de tous les fichiers avec visibilityPublic = true
   */
  getFiles() {
    return this.http.get<Files[]>(`${this.baseUrl}/files`);
  }

  /**
   * envoie une requête HTTP POST au serveur :
   * - enregistre une liste de fichiers
   * @param files
   */
  upload(files: File[]) {
    let formData = new FormData();

    for (let index = 0; index < files.length; index++) {
      formData.append('files', files[index]);
    }
    // console.log(files);
    return this.http.post(`${this.baseUrl}/files/upload`, formData, {
      headers: {
        Authorization: `Bearer ${this.apiUser.getToken()},`
      },
      reportProgress: true,
      observe: 'events'
    })
    .pipe(
        map(event => {
          console.log(event);
          return event;
          // switch (event.type) {

          //   case HttpEventType.UploadProgress:
          //     const progress = Math.round(100 * event.loaded / event.total);
          //     return { status: 'progress', message: progress };
          //   case HttpEventType.Response:
          //     return event.body;
          //   default:
          //     return `Unhandled event: ${event.type}`;
          // }
        }),
        catchError(err => {
          console.log(err);
           throw err;
        })
      )
  }

  /**
   * envoie une requête HTTP PUT au serveur :
   * - change visibilityPublic par true ou false
   * @param id 
   * @param file
   */
  update(id, file) {
    console.log(typeof file);
    console.log(id);
    return this.http.put(`${this.baseUrl}/files/update/${id}`, file);
  }

  /**
   * envoie une requête HTTP PUT au serveur :
   * - supprime le fichier
   * @param file 
   */
  delete(file: Files) {
    return this.http.delete(`${this.baseUrl}/files/${file.id}`);
  }

  /**
   * envoie une requête HTTP GET au serveur :
   * - la liste des fichiers 
   * @param keyword 
   */
  getSearch(keyword) {
    console.log(keyword);
    return this.http.get(`${this.baseUrl}/files/search/${keyword}`);
  }
}
