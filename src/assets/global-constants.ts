export class Constants {

  /* Constants used multiple times into the project */
  public static open: string = 'open';
  public static close: string = 'close';
  public static show: string = 'show';
  public static hide: string = 'hide';

  public static light: string = 'light-mode';
  public static dark: string = 'dark-mode';

  // LocalStorage variable used to save the state of the theme. The options are light-mode if it's light or dark-mode if it's dark.
  public static localStorageThemeOption: string = 'user-theme';
  // LocalStorage variable used to save the state of the sidebar. The options are true if it's open big or false if it's open small.
  public static localStorageSidebarStateOption: string = 'sidebar-state';
  // LocalStorage variable used to save the visible of the sidebar. The options are true if it's opened or false if it's closed.
  public static localStorageSidebarVisibleOption: string = 'sidebar-visible';
  // LocalStorage variable used to save the lang of traductions.
  public static localStorageLang: string = 'lang';


  public static DOMAIN: string = "https://rob-portoflio-1997.herokuapp.com";
  //public static DOMAIN: string = "http://localhost:8080";
  public static TOKEN_COOKIE: string = "token";
  public static REMEMBER_COOKIE = "rememberMe";

  public static TOKEN_KEY: string = "auth-token";
  public static USER_KEY = "auth-user";
  public static TOKEN_HEADER_KEY = "Authorization";

}
