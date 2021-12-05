import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/SYS/user.service';

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

  getRolesName(): string[]{

    const rolesName: string[] = [];

    if(this.user){

      this.user.roles.map(role => rolesName.push(role.name));

    }

    return rolesName;

  }

  getPermissionsName(): string[]{

    const permissionsName: string[] = [];

    if(this.user){

      this.user.roles.map(role => {
        if(role.permissions){
          role.permissions.map(permission => {
            if(!permissionsName.includes(permission.name)){
              permissionsName.push(permission.name);
            }
          });
        }
      });

    }

    return permissionsName;

  }

}
