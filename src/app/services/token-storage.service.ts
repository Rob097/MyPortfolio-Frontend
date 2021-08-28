import { Injectable } from '@angular/core';
import { Constants } from '../../assets/global-constants';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_KEY = Constants.TOKEN_KEY;
const USER_KEY = Constants.USER_KEY;
const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  //Funcione per ottenere il token JWT dal relativo cookie
  getTokenFromCookie = () => {
    try {
      let cookies = document.cookie.split(';'); //contains all the cookies
      let cookieName = []; // to contain name of all the cookies
      let index = -1;
      let token;

      for (let i = 0; i < cookies.length; i++) {
        cookieName[i] = cookies[i].split('=')[0].trim();
      }
      index = cookieName.indexOf(Constants.TOKEN_COOKIE);

      if (index > -1) {
        token = cookies[index].split(/=(.+)/)[1];
        return token;
      }
    } catch (e) {
      console.log(e);
    }

    return undefined;
  };

  //Funzione per ottenere l'username dell'utente loggato
  getUserInfo = () => {
    try {
      let token = jwt.decodeToken(this.getTokenFromCookie());
      if (token !== null && token !== undefined) return token.sub;
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getUserId(): string {
    try {
      let token = jwt.decodeToken(this.getTokenFromCookie());
      if (token !== null && token !== undefined) return token.userId;
    } catch (e) {
      console.log(e);
    }
    return "";
  }
}
