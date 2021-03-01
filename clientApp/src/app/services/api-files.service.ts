import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Files } from '../models/files';
import { ApiUserService } from './api-user.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiFilesService {

  private baseUrl = 'http://localhost:8083/api';
  search: any;

  constructor(private http: HttpClient, private apiUser: ApiUserService) { }

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
   * @param files : liste de fichiers
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
      reportProgress: true, // expose les événements de progression
      observe: 'events' // retourne un Observable de type HttpEvent
    })
    .pipe(
        map(event => {
          return event;
        }),
        catchError(err => {
           throw err;
        })
      )
  }

  /**
   * envoie une requête HTTP PUT au serveur :
   * - change visibilityPublic par true ou false
   * @param id : id du fichier
   * @param file : le fichier à modifier
   */
  update(id, file) {
    console.log(typeof file);
    console.log(id);
    return this.http.put(`${this.baseUrl}/files/update/${id}`, file);
  }

  /**
   * envoie une requête HTTP PUT au serveur :
   * - supprime le fichier
   * @param file : le fichier à supprimer
   */
  delete(file: Files) {
    return this.http.delete(`${this.baseUrl}/files/${file.id}`);
  }

  /**
   * envoie une requête HTTP GET au serveur :
   * - la liste des fichiers 
   * @param keyword : le mot clé 
   */
  getSearch(keyword) {
    console.log(keyword);
    return this.http.get(`${this.baseUrl}/files/search/${keyword}`);
  }

  download(id) {
    return this.http.get(`${this.baseUrl}/files/${id}`);
  }
}
