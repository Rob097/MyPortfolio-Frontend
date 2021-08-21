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
  localStorageThemeOption: string = 'user-theme';

  localStorageSidebarStateOption: string = 'sidebar-state';
  localStorageSidebarVisibleOption: string = 'sidebar-visible';

  constructor() {}
}
