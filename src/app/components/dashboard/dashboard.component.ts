import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/SYS/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user?: User;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.userService.loggedUser$.subscribe(res => {
      this.user = res;
    });
    this.userService.getUser(this.tokenStorage.getUserId()).subscribe(res => {
      this.user = res;
    });
  }

}
