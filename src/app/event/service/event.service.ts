import {Injectable} from '@angular/core';
import {ApolloService} from '../../services/apollo.service';
import {ApolloClient, DocumentNode, gql} from '@apollo/client';
import {from} from 'rxjs';

import {Event} from '../../models/models';
import {query} from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  get eventList(): Event[] {
    return this._eventList;
  }

  set eventList(value: Event[]) {
    this._eventList = value;
  }
  private client: ApolloClient<any>;
  private _eventList: Event[]= [];

  constructor(private apolloService: ApolloService) {
    this.client = apolloService.getClient();
  }

  query(query: DocumentNode, ownerId: string) {
    return from(
      this.client.query({
        query: query,
        variables: {ownerId: ownerId}
      })
    );
  }

  mutate(mutation: DocumentNode, variables: Object) {
    return from(
      this.client.mutate({
        mutation: mutation,
        variables: variables
      })
    );
  }
}


