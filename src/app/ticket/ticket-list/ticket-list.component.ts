import {Component, Input} from '@angular/core';
import {TicketType} from '../../models/models';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  imports: [
    RouterLink
  ],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss',
})
export class TicketListComponent {

  @Input() ticketTypes?: TicketType[] = []

  constructor(private router: Router, private route: ActivatedRoute,) {
  }

  goToUpsertTicketType(type: TicketType) {
    this.router.navigate(['tickets', type.id], {
      relativeTo: this.route,
      state: {
        type: type
      }
    });
  }
}
