import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './models/user';
import { Observable, of } from 'rxjs';
import { Token } from './models/token';
import { map, catchError } from 'rxjs/operators';
import { Profil } from './models/profil';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { MyfilesComponent } from './myfiles/myfiles.component';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {

  private baseUrl = 'http://localhost:8083/api';
  private authUrl = 'http://localhost:8083/oauth/token'
  private token: string;
  private helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  /** REGISTER **/
  register(user: User) {
    return this.http.post<Token>(`${this.baseUrl}/users/register`, user);
  }

  /** LOGIN **/
  login(username: string, password: string, grantType: string, clientId: string) {
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
          console.log(this.helper.decodeToken(response.access_token));
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

  /** UPDATE **/
  update(user: any) {
    return this.http.put(`${this.baseUrl}/profil`, user, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
  }

  /**  GET **/
  getProfil() {
    return this.http.get<Profil>(`${this.baseUrl}/profil`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    })
    // .pipe(
    //   map((reponse) => {
    //     if (reponse) {
    //       console.log(reponse);
    //       // return reponse;
    //     // }else {
    //     //   return false;
    //     }
    //   }),
    //   catchError( (error: any) => {
    //     console.log(error);
    //   })
    // )
  }

  /** --- TOKEN --- **/
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

  tokenExpired(): boolean {
    // const jwtToken = JSON.parse(atob(token.split('.')[1]));
    // const expired = Date.now() 
    // return (Math.floor((new Date).getTime() / 1000));
    return this.helper.isTokenExpired(this.getToken())
    
  }
  /** ------ **/

  loggedIn(): boolean {
     //return this.getToken() && this.getToken().length !== 0;
     return this.getToken() && this.tokenExpired() === false;
    /*if (this.getToken() && this.tokenExpired() == false) {
      return true;
    }
    return false;*/
  }
}
