import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import { Event } from '../../../models/models';
import {gql} from '@apollo/client/core';

describe('EventService', () => {
  let service: EventService;

  let  createMutation = gql`
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

  let datas = {
      CreatedDate: "2024-11-21T15:36:15.656Z",
      Description: "New event description",
      EndDate: "2024-11-29T19:01:13.590Z",
      LastModifiedDate: "2024-11-21T15:36:15.656Z",
      Name: "New Event Updated",
      OwnerId: "graphql",
      StartDate: "2024-11-19T19:01:13.590Z"
    };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventService);
  });

  // it('should add an event to the db', () => {
  //   service.mutate(createMutation,datas).subscribe(
  //     {
  //       next: event => {
  //         if (event.errors && event.errors.length > 0) {
  //           console.log(event.errors[0].message);
  //           throw new Error(event.errors[0].message);
  //         }
  //         let createdEvent : Event = event.data.createEvent;
  //         expect(createdEvent.id).toBeTruthy();
  //       },
  //       error: err => {
  //         console.log(err);
  //       }
  //
  //     }
  //   );
  // })
});
