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

  /* Here, I get the current theme and add the relative class to the body DOM element.*/
  initTheme() {
    const currentTheme = this.getColorTheme();
    if(currentTheme && currentTheme === Constants.dark){
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
      this.isDark = true;
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      this.isDark = false;
    }
    this.isDark$.next(this.isDark);
  }

  /* Get theme from localStorage*/
  private getColorTheme() {
    return localStorage.getItem(Constants.localStorageThemeOption);
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.isDark$.next(this.isDark);
    if (this.isDark) {
      this.overlayContainer.getContainerElement().classList.add('dark-theme');
      localStorage.setItem(Constants.localStorageThemeOption, Constants.dark);
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      localStorage.setItem(Constants.localStorageThemeOption, Constants.light);
    }
  }
}
