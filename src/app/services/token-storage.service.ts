import { Injectable } from '@angular/core';
import { Constants } from '../../assets/global-constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

/* ######## CONSTANTS ######## */
const jwt = new JwtHelperService();


/* Service used to manage the JWT token used for authentication and get some information from it*/
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  public token$: Subject<string> = new Subject();

  constructor() {
    //this.getTokenFromCookie();
    this.getTokenFromLocalStorage();
  }

  saveTokenIntoLocalStorage(token: string) {
    localStorage.setItem(Constants.TOKEN_KEY, token);
  }

  getTokenFromLocalStorage() {
    const token = localStorage.getItem(Constants.TOKEN_KEY);
    if (token) {
      return token;
    } else {
      return undefined;
    }
  }

  //Funzione per ottenere il token JWT decodificato
  getDecodedToken() {
    return jwt.decodeToken(this.getTokenFromLocalStorage());
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
