import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ConstantsService } from 'src/app/services/constants.service';
import { LanguagesService } from 'src/app/services/languages.service';
import { SidenavService } from 'src/app/services/sidenav.service';
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

  isDarkMode: boolean;
  selectedLanguage!: string;

  isVisible: boolean;

  constructor(
    private _sidenavService: SidenavService,
    private themeService: ThemeService,
    private langService: LanguagesService,
    private cs: ConstantsService
  ) {
    // Visible Sidebar
    this.isVisible = this._sidenavService.isVisible();

    // Theme
    themeService.initTheme();
    this.isDarkMode = themeService.isDarkMode();

    // Traductions
    this.initLang();
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

  /* Toggle of theme */
  toggleDarkMode() {
    this.isDarkMode = this.themeService.isDarkMode();
    if (this.isDarkMode) {
      this.themeService.update(this.cs.light);
    } else {
      this.themeService.update(this.cs.dark);
    }
  }

  /* Initialization of language */
  initLang() {
    this.selectedLanguage = this.langService.initLang();
  }
  /* Method used to switch from one language to another */
  switchLang(lang: string) {
    this.selectedLanguage = lang;
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

}
