import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {EventService} from '../service/event.service';
import {Event, EventInput, EventStatus} from '../../models/models';
import {gql} from '@apollo/client/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TicketListComponent} from '../../ticket/ticket-list/ticket-list.component';

@Component({
  selector: 'app-event-upsert',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, TicketListComponent],
  templateUrl: './event-upsert.component.html',
  styleUrl: './event-upsert.component.scss'
})
export class EventUpsertComponent implements OnInit {

  eventByIdQuery = gql`
    query eventById($id: String!){
      eventById(id: $id){
        id
        ownerId
        name
        description
        startDate
        endDate
        createdDate
        lastModifiedDate
        eventStatus
        ticketTypes{
          id
          title
          price
          description
        }
      }
    }`

  createMutation = gql`
    mutation createEvent($input : EventInput!){
      createEvent(input: $input){
        id
        ownerId
        name
        description
        startDate
        endDate
        createdDate
        lastModifiedDate
      }
    }`;

  updateMutation = gql`
  mutation updateEvent($eventId : String! ,$input : EventInput!){
    updateEvent(eventId: $eventId , input: $input){
      id
      name
      description
      startDate
      endDate
      createdDate
      lastModifiedDate
    }
  }`


  eventFormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl(''),
    ownerId: new FormControl('angular'),
    eventStatus : new FormControl(EventStatus.SCHEDULED)
  })

  foundEvent? : Event;


  constructor(private eventService: EventService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.foundEvent = this.eventService.eventList.find(x => x.id == id);
    if (!!this.foundEvent) {
      this.resetEventForm();

    } else {
      this.getEventById(id);
    }
  }

  onUpsertEvent() {
    const value = this.eventFormGroup.value as EventInput;
    const data = {
      ...value,
      startDate: value.startDate+":00.000Z",
      endDate: value.endDate ? value.endDate+":00.000Z" : undefined,
    }

    console.log(data);
    if (data.id) {
      this.updateEvent(data);
      return;
    }
    this.createEvent(data);
  }

  private createEvent(data: EventInput) {
    this.eventService.mutate(this.createMutation, {input : data}).subscribe(
      {
        next: event => {
          if (event.errors && event.errors.length > 0) {
            console.log(event.errors[0].message);
            throw new Error(event.errors[0].message);
          }
          const createdEvent = event.data.createEvent;
          console.log(createdEvent);
        },
        error: err => {
          console.log(err);
        }

      }
    );
  }

  private updateEvent(data: EventInput) {
    this.eventService.mutate(this.updateMutation, {eventId : data.id ,input : data})
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

  private getEventById(id: string) {
    this.eventService.query(this.eventByIdQuery, {id : id}).subscribe(
      {
        next: event => {
          if (event.errors && event.errors.length > 0) {
            console.log(event.errors[0].message);
            throw new Error(event.errors[0].message);
          }
          console.log(event.data.eventById);
          this.foundEvent = event.data.eventById;
          this.resetEventForm();
        },
        error: err => {
          console.log(err);
        }

      }
    )
  }

  private resetEventForm() {
    const startDate = this.foundEvent!.startDate.substring(0, 16);
    const endDate = this.foundEvent!.endDate?.substring(0, 16);

    let eventToUpdate = {
      ...this.foundEvent,
      startDate: startDate,
      endDate: endDate,
    }
    this.eventFormGroup.reset(eventToUpdate);
  }
}
