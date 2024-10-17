/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateHousehold = /* GraphQL */ `subscription OnCreateHousehold($filter: ModelSubscriptionHouseholdFilterInput) {
  onCreateHousehold(filter: $filter) {
    createdAt
    householdName
    id
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateHouseholdSubscriptionVariables,
  APITypes.OnCreateHouseholdSubscription
>;
export const onCreateRequests = /* GraphQL */ `subscription OnCreateRequests($filter: ModelSubscriptionRequestsFilterInput) {
  onCreateRequests(filter: $filter) {
    adminEmail
    createdAt
    id
    updatedAt
    userEmail
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateRequestsSubscriptionVariables,
  APITypes.OnCreateRequestsSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onDeleteHousehold = /* GraphQL */ `subscription OnDeleteHousehold($filter: ModelSubscriptionHouseholdFilterInput) {
  onDeleteHousehold(filter: $filter) {
    createdAt
    householdName
    id
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteHouseholdSubscriptionVariables,
  APITypes.OnDeleteHouseholdSubscription
>;
export const onDeleteRequests = /* GraphQL */ `subscription OnDeleteRequests($filter: ModelSubscriptionRequestsFilterInput) {
  onDeleteRequests(filter: $filter) {
    adminEmail
    createdAt
    id
    updatedAt
    userEmail
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteRequestsSubscriptionVariables,
  APITypes.OnDeleteRequestsSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onUpdateHousehold = /* GraphQL */ `subscription OnUpdateHousehold($filter: ModelSubscriptionHouseholdFilterInput) {
  onUpdateHousehold(filter: $filter) {
    createdAt
    householdName
    id
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateHouseholdSubscriptionVariables,
  APITypes.OnUpdateHouseholdSubscription
>;
export const onUpdateRequests = /* GraphQL */ `subscription OnUpdateRequests($filter: ModelSubscriptionRequestsFilterInput) {
  onUpdateRequests(filter: $filter) {
    adminEmail
    createdAt
    id
    updatedAt
    userEmail
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateRequestsSubscriptionVariables,
  APITypes.OnUpdateRequestsSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
