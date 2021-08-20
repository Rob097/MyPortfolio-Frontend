import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  sidenav!: MatSidenav;

  isDarkMode: boolean;
  selectedLanguage: string;
  
  constructor(
    public translate: TranslateService,
    private _sidenavService: SidenavService, 
    private themeService:  ThemeService
  ) {

    // Traduzioni
    translate.addLangs(['en', 'it']);
    translate.setDefaultLang('en');
    this.selectedLanguage = 'en';

    themeService.initTheme();
    this.isDarkMode = themeService.isDarkMode();
  
  }

  ngOnInit(): void {
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.selectedLanguage = lang;
  }

  toggle(){
    this.sidenav.toggle();
    this._sidenavService.sideNavState$.next(undefined);
  }

  toggleDarkMode(){
    this.isDarkMode = this.themeService.isDarkMode();
    if(this.isDarkMode){
      this.themeService.update('light-mode');
    } else {
      this.themeService.update('dark-mode');
    }
  }

}
