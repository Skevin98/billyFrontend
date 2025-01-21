import {Routes} from '@angular/router';
import {environment} from '../../environments/environment';
import {EventListComponent} from './events/event-list/event-list.component';


export const frontOfficeRoutes: Routes = [
  {path: '', title: `Home Page - ${environment.title}`, component: EventListComponent},
]
