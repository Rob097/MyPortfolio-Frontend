import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../assets/global-constants';
import { onSideNavChange, animateText } from '../../../animations/animations'
import { SidenavService } from '../../../services/sidenav.service'
import pages from '../../../../assets/pages.json';
import { DialogsService } from 'src/app/services/dialogs.service';
import { UserMenuDialogComponent } from '../../shared/dialog/user-menu-dialog/user-menu-dialog.component';
import { UserService } from 'src/app/services/SYS/user.service';
import { User } from 'src/app/model/user';

/* Interface used to describe a page attributes
A json exists in the assets folder that contains all the pages. */
interface Page {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit {

  public cs = Constants;

  public sideNavState: boolean;
  public linkText: boolean;

  /* Array of the current existing pages */
  public pages: Page[] = pages;

  user?: User;

  constructor(
    private _sidenavService: SidenavService,
    private _dialogService: DialogsService,
    private _userService: UserService
  ) {

      this._userService.loggedUser$.subscribe(res => {
        this.user = res;
      });

    this._sidenavService.sideNavState$.subscribe(res => {
      this.sideNavState = res;
      setTimeout(() => {
        this.linkText = this.sideNavState;
      }, 180)
    });
    this.sideNavState = this._sidenavService.getState();
    this.linkText = this.sideNavState;

  }

  ngOnInit() {
  }

  /* Function used to toggle the state of the sidebar. The states are 'true' if it is open big or 'false' if it is open small.*/
  onSinenavToggle() {
    this._sidenavService.setState(!this.sideNavState);
  }

  openDialog(event: any) {
    const filterData = {
      width: "fit-content",
      height: "fit-content",
      located: "RIGHT",
      hasBackdrop: false
    };

    this._dialogService.open(UserMenuDialogComponent, filterData, event);
  }

}
