import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../assets/global-constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

const jwt = new JwtHelperService();
const AUTH_API = Constants.DOMAIN;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true //this is required so that Angular returns the Cookies received from the server. The server sends cookies in Set-Cookie header. Without this, Angular will ignore the Set-Cookie header
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(private http: HttpClient) {}

  login(username: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post(`${AUTH_API}/api/auth/signin`, {
      username,
      password,
      rememberMe
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

}

/*

//Funzione fondamentale.
  //Viene chiamata subito all'avvio dell'app da index.js per verificare se l'utente è loggato.
  //Nel caso sia loggato controlla se vuole essere ricordato e altrimenti cancella i cookies
  firstCheckIsLogged() {
    try {
      if (sessionStorage.getItem('isChecked') === null || !sessionStorage.getItem('isChecked')) {
        let cookies = document.cookie.split(';'); //contains all the cookies
        let cookieName = []; // to contain name of all the cookies
        let indexR = -1,
          indexT = -1;

        for (let i = 0; i < cookies.length; i++) {
          cookieName[i] = cookies[i].split('=')[0].trim();
        }
        indexR = cookieName.indexOf(Constants.REMEMBER_COOKIE);
        indexT = cookieName.indexOf(Constants.TOKEN_COOKIE);

        //Se esiste il cookie con il token e il cookie remember me ed è true
        if (
          indexT <= -1 ||
          indexR <= -1 ||
          cookies[indexR].split(/=(.+)/)[1] !== 'true'
        ) {
          document.cookie =
            Constants.REMEMBER_COOKIE +
            '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie =
            Constants.TOKEN_COOKIE +
            '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
        sessionStorage.setItem('isChecked', '' + true);
      }
    } catch (ex) {
      sessionStorage.setItem('isChecked', '' + false);
      console.log(ex);
    }
  }

  //Aggiorna il token di accesso
  refreshToken = () => {
    return this.http.get(`${this.server}/api/auth/refresh-token`);
  };

  //Con l'autenticazione JWT i parametri non vengono passati con un header ma attraverso il body
  signIn(username: string, password: string, rememberMe: boolean) {
    return this.http.post<any>(`${this.server}/api/auth/signin`, {
      username,
      password,
      rememberMe,
    });
  }

  signUp(utente: any) {
    return this.http.post<any>(`${this.server}/api/auth/signup`, utente);
  }

  //Funzione per verificare se l'utente è loggato
  isLogged = () => {
    let user = this.getUserInfo();

    if (user === null) return false;
    else return true;
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

    return null;
  };

  getAllUsers() {
    return this.http.get<any>(`${this.server}/api/auth/getAll`);
  }

*/
