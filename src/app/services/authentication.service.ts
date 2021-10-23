import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../assets/global-constants';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from './token-storage.service';

/* ######## CONSTANTS ######## */
const AUTH_API = Constants.DOMAIN;
const jwt = new JwtHelperService();
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true //this is required so that Angular returns the Cookies received from the server. The server sends cookies in Set-Cookie header. Without this, Angular will ignore the Set-Cookie header
};
/* ######## END OF CONSTANTS ######## */




/* Service used to manage login, logout, signup and check whether someone is logged in or not */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

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

  //Aggiorna il token di accesso
  refreshToken = () => {
    return this.http.get(`${AUTH_API}/api/auth/refresh-token`);
  };

  public isAuthenticated(): boolean {
    // Get token from localstorage
    let token = this.tokenStorage.getTokenFromLocalStorage();
    // Check if token is null or empty
    if (token){
      // Check whether the token is expired and return
      // true or false
      return !jwt.isTokenExpired(token);
    }
    else{
      return false
    }
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

*/
