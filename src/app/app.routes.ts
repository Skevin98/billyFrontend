import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'events',
    loadChildren: () => import('./event/event.module')
      .then((m) => m.EventModule)
  },
];
