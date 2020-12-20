import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
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

  getUserFiles() {
    return this.http.get<Files[]>(`${this.baseUrl}/profil/files`, {
      headers: {
        Authorization: `Bearer ${this.apiUser.getToken()}`
      }
    });
  }

  getFiles() {
    return this.http.get<Files[]>(`${this.baseUrl}/files`);
  }

  upload(files: File[]) {
    let formData = new FormData();
    let progress = 0;

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
      // .pipe(
    //   map((event) => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //         progress = Math.round(100 * event.loaded / event.total);
    //         console.log(event);
    //         return { value: progress}
    //       } else if (event.type == HttpEventType.Response) {
    //         return progress = null;
    //       }
    //   }) // return event.type {type: 1, loaded: 406700, total: 406700}
    // )
  }

  update(id, file) {
    console.log(typeof file);
    console.log(id);
    return this.http.put(`${this.baseUrl}/files/update/${id}`, file);
  }

  delete(file: Files) {
    return this.http.delete(`${this.baseUrl}/files/${file.id}`);
  }

  getSearch(keyword) {
    console.log(keyword);
    return this.http.get(`${this.baseUrl}/files/search/${keyword}`);
  }
}
