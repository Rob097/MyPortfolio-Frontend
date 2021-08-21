import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs'
import { ConstantsService } from './constants.service';


@Injectable()
export class SidenavService {

  public screenHeight$: Subject<number> = new Subject();
  public screenWidth$: Subject<number> = new Subject();
  // With this subject you can save the sidenav state and consumed later into other pages.
  public sideNavState$: Subject<boolean> = new Subject();

  private cs: ConstantsService;

  constructor(constantsService: ConstantsService) {
    this.cs = constantsService;
  }

  public getState(): boolean {
    return this.getSidenavState();
  }
  public setState(state: boolean){
    this.setSidenavState(state);
  }


  /* Save state into localStorage */
  private setSidenavState(state: boolean) {
    this.sideNavState$.next(state);

    localStorage.setItem(this.cs.localStorageSidebarStateOption, ''+state);
  }
  /* Get state from localStorage */
  private getSidenavState(): boolean {
    const currentState = localStorage.getItem(this.cs.localStorageSidebarStateOption);
    let booleanValue: boolean;

    if( currentState!=null){
       booleanValue = currentState === 'true';
    } else {
      booleanValue = false;
    }

    this.setSidenavState(booleanValue);

    return booleanValue;

  }

}
