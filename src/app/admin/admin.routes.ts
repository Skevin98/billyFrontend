import {Routes} from '@angular/router';
import {environment} from '../../environments/environment';
import {EventListComponent} from './event/event-list/event-list.component';
import {EventDetailsComponent} from './event/event-details/event-details.component';
import {EventUpsertComponent} from './event/event-upsert/event-upsert.component';
import {TicketUpsertComponent} from './ticket/ticket-upsert/ticket-upsert.component';
import {eventRoutes} from './event/event.routes';

export const adminRoutes: Routes = [
  ...eventRoutes
]
