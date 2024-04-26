import {
  animateChild,
  style,
  transition,
  trigger,
  query,
  group,
  animate,
  animation,
} from '@angular/animations';

export const transitionAnimation = animation([
  style({
    height: '{{ height }}',
    opacity: '{{ opacity }}',
    backgroundColor: '{{ backgroundColor }}',
  }),
  animate('{{ time }}'),
]);

export const slideInAnimation = trigger('routeAnimations', [
  transition('HomePage => JobIdPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ right: '-100%' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('300ms ease-out', style({ right: '100%' }))], {
        optional: true,
      }),
      query(':enter', [animate('300ms ease-out', style({ right: '0%' }))], {
        optional: true,
      }),
    ]),
  ]),
]);
