import { Component, OnInit } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';
import { HostListener } from "@angular/core";
import { ThemeService } from './services/theme.service';
import { ConstantsService } from './services/constants.service';

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
export class AppComponent implements OnInit{
  title = 'Angular';
  minimumWidth = 769; //If the width of the screen is less than this, it changes the sidebar behaviour.
  screenWidth!: number; //Used to know the size of the screen. When it's small the sidebar go over the content.
  public onSideNavChange: boolean;
  isDarkMode: boolean;

  constructor(
    private themeService: ThemeService,
    private _sidenavService: SidenavService,
    private cs: ConstantsService) {

      // Sidenav state
    this._sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
      this.getScreenSize();
    })
    this.onSideNavChange = this._sidenavService.getState();

    // Screen width
    this._sidenavService.screenWidth$.subscribe(res => {
      this.screenWidth = res;
    })

    // Theme
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();

  }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(_event?: any) {
    this._sidenavService.screenHeight$.next(window.innerHeight);
    this._sidenavService.screenWidth$.next(window.innerWidth);
  }

  /* Function used to send the state to the animation.ts depending on screen width
  If the width is greater than the minimum it will be side byside, otherwise it will be over the content.
  */
  check(){

    if(localStorage.getItem(this.cs.localStorageSidebarVisibleOption) === 'false'){
      return '';
    }else{
      if (this.onSideNavChange) {
        return 'open';
      } else {
        return 'close';
      }
    }
  }

  /* Toggle dark mode and store the state in localStorage */
  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();

    this.isDarkMode
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
  }
}
