import { Injectable } from '@angular/core';
import {ApolloClient, DocumentNode} from '@apollo/client';
import {from} from 'rxjs';
import {Event} from '../../../models/models';
import {ApolloService} from '../../../services/apollo.service';

@Injectable({
  providedIn: 'root'
})
export class TicketEntityService {

  private client: ApolloClient<any>;

  constructor(private apolloService: ApolloService) {
    this.client = apolloService.getClient();
  }

  query(query: DocumentNode, variables?: Object) {
    return from(
      this.client.query({
        query: query,
        variables: variables
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
