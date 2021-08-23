import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {

  /* Constants used multiple times into the project */
  open: string = 'open';
  close: string = 'close';
  show: string = 'show';
  hide: string = 'hide';

  light: string = 'light-mode';
  dark: string = 'dark-mode';

  // LocalStorage variable used to save the state of the theme. The options are light-mode if it's light or dark-mode if it's dark.
  localStorageThemeOption: string = 'user-theme';
  // LocalStorage variable used to save the state of the sidebar. The options are true if it's open big or false if it's open small.
  localStorageSidebarStateOption: string = 'sidebar-state';
  // LocalStorage variable used to save the visible of the sidebar. The options are true if it's opened or false if it's closed.
  localStorageSidebarVisibleOption: string = 'sidebar-visible';
  // LocalStorage variable used to save the lang of traductions.
  localStorageLang: string = 'lang';

  constructor() {}
}
