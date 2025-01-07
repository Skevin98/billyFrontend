import {Component, Input} from '@angular/core';
import {TicketType} from '../../models/models';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  imports: [
    RouterLink
  ],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss',
})
export class TicketListComponent {

  @Input() ticketTypes? : TicketType[] = []

}
