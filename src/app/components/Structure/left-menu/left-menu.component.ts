import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../assets/global-constants';
import { onSideNavChange, animateText } from '../../../animations/animations'
import { SidenavService } from '../../../services/sidenav.service'
import pages from '../../../../assets/pages.json';
import { ThemeService } from 'src/app/services/theme.service';

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

  constructor(
    private _sidenavService: SidenavService,
    private _themeService: ThemeService) {

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

}
