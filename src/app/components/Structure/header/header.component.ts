import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { Observer } from 'rxjs';
import { ConstantsService } from 'src/app/services/constants.service';
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
  isVisible: boolean;

  constructor(
    public translate: TranslateService,
    private _sidenavService: SidenavService,
    private themeService:  ThemeService,
    private cs: ConstantsService
  ) {

    // Traductions
    translate.addLangs(['en', 'it']);
    translate.setDefaultLang('en');
    this.selectedLanguage = 'en';

    // Theme
    themeService.initTheme();
    this.isDarkMode = themeService.isDarkMode();

    // Visible Sidebar
    this.isVisible = this.getIsVisible();
  }

  ngOnInit(): void {

    if(this.isVisible){
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }

  }

  getIsVisible(){
    if(localStorage.getItem(this.cs.localStorageSidebarVisibleOption) != null && localStorage.getItem(this.cs.localStorageSidebarVisibleOption) === 'false'){
      return false;
    }
    return true;
  }

  toggleIsVisible(){

    if(this.sidenav.opened){
      this.sidenav.close();
      localStorage.setItem(this.cs.localStorageSidebarVisibleOption, ''+false);
    }else{
      this.sidenav.open();
      localStorage.setItem(this.cs.localStorageSidebarVisibleOption, ''+true);
    }

  }

  toggleDarkMode(){
    this.isDarkMode = this.themeService.isDarkMode();
    if(this.isDarkMode){
      this.themeService.update('light-mode');
    } else {
      this.themeService.update('dark-mode');
    }
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.selectedLanguage = lang;
  }

}
