import { trigger, state, style, transition, animate, animateChild, query } from '@angular/animations';

/** To update these two constants you have to update the respective values in /src/app/components/shared/_variables.scss */
const LARGE_SIDENAV_WIDTH = "280px";
const SMALL_SIDENAV_WIDTH = "90px";

/* Used into left-menu.content.html */
export const onSideNavChange = trigger('onSideNavChange', [
  state('close',
    style({
      'min-width': SMALL_SIDENAV_WIDTH
    })
  ),
  state('open',
    style({
      'min-width': LARGE_SIDENAV_WIDTH
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);

/* Used into app.component.html */
export const onMainContentChange = trigger('onMainContentChange', [
  state('close',
    style({
      'margin-left': SMALL_SIDENAV_WIDTH
    })
  ),
  state('open',
    style({
      'margin-left': LARGE_SIDENAV_WIDTH
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);

/* Used into left-menu.content.html */
export const animateText = trigger('animateText', [
  state('hide',
    style({
      'display': 'none',
      opacity: 0,
    })
  ),
  state('show',
    style({
      'display': 'block',
      opacity: 1,
    })
  ),
  transition('close => open', animate('350ms ease-in')),
  transition('open => close', animate('200ms ease-out')),
]);
