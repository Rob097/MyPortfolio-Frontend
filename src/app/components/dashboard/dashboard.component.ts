import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users?: newUser[];
  user?: newUser;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

}

export interface newUser{
  id: string,
  username: string,
  name: string,
  surname: string,
  email: string
}
