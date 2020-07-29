import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  model: any;

  constructor(private http: HttpClient) { }

  login(): void {
    // send POST sur le serveur
    // return
    // this.http.post(`http://localhost:PORT_DU_SERVEUR_DEMARRE/login`, {
    //   username: this.model.username,
    //   password: this.model.password
    // });
  }
}
