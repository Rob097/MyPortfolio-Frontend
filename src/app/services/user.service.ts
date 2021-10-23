import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Constants } from '../../assets/global-constants';
import { User } from '../class/user.component';

/* ######## CONSTANTS ######## */
//const API_URL = Constants.DOMAIN + '/api/auth';
const API_URL = Constants.DOMAIN + '/user';
/* ######## END OF CONSTANTS ######## */

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJQUk9WQSIsInJvbGVzIjpbeyJpZCI6MiwibmFtZSI6IlJPTEVfQURNSU4iLCJwZXJtaXNzaW9ucyI6bnVsbCwiYXV0aG9yaXR5IjoiMiJ9XSwiZXhwIjoxNjM0OTMxMzQ0LCJ1c2VySWQiOiI5IiwiaWF0IjoxNjM0OTI0MTQ0fQ.-lP4Hlferq4Q1xXSdfhph_wX0bvDwGiqTCPs0zrluoyCSLT6Zpm1uqkVSD6HLzH-SXFluD0Hgle_JDkCQfnU9w'
  })
};


/* Service used to manage the logged user */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedUser$: Subject<User> = new Subject();

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(API_URL + `/${id}`, httpOptions);
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