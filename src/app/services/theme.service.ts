import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';
import { Constants } from '../../assets/global-constants';

/* The service itself is a class that the CLI generated and that's decorated with @Injectable.
By default, this decorator is configured with a providedIn property, which creates a provider for the service.
In this case, providedIn: 'root' specifies that the service should be provided in the root injector. */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  public isDark$: Subject<boolean> = new Subject();
  isDark = false;
  themeColor: 'primary' | 'accent' | 'warn' = 'primary';

  constructor(
    private overlayContainer: OverlayContainer
  ) {}

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.isDark$.next(this.isDark);
    if (this.isDark) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
    } else {
      this.overlayContainer
        .getContainerElement()
        .classList.remove('dark-theme');
    }
  }






  /*
  private renderer: Renderer2; //Used to change theme
  private colorTheme!: string;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /* Here, I get the current theme and add the relative class to the body DOM element.
  initTheme() {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme);
  }

  /* Update the theme
  update(theme: string) {
    this.setColorTheme(theme);
    const previousColorTheme =
      theme === Constants.dark ? Constants.light : Constants.dark;
    this.renderer.removeClass(document.body, previousColorTheme);
    this.renderer.addClass(document.body, theme);

    const body = document.getElementsByTagName("mat-sidenav-content");
    if(body && body[0]){
      body[0].classList.remove(previousColorTheme);
      body[0].classList.add(theme);
    }
  }

  isDarkMode() {
    return this.colorTheme === Constants.dark;
  }

  /* Save theme into localStorage
  private setColorTheme(theme: string) {
    this.colorTheme = theme;
    localStorage.setItem(Constants.localStorageThemeOption, theme);
  }

  /* Get theme from localStorage
  private getColorTheme() {
    const currentTheme = localStorage.getItem(Constants.localStorageThemeOption);

    this.colorTheme = currentTheme!=null ? currentTheme : Constants.light;

  }*/
}
