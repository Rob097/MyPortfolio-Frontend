import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ConstantsService } from './constants.service';

/* The service itself is a class that the CLI generated and that's decorated with @Injectable.
By default, this decorator is configured with a providedIn property, which creates a provider for the service.
In this case, providedIn: 'root' specifies that the service should be provided in the root injector. */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2; //Used to change theme
  private colorTheme!: string;
  private cs: ConstantsService;

  constructor(rendererFactory: RendererFactory2, constantsService: ConstantsService) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.cs = constantsService;
  }

  /* Here, I retrive the current set theme and add the relative class to the body DOM element. */
  initTheme() {
    this.getColorTheme();
    this.renderer.addClass(document.body, this.colorTheme);
  }

  /* Update the theme */
  update(theme: string) {
    this.setColorTheme(theme);
    const previousColorTheme =
      theme === this.cs.dark ? this.cs.light : this.cs.dark;
    this.renderer.removeClass(document.body, previousColorTheme);
    this.renderer.addClass(document.body, theme);
  }

  isDarkMode() {
    return this.colorTheme === this.cs.dark;
  }

  /* Save theme into localStorage */
  private setColorTheme(theme: string) {
    this.colorTheme = theme;
    localStorage.setItem(this.cs.localStorageThemeOption, theme);
  }

  /* Get theme from localStorage */
  private getColorTheme() {
    const currentTheme = localStorage.getItem(this.cs.localStorageThemeOption);

    this.colorTheme = currentTheme!=null ? currentTheme : this.cs.light;

  }
}
