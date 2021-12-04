import { Component, OnInit, Inject } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';
import { HostListener } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { Constants } from '../assets/global-constants';
import { AuthenticationService } from './services/authentication.service';
import { TokenStorageService } from './services/token-storage.service';
import { DOCUMENT } from '@angular/common';

const MAX_RADIUS = 100;
const MIN_RADIUS = 10;

/*
This component is the root component of the application.
The animation specified in the Component decorator are the animation used when the sidebar changes status.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onMainContentChange],
})
export class AppComponent implements OnInit {

  // Authentication parameters
  private roles: string[] = [];
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  title = 'Angular';
  minimumWidth = 769; //If the width of the screen is less than this, it changes the sidebar behaviour.
  screenWidth!: number; //Used to know the size of the screen. When it's small the sidebar go over the content.
  onSideNavChange: boolean;
  comunicationNavState: boolean;
  sideNavVisible: boolean;
  //isDarkMode: boolean;
  hasBackdrop!: boolean;
  radius: number = MAX_RADIUS; //Radius od content window
  radiusTmp: number = MAX_RADIUS; // Temporary radius value, used to calculate the real radius
  lastScrollTop = 0;
  isDark: boolean = false;
  themeColor: 'primary' | 'accent' | 'warn' = 'primary';

  constructor(
    private _themeService: ThemeService,
    private _sidenavService: SidenavService,
    private authenticationService: AuthenticationService,
    private tokenStorageService: TokenStorageService,
    @Inject(DOCUMENT) private document: HTMLDocument
  ) {

    //Controllo se l'utente è loggato e vuole essere ricordato, altrimenti elimino i cookie
    //this.authenticationService.firstCheckIsLogged();

    // Sidenav state
    this._sidenavService.sideNavState$.subscribe((res) => {
      this.onSideNavChange = res;
    });
    this.onSideNavChange = this._sidenavService.getState();

    // Sidenav visible
    this._sidenavService.sideNavVisible$.subscribe((res) => {
      this.sideNavVisible = res;
    });
    this.sideNavVisible = this._sidenavService.isVisible();

    // ComunicationNav state
    this._sidenavService.comunicationNavState$.subscribe((res) => {
      this.comunicationNavState = res;
    });
    this.comunicationNavState = this._sidenavService.getComunicationsNavState();

    // Has Backdrop property
    this._sidenavService.hasBackdrop$.subscribe(res => {
      this.hasBackdrop = res;
    });

    // Screen width
    this._sidenavService.screenWidth$.subscribe((res) => {
      this.screenWidth = res;
    });

    // Theme
    this._themeService.isDark$.subscribe(res => {
      this.isDark = res;
    });
    /*this.themeService.initTheme();
    this.isDarkMode = this.themeService.isDarkMode();*/
  }

  ngOnInit() {
    /*const body = document.getElementsByTagName("mat-sidenav-content");
    if(body && body[0]){
      if(this.isDarkMode){
        body[0].classList.remove(Constants.light);
        body[0].classList.add(Constants.dark);
      } else {
        body[0].classList.remove(Constants.dark);
        body[0].classList.add(Constants.light);
      }
    }*/
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this._sidenavService.screenHeight$.next(window.innerHeight);
    this._sidenavService.screenWidth$.next(window.innerWidth);
    this._sidenavService.hasBackdrop();
  }

  /* Function used to send the state to the animation.ts depending on screen width
  If the width is greater than the minimum it will be side byside, otherwise it will be over the content.
  */
  check() {
    if(window.innerWidth >= this.minimumWidth){
      if (!this.sideNavVisible) {
        return '';
      } else {
        if (this.onSideNavChange) {
          return Constants.open;
        } else {
          return Constants.close;
        }
      }
    } else {
      return '';
    }
  }

  /* DisableClose for rightside sidenav */
  disableClose(): boolean{
    if(window.innerWidth >= this.minimumWidth){
      return true;
    }else{
      return false;
    }
  }

  /* On scroll, alter radius of content window*/
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    var lastScrollTop = this.lastScrollTop;
    var actualScrollTop = window.pageYOffset || event.target.scrollTop;

    if (actualScrollTop > lastScrollTop) {
      // downscroll code
      this.radiusTmp -= (actualScrollTop-lastScrollTop)/5;
    } else {
      // upscroll code
      this.radiusTmp += (lastScrollTop-actualScrollTop)/5;
    }

    // Limits
    if(this.radiusTmp >= MIN_RADIUS && this.radiusTmp <= MAX_RADIUS){
      this.radius = this.radiusTmp
    } else if(this.radiusTmp < MIN_RADIUS) {
      this.radius = MIN_RADIUS;
    } else if(this.radiusTmp > MAX_RADIUS) {
      this.radius = MAX_RADIUS;
    }

    this.lastScrollTop = actualScrollTop <= 0 ? 0 : actualScrollTop; // For Mobile or negative scrolling
  }

}
