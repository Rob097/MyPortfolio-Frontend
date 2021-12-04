import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Constants } from '../../../../assets/global-constants';
import { LanguagesService } from 'src/app/services/languages.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  sidenav!: MatSidenav;
  @Input()
  comunicationNav!: MatSidenav;

  //isDarkMode: boolean;
  selectedLanguage!: string;
  isVisible: boolean;
  isDark = false;
  themeColor: 'primary' | 'accent' | 'warn' = 'primary';

  constructor(
    private _sidenavService: SidenavService,
    private _themeService: ThemeService,
    private langService: LanguagesService,
    private overlayContainer: OverlayContainer
  ) {
    // Visible Sidebar
    this._sidenavService.sideNavVisible$.subscribe(res => {
      this.isVisible = res;
    });
    this.isVisible = this._sidenavService.isVisible();

    // Theme
    this._themeService.isDark$.subscribe(res => {
      this.isDark = res;
    });
    /*themeService.initTheme();
    this.isDarkMode = themeService.isDarkMode();*/

    // Traductions
    this.langService.currentLang$.subscribe(res => {
      this.selectedLanguage = res;
    });
    this.selectedLanguage = this.langService.initLang();
  }

  ngOnInit(): void {
    if (this.isVisible) {
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }
  }

  /* Toggle of visibleness of sidebar */
  toggleIsVisible() {
    if (this.sidenav.opened) {
      this.sidenav.close();
      this._sidenavService.setVisible(false);
    } else {
      this.sidenav.open();
      this._sidenavService.setVisible(true);
    }
  }

  /* Toggle of theme
  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();
    if (this.isDarkMode) {
      this.themeService.update(Constants.light);
    } else {
      this.themeService.update(Constants.dark);
    }
  }*/

  /* Method used to switch from one language to another */
  switchLang(lang: string) {
    this.langService.switchLang(lang);
  }
  getLangs(): string[]{
    return this.langService.getLangs();
  }


  /* Comunication Sidenav */
  togglComunicationSidenav() {
    if (this.comunicationNav.opened) {
      this.comunicationNav.close();
    } else {
      this.comunicationNav.open();
    }
    this._sidenavService.setComunicationsNavState(this.comunicationNav.opened);
  }

  toggleTheme(): void {
    this._themeService.toggleTheme();
  }

}
