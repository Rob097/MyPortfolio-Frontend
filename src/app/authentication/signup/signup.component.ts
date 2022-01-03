import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LanguagesService } from 'src/app/services/languages.service';
import { UserService } from 'src/app/services/SYS/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  minUsernameLength: number = 5;
  minPasswordLength: number = 10;

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(this.minUsernameLength)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength)]),
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

  get username(){
    return this.form.controls.username;
  }
  get email(){
    return this.form.controls.email;
  }
  get password(){
    return this.form.controls.password;
  }

  onSubmit(): void {
    const { username, email, password } = this.form.value;

    this.authService.signup(username, email, password).subscribe(
      (data) => {
        this.errorMessage = data;
        console.log("%O", data);

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
