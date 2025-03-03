import {Routes} from '@angular/router';
import {EventListComponent} from './event-list/event-list.component';
import {EventUpsertComponent} from './event-upsert/event-upsert.component';
import {environment} from '../../../environments/environment';
import {TicketUpsertComponent} from '../ticket/ticket-upsert/ticket-upsert.component';
import {EventDetailsComponent} from './event-details/event-details.component';

export const eventRoutes: Routes = [
  {path: '', title: `Mes évènements - ${environment.title}`, component: EventListComponent},
  {path: 'details/:id', component: EventDetailsComponent},
  {path: 'upsert', title: `Créer un évènement - ${environment.title}`, component: EventUpsertComponent},
  {path: 'upsert/:id', title: `Modifier un évènement - ${environment.title}`, component: EventUpsertComponent},
  {path: 'upsert/:id/tickets', title: `Créer un type - ${environment.title}`, component: TicketUpsertComponent},
  {path: 'upsert/:id/tickets/:typeId', title: `Modifier un type - ${environment.title}`, component: TicketUpsertComponent},
]
