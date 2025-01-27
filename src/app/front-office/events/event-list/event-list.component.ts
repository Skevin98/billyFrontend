import { Component } from '@angular/core';
import {Event} from '../../../models/models';
import {gql} from '@apollo/client/core';
import {EventService} from '../../../event/service/event.service';
import {DocumentNode} from '@apollo/client';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {

  ownerId: string = 'angular';

  eventList: Event[] = [];

  allEventsQuery = gql`
    query allEvents{
      allEvents{
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

  constructor(private eventService : EventService) {
  }

  ngOnInit(): void {
    this.getAll( this.allEventsQuery);
  }

  getAll(allEventsQuery : DocumentNode){
    this.eventService.query(allEventsQuery).subscribe(
      {
        next: event => {
          if (event.errors && event.errors.length > 0) {
            console.log(event.errors[0].message);
            throw new Error(event.errors[0].message);
          }
          this.eventList = event.data.allEvents;

          // this.eventService.eventList = this.eventList.filter(_=>true);
          console.log(event.data.allEvents);
        },
        error: err => {
          console.log(err);
        }

      }
    )
  }
}
