import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Constants } from '../../assets/global-constants';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  public screenHeight$: Subject<number> = new Subject();
  public screenWidth$: Subject<number> = new Subject();
  public sideNavState$: Subject<boolean> = new Subject();
  public sideNavVisible$: Subject<boolean> = new Subject();
  public comunicationNavState$: Subject<boolean> = new Subject();
  public hasBackdrop$: Subject<boolean> = new Subject();

  private _comunicationNavState: boolean;

  minimumWidth = 769; //If the width of the screen is less than this, it changes the sidebar behaviour.

  constructor() {
    this._comunicationNavState = false;
  }

  /* #################################
          PUBLIC STATE METHODS
  ##################################*/
  public getState(): boolean {
    return this.getSidenavState();
  }
  public setState(state: boolean) {
    this.setSidenavState(state);
  }

  /* #################################
        PUBLIC VISIBLE METHODS
  ##################################*/
  public isVisible(): boolean {
    return this.getSidenavVisible();
  }
  public setVisible(visible: boolean) {
    this.setSidenavVisible(visible);
  }

  /* #################################
          PRIVATE STATE METHODS
  ##################################*/
  /* Save state into localStorage */
  private setSidenavState(state: boolean) {
    this.sideNavState$.next(state);
    localStorage.setItem(Constants.localStorageSidebarStateOption, '' + state);
  }
  /* Get state from localStorage */
  private getSidenavState(): boolean {

    const currentState = localStorage.getItem(
      Constants.localStorageSidebarStateOption
    );
    let booleanValue: boolean;

    if (currentState != null) {
      booleanValue = currentState === 'true';
    } else {
      booleanValue = false;
    }

    this.setSidenavState(booleanValue);
    return booleanValue;
  }

  /* #################################
        PRIVATE VISIBLE METHODS
  ##################################*/
  /* Save state into localStorage */
  private setSidenavVisible(visible: boolean) {
    this.sideNavVisible$.next(visible);
    localStorage.setItem(
      Constants.localStorageSidebarVisibleOption,
      '' + visible
    );
    this.hasBackdrop();
  }
  /* Get state from localStorage */
  private getSidenavVisible(): boolean {
    const currentVisible = localStorage.getItem(
      Constants.localStorageSidebarVisibleOption
    );
    let booleanValue: boolean;

    if (currentVisible != null) {
      booleanValue = currentVisible === 'true';
    } else {
      booleanValue = false;
    }

    this.setSidenavVisible(booleanValue);

    return booleanValue;
  }

  /* #################################
  COMUNICATIONS PUBLIC STATE METHODS
  ##################################*/
  /* Save state into localStorage */
  public setComunicationsNavState(state: boolean) {
    this.comunicationNavState$.next(state);
    this._comunicationNavState = state;
    this.hasBackdrop();
  }
  public getComunicationsNavState() {
    return this._comunicationNavState;
  }

  hasBackdrop(): boolean {
    let check = false;

    if (this.getComunicationsNavState()) {
      check = true;
    }else{

      check = window.innerWidth < this.minimumWidth;

    }
    this.hasBackdrop$.next(check);
    return check;

  }

}
