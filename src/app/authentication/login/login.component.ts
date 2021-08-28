import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user.component';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/authentication.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    rememberMe: false
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  user!: User;
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private userService: UserService) {

    this.userService.loggedUser$.subscribe(res => {
      //this.user = res;

    });

  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password, rememberMe } = this.form;

    this.authService.login(username, password, rememberMe).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        const userId: string = this.tokenStorage.getUserId();
        this.userService.getUser(userId).subscribe(res => {
          this.userService.loggedUser$.next(res);
          this.user = res;
          console.log("%O", this.user);
        });

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
