import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './models/user';
import { Observable, of } from 'rxjs';
import { Token } from './models/token';
import { map, catchError } from 'rxjs/operators';
import { Profil } from './models/profil';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  private baseUrl = 'http://localhost:8083/api';
  private authUrl = 'http://localhost:8083/oauth/token'
  private token: string;

  constructor(private http: HttpClient) { }

  public register(user: User) {
    // send POST sur le serveur
    return this.http.post<Token>(`${this.baseUrl}/users/register`, user);
  }

  public login(username: string, password: string, grantType: string, clientId: string) {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', grantType)
      .set('client_id', clientId);
    console.log(body);
    return this.http.post<Token>(this.authUrl, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }).pipe(
      map(response => {
        if (response.access_token) {
          console.log(response.access_token)
          this.setToken(response.access_token);
          return true;
        } else {
          return false;
        }
      }),
      catchError((err: any) => {
        return of(false);
      })
    )
  }

  public update(user: any) {
    return this.http.put(`${this.baseUrl}/profil`, user, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
  }

  public getProfil() {
    return this.http.get(`${this.baseUrl}/profil`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
    /*.pipe(
      map((reponse) => {
        if (reponse.data) {
          return reponse.data;
        }else {
          return false;
        }
      }),
      catchError( (error: any) => {
        return of(false);
      })
    )*/
  }

  getToken() {
    this.token = localStorage.getItem('access_token');
    return this.token;
  }

  setToken(token) {
    localStorage.setItem('access_token', token);
  }

  clearToken() {
    localStorage.setItem('access_token', '');
    this.token = '';
  }
}
