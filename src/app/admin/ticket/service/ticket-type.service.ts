import { Injectable } from '@angular/core';
import {ApolloService} from '../../../services/apollo.service';
import {ApolloClient} from '@apollo/client/core';
import {DocumentNode} from '@apollo/client';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketTypeService {
  private client: ApolloClient<any>;

  constructor(private apolloService: ApolloService) {
    this.client = apolloService.getClient();
  }

  query(query: DocumentNode, variables: Object) {
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
