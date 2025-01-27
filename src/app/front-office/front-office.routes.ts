import {Routes} from '@angular/router';
import {environment} from '../../environments/environment';
import {EventListComponent} from './events/event-list/event-list.component';
import {TicketCreateComponent} from './ticketEntity/ticket-create/ticket-create.component';


export const frontOfficeRoutes: Routes = [
  {path: '', title: `Home Page - ${environment.title}`, component: EventListComponent},
  {path: 'ticket/:eventId/type/:typeId', title: `Reservation - ${environment.title}`, component: TicketCreateComponent},
]
