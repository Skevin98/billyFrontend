import { Injectable } from '@angular/core';
import {ApolloService} from '../../../services/apollo.service';
import {DocumentNode} from '@apollo/client';
import {from} from 'rxjs';
import {UserEntity} from '../../../models/models';
import {ApolloClient} from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get currentUser(): UserEntity | undefined {
    return this._currentUser;
  }

  set currentUser(value: UserEntity) {
    this._currentUser = value;
  }

  private _currentUser? : UserEntity;

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
