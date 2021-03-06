import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Constants } from '../../../assets/global-constants';
import { User } from '../../model/user';

/* ######## CONSTANTS ######## */
//const API_URL = Constants.DOMAIN + '/api/auth';
const API_URL = Constants.DOMAIN + '/user';
/* ######## END OF CONSTANTS ######## */

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};


/* Service used to manage the logged user */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedUser$: BehaviorSubject<User> = new BehaviorSubject(new User());

  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(API_URL + `/${id}` + '?view=synthetic', httpOptions);
  }

  getAllUsers() {
    return this.http.get<any>(API_URL + '/');
  }

  getRole(id: string): Observable<any>{
    return this.http.get<any>(API_URL + `/role/${id}`);
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
