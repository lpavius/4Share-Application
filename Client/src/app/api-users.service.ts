import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  private baseUrl = 'http://localhost:8083';

  constructor(private http: HttpClient) { }

  public register(user: User) {
    // send POST sur le serveur
    return this.http.post<any>(`${this.baseUrl}/users/register`, user);
  }
}
