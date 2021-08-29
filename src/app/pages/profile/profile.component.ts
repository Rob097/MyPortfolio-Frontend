import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user?: User;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) {
    this.userService.loggedUser$.subscribe(res => {
      this.user = res;
    });
    this.userService.getUser(this.tokenStorage.getUserId()).subscribe(res => {
      this.user = res;
    });

  }

  ngOnInit(): void {
  }

}
