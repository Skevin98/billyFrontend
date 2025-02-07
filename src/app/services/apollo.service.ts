import { Injectable } from '@angular/core';
import { ApolloClient, HttpLink } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {


  private client : ApolloClient<any>;

  constructor() {
    this.client = new ApolloClient({
      link : new HttpLink({
        uri : environment.SERVER_URL
      }),
      cache: new InMemoryCache(),
    });
  }

  // TODO To refactor dependent services with client.watchQuery
  getClient() : ApolloClient<any> {
    return this.client;
  }
}
