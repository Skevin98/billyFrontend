import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then((m) => m.AdminModule)
  },
  {
    path: '',
    loadChildren: () => import('./front-office/front-office.module')
      .then((m) => m.FrontOfficeModule)
  },
];
