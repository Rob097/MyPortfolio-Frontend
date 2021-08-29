import { Injectable } from '@angular/core';
import { Constants } from '../../assets/global-constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

/* ######## CONSTANTS ######## */
const TOKEN_KEY = Constants.TOKEN_KEY;
const USER_KEY = Constants.USER_KEY;
const jwt = new JwtHelperService();
/* ######## END OF CONSTANTS ######## */


/* Service used to manage the JWT token used for authentication and get some information from it*/
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  public token$: Subject<string> = new Subject();

  constructor() {
    this.getTokenFromCookie();
  }

  //Funzione per ottenere il token JWT dal relativo cookie
  getTokenFromCookie(){
    try {
      let cookies = document.cookie.split(';'); //contains all the cookies
      let cookieName = []; // contains names of all the cookies
      let index = -1;
      let token;

      for (let i = 0; i < cookies.length; i++) {
        cookieName[i] = cookies[i].split('=')[0].trim();
      }
      index = cookieName.indexOf(Constants.TOKEN_COOKIE);

      if (index > -1) {
        token = cookies[index].split(/=(.+)/)[1];
        this.token$.next(token);
        return token;
      }
    } catch (e) {
      console.log(e);
    }

    return undefined;
  };

  //Funzione per ottenere il token JWT decodificato
  getDecodedToken(){
    return jwt.decodeToken(this.getTokenFromCookie());
  }

  //Funzione per ottenere l'username dell'utente loggato
  getUserName = () => {
    try {
      let token = this.getDecodedToken();
      if (token !== null && token !== undefined) return token.sub;
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  //Funzione per ottenere l'id dell'utente loggato
  public getUserId(): string {
    try {
      let token = this.getDecodedToken();
      if (token !== null && token !== undefined) return token.userId;
    } catch (e) {
      console.log(e);
    }
    return "";
  }

  /*public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }*/


}
