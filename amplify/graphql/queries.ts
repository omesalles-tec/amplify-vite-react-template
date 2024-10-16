/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getHousehold = /* GraphQL */ `query GetHousehold($id: ID!) {
  getHousehold(id: $id) {
    createdAt
    householdName
    id
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetHouseholdQueryVariables,
  APITypes.GetHouseholdQuery
>;
export const getRequests = /* GraphQL */ `query GetRequests($id: ID!) {
  getRequests(id: $id) {
    adminEmail
    createdAt
    id
    updatedAt
    userEmail
    userId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetRequestsQueryVariables,
  APITypes.GetRequestsQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    adminFlag
    anonymousFlag
    anonymousLabel
    createdAt
    email
    householdID
    id
    tags
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listHouseholds = /* GraphQL */ `query ListHouseholds(
  $filter: ModelHouseholdFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listHouseholds(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      householdName
      id
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListHouseholdsQueryVariables,
  APITypes.ListHouseholdsQuery
>;
export const listRequests = /* GraphQL */ `query ListRequests(
  $filter: ModelRequestsFilterInput
  $limit: Int
  $nextToken: String
) {
  listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      adminEmail
      createdAt
      id
      updatedAt
      userEmail
      userId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListRequestsQueryVariables,
  APITypes.ListRequestsQuery
>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUsers(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      adminFlag
      anonymousFlag
      anonymousLabel
      createdAt
      email
      householdID
      id
      tags
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
