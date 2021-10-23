import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user.component';
import { UserService } from 'src/app/services/user.service';

import { TokenStorageService } from '../../services/token-storage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false),
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  user!: User;
  roles: string[] = [];

  constructor(private authService: AuthService, private localAuthService: AuthenticationService, private tokenStorage: TokenStorageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getTokenFromCookie()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password, rememberMe } = this.form.value;

    this.localAuthService.login(username, password,false).subscribe(
      data => {
        console.log("DATA: " + data);
        /*const userId: string = this.tokenStorage.getUserId();
        this.userService.getUser(userId).subscribe(res => {
          this.userService.loggedUser$.next(res);
          this.user = res;
        });

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.router.navigate(['/profile']);*/

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
