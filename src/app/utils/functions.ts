import {ApolloQueryResult, FetchResult} from '@apollo/client/core';


export function checkGraphQLError(response :  ApolloQueryResult<any> | FetchResult<any>){
  if (response.errors && response.errors.length > 0) {
    console.log(response.errors[0].message);
    throw new Error(response.errors[0].message);
  }
}
