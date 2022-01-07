import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/SYS/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-menu-dialog',
  templateUrl: './user-menu-dialog.component.html',
  styleUrls: ['./user-menu-dialog.component.scss']
})
export class UserMenuDialogComponent implements OnInit {

  user?: User;

  constructor(
    private _authService: AuthenticationService,
    private _userService: UserService,
  ) {
    this._userService.loggedUser$.subscribe(res => {
      this.user = res;
    });
  }

  ngOnInit(): void {
  }

  logout(){
    console.log("logout");
    this._authService.logout();
  }

}
