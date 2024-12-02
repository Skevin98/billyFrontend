import {Routes} from '@angular/router';
import {AppComponent} from '../app.component';
import {EventListComponent} from './event-list/event-list.component';
import {EventUpsertComponent} from './event-upsert/event-upsert.component';
import {environment} from '../../environments/environment';

export const eventRoutes: Routes = [
  {path: '', title: `Mes évènements - ${environment.title}`, component: EventListComponent},
  {path: 'upsert', title: `Créer un évènement - ${environment.title}`, component: EventUpsertComponent},
  {path: 'upsert/:id', title: `Modifier un évènement - ${environment.title}`, component: EventUpsertComponent}
]
