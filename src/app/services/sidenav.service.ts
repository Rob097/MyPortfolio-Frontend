import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'


@Injectable()
export class SidenavService {

  public screenHeight$: Subject<number> = new Subject();
  public screenWidth$: Subject<number> = new Subject();
  // With this subject you can save the sidenav state and consumed later into other pages.
  public sideNavState$: Subject<boolean> = new Subject();

  constructor() { }

}