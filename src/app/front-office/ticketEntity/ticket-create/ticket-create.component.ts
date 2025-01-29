import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TicketEntityInput} from '../../../models/models';
import {TicketEntityService} from '../service/ticket-entity.service';
import {gql} from '@apollo/client/core';

@Component({
  selector: 'app-ticket-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './ticket-create.component.html',
  styleUrl: './ticket-create.component.scss'
})
export class TicketCreateComponent implements OnInit {

  eventId: string = "";
  typeId: string = "";
  userId: string = "6787f20c9a1a3e6163533ff3";

  createTicketEntityMutation = gql`
    mutation createTicketEntity($userId : String!, $input : TicketEntityInput!){
      createTicketEntity(userId: $userId ,input: $input ){
        id
        eventId
        ticketTypeId
        order
        createdDate
        lastModifiedDate
      }
    }

  `

  constructor(private route: ActivatedRoute, private router: Router,
              private ticketService: TicketEntityService) {

  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params["eventId"];
    this.typeId = this.route.snapshot.params["typeId"];
  }

  onCreateTicket() {
    const payload: TicketEntityInput = {
      eventId: this.eventId,
      ticketTypeId: this.typeId,
      order: Math.random().toString()
    };
    this.createTicket(payload);
  }

  private createTicket(payload: TicketEntityInput) {
    this.ticketService.mutate(this.createTicketEntityMutation,
      {
        userId: this.userId,
        input: payload
      })
      .subscribe({
        next: event => {
          if (event.errors && event.errors.length > 0) {
            console.log(event.errors[0].message);
            throw new Error(event.errors[0].message);
          }
          const createdTicket = event.data.createTicketEntity;
          console.log(createdTicket);
          this.router.navigate(["account",this.userId])
        },
        error: err => console.log(err)
      })
  }
}
