import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Constants } from '../../assets/global-constants';
import { User } from '../class/user.component';

const API_URL = Constants.DOMAIN;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedUser$: Subject<User> = new Subject();

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(API_URL + `/api/auth/${id}`);
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
