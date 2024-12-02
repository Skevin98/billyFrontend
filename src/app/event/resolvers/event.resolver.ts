import {inject} from '@angular/core';
import { ResolveFn } from '@angular/router';
import {EventService} from '../service/event.service';
import {Event} from '../../models/models';
import {ApolloQueryResult, gql} from '@apollo/client/core';
import {Observable} from 'rxjs';

const eventByIdQuery = gql`
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
    }
  }`

export const eventResolver: ResolveFn<Observable<ApolloQueryResult<any>>> = (route, state) => {
  return inject(EventService).query( eventByIdQuery , route.paramMap.get('id')!);
};
