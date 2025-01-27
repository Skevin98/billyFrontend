import {Component, OnInit} from '@angular/core';
import {EventService} from '../service/event.service';
import {gql} from '@apollo/client/core';
import {DocumentNode} from '@apollo/client';
import {Event} from '../../models/models';
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
export class EventListComponent implements OnInit {

  ownerId: string = 'owner';

  eventList: Event[] = [];

  eventsByOwnerIdQuery = gql`
    query eventsByOwnerId($ownerId: String!){
      eventsByOwnerId(ownerId: $ownerId){
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
        this.getEventsByOwnerId( this.eventsByOwnerIdQuery ,this.ownerId);
    }

  getEventsByOwnerId(ownerByIdQuery : DocumentNode, ownerId : string){
    this.eventService.query(ownerByIdQuery, {ownerId : ownerId}).subscribe(
      {
        next: event => {
          if (event.errors && event.errors.length > 0) {
            console.log(event.errors[0].message);
            throw new Error(event.errors[0].message);
          }
          this.eventList = event.data.eventsByOwnerId;

          this.eventService.eventList = this.eventList.filter(_=>true);
          console.log(event.data.eventsByOwnerId);
        },
        error: err => {
          console.log(err);
        }

      }
    )
  }

}
