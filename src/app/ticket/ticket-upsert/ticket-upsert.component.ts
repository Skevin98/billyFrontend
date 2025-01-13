import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {gql} from '@apollo/client/core';
import {EventInput, TicketType} from '../../models/models';
import {TicketTypeService} from '../service/ticket-type.service';

@Component({
  selector: 'app-ticket-upsert',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './ticket-upsert.component.html',
  styleUrl: './ticket-upsert.component.scss'
})
export class TicketUpsertComponent implements OnInit {

  ticketsByEventIdAndTicketIdQuery = gql`
    query ticketsByEventIdAndTicketId($typeId : String!, $eventId : String!){
      ticketsByEventIdAndTicketId(typeId: $typeId,eventId: $eventId){
        id
        description
        price
        title
      }
    }`

  createMutation = gql`
    mutation createTicketType($eventId : String!,$input : TicketTypeInput!){
      createTicketType(eventId: $eventId, input: $input){
        id
        price
        title
        description
        lastModifiedDate
        createdDate
      }
    }
  `;

  updateMutation = gql`
    mutation updateTicketType($eventId : String!,$typeId: String!,$input : TicketTypeInput!){
      updateTicketType(eventId: $eventId,typeId: $typeId, input: $input){
        id
        price
        title
        description
        lastModifiedDate
        createdDate
      }
    }
  `;

  ticketTypeFormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl<number>(0, [Validators.required]),
  });

  private eventId: string = '';
  private typeId: string = '';
  private type?: TicketType;

  constructor(private ticketTypeService: TicketTypeService,
              private route: ActivatedRoute,
              private router: Router) {
    this.type = this.router.getCurrentNavigation()?.extras?.state?.['type'];
    console.log(this.type)
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    this.typeId = this.route.snapshot.params['typeId'];
    if (!this.typeId){
      return;
    }
    if (!this.type) {
      this.getTicketTypeByEventIdAndTicketId(this.eventId, this.typeId);
    }
    else {
      this.ticketTypeFormGroup.reset(this.type)
    }
  }


  onUpsertEvent() {
    const data = this.ticketTypeFormGroup.value as EventInput;

    console.log(data);
    if (data.id) {
      this.updateTicketType(data);
      return;
    }
    this.createTicketType(data);
  }

  private updateTicketType(data: EventInput) {
    this.ticketTypeService.mutate(this.updateMutation,
      {
        eventId: this.eventId,
        typeId: this.typeId,
        input: data
      })
      .subscribe({
        next: event => {
          if (event.errors && event.errors.length > 0) {
            console.log(event.errors[0].message);
            throw new Error(event.errors[0].message);
          }
          const updatedEvent = event.data.updateEvent;
          console.log(updatedEvent);
        },
        error: err => {
          console.log(err);
        }
      });
  }

  private createTicketType(data: EventInput) {
    this.ticketTypeService.mutate(this.createMutation,
      {
        input: data,
        eventId: this.eventId,
      })
      .subscribe(
        {
          next: event => {
            if (event.errors && event.errors.length > 0) {
              console.log(event.errors[0].message);
              throw new Error(event.errors[0].message);
            }
            // const createdEvent = event.data.createEvent;
            console.log(event);
          },
          error: err => {
            console.log(err);
          }
        }
      );
  }


  private getTicketTypeByEventIdAndTicketId(eventId: string, typeId: string) {
    this.ticketTypeService.query(this.ticketsByEventIdAndTicketIdQuery, {eventId: eventId, typeId: typeId}).subscribe(
      {
        next: ticketType => {
          if (ticketType.errors && ticketType.errors.length > 0) {
            console.log(ticketType.errors[0].message);
            throw new Error(ticketType.errors[0].message);
          }
          console.log(ticketType.data.ticketsByEventIdAndTicketId);
          this.type = ticketType.data.ticketsByEventIdAndTicketId;
          this.ticketTypeFormGroup.reset(this.type)
        },
        error: err => {
          console.log(err);
        }

      }
    )
  }
}
