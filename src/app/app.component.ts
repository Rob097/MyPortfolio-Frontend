import { Component } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';
import { HostListener } from "@angular/core";
import { ThemeService } from './services/theme.service';

/*
This component is the root component of the application.
The animation specified in the Component decorator are the animation used when the sidebar changes status.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onMainContentChange]
})
export class AppComponent {
  title = 'Angular';
  minimumWidth = 769; //If the width of the screen is less than this, it changes the sidebar behaviour.
  screenWidth!: number; //Used to know the size of the screen. When it's small the sidebar go over the content.
  public onSideNavChange?: boolean;
  isDarkMode: boolean;

  constructor(
    private themeService: ThemeService,
    private _sidenavService: SidenavService) {

      this.onSideNavChange = false;

    // Sidenav state
    this._sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
      this.getScreenSize();
    })

    // Screen width
    this._sidenavService.screenWidth$.subscribe(res => {
      this.screenWidth = res;
    })

    // Theme
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();

  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(_event?: any) {
    this._sidenavService.screenHeight$.next(window.innerHeight);
    this._sidenavService.screenWidth$.next(window.innerWidth);
  }

  check() {
    if (this.screenWidth < this.minimumWidth) {
      this._sidenavService.sideNavState$.next(undefined);
      return '';
    } else {
      if (this.onSideNavChange == undefined) {
        return '';
      }
      if (this.onSideNavChange) {
        return 'open';
      } else {
        return 'close';
      }
    }
  }

  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
  }
}
