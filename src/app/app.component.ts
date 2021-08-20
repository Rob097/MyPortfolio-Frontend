import { Component } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';
import { HostListener } from "@angular/core";
import { ThemeService } from './services/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onMainContentChange]
})
export class AppComponent {
  title = 'Angular';
  screenWidth!: number;
  public onSideNavChange?: boolean;
  isDarkMode: boolean;

  constructor(
    private themeService: ThemeService,
    private _sidenavService: SidenavService) {

      this.onSideNavChange = false;

    // Stato sidenav
    this._sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
      this.getScreenSize();
    })

    // Larghezza schermo
    this._sidenavService.screenWidth$.subscribe(res => {
      this.screenWidth = res;
    })

    // Tema
    this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();

  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(_event?: any) {
    this._sidenavService.screenHeight$.next(window.innerHeight);
    this._sidenavService.screenWidth$.next(window.innerWidth);
  }

  check() {
    if (this.screenWidth < 769) {
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
