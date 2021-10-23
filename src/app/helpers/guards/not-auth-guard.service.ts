import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';


/* Service used to guard login and signup path. If user is already logged in I'll redirect him to the profile page*/
@Injectable({
  providedIn: 'root',
})
export class NotAuthGuardService implements CanActivate {

constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate(  ): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['profile']);
      return false;
    }
    return true;
  }

}
