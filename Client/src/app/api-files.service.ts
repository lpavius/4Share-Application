import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUsersService } from './api-users.service';
import { Files } from './models/files';
import { MyfilesComponent } from './myfiles/myfiles.component';

@Injectable({
  providedIn: 'root'
})
export class ApiFilesService {

  private baseUrl = 'http://localhost:8083/api';

  constructor(private http: HttpClient, private apiUser: ApiUsersService) { }

  upload(files: File[]) {
    let formData = new FormData();
    
    for (let index = 0; index < files.length; index++) {
      formData.append('files', files[index]);
    }
    console.log(files);
   
    return this.http.post<any>(`${this.baseUrl}/files/upload`, formData, {
      headers: {
        Authorization: `Bearer ${this.apiUser.getToken()}`
      }
    });
  }

  getUserFiles() {
    return this.http.get<Files[]>(`${this.baseUrl}/profil/files`, {
      headers: {
        Authorization: `Bearer ${this.apiUser.getToken()}`
      }
    });
  }
}
