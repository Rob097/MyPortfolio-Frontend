import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../services/authentication.service';


/* Service used to guard some path to those whose permissions are not enough to access the page or that are not authenticated.*/
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

constructor(public auth: AuthService, public router: Router) {}

  canActivate(  ): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
