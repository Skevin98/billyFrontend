import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'events',
    loadChildren: () => import('./event/event.module')
      .then((m) => m.EventModule)
  },
  {
    path: '',
    loadChildren: () => import('./front-office/front-office.module')
      .then((m) => m.FrontOfficeModule)
  },
];
