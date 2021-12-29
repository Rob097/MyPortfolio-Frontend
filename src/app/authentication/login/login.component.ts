import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

import { TokenStorageService } from '../../services/token-storage.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/model/user';
import { LanguagesService } from 'src/app/services/languages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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

  constructor(
    private authService: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router,
    private langService: LanguagesService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getTokenFromLocalStorage()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password, rememberMe } = this.form.value;

    this.authService.login(username, password, rememberMe).subscribe(
      (data) => {
        this.tokenStorage.saveTokenIntoLocalStorage(data.accessToken);

        const userId: string = this.tokenStorage.getUserId();
        this.userService.getUser(userId).subscribe((res) => {
          this.userService.loggedUser$.next(res);
          this.user = res;
        });

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.router.navigate(['/profile']);
      },
      (err) => {
        this.errorMessage = err.message;
        this.isLoginFailed = true;
      }
    );
  }
}
