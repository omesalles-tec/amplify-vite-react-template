/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Household = {
  __typename: "Household",
  createdAt: string,
  householdName: string,
  id: string,
  updatedAt: string,
};

export type Requests = {
  __typename: "Requests",
  adminEmail: string,
  createdAt: string,
  id: string,
  updatedAt: string,
  userEmail: string,
  userId: string,
};

export type User = {
  __typename: "User",
  adminFlag: boolean,
  anonymousFlag: boolean,
  anonymousLabel?: string | null,
  createdAt: string,
  email?: string | null,
  householdID: string,
  id: string,
  tags?: Array< string | null > | null,
  updatedAt: string,
};

export type ModelHouseholdFilterInput = {
  and?: Array< ModelHouseholdFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  householdName?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelHouseholdFilterInput | null,
  or?: Array< ModelHouseholdFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelHouseholdConnection = {
  __typename: "ModelHouseholdConnection",
  items:  Array<Household | null >,
  nextToken?: string | null,
};

export type ModelRequestsFilterInput = {
  adminEmail?: ModelStringInput | null,
  and?: Array< ModelRequestsFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelRequestsFilterInput | null,
  or?: Array< ModelRequestsFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
  userEmail?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type ModelRequestsConnection = {
  __typename: "ModelRequestsConnection",
  items:  Array<Requests | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  adminFlag?: ModelBooleanInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  anonymousFlag?: ModelBooleanInput | null,
  anonymousLabel?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  householdID?: ModelIDInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserFilterInput | null,
  or?: Array< ModelUserFilterInput | null > | null,
  tags?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelHouseholdConditionInput = {
  and?: Array< ModelHouseholdConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  householdName?: ModelStringInput | null,
  not?: ModelHouseholdConditionInput | null,
  or?: Array< ModelHouseholdConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateHouseholdInput = {
  householdName: string,
  id?: string | null,
};

export type ModelRequestsConditionInput = {
  adminEmail?: ModelStringInput | null,
  and?: Array< ModelRequestsConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelRequestsConditionInput | null,
  or?: Array< ModelRequestsConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
  userEmail?: ModelStringInput | null,
  userId?: ModelStringInput | null,
};

export type CreateRequestsInput = {
  adminEmail: string,
  id?: string | null,
  userEmail: string,
  userId: string,
};

export type ModelUserConditionInput = {
  adminFlag?: ModelBooleanInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  anonymousFlag?: ModelBooleanInput | null,
  anonymousLabel?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  householdID?: ModelIDInput | null,
  not?: ModelUserConditionInput | null,
  or?: Array< ModelUserConditionInput | null > | null,
  tags?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateUserInput = {
  adminFlag: boolean,
  anonymousFlag: boolean,
  anonymousLabel?: string | null,
  email?: string | null,
  householdID: string,
  id?: string | null,
  tags?: Array< string | null > | null,
};

export type DeleteHouseholdInput = {
  id: string,
};

export type DeleteRequestsInput = {
  id: string,
};

export type DeleteUserInput = {
  id: string,
};

export type UpdateHouseholdInput = {
  householdName?: string | null,
  id: string,
};

export type UpdateRequestsInput = {
  adminEmail?: string | null,
  id: string,
  userEmail?: string | null,
  userId?: string | null,
};

export type UpdateUserInput = {
  adminFlag?: boolean | null,
  anonymousFlag?: boolean | null,
  anonymousLabel?: string | null,
  email?: string | null,
  householdID?: string | null,
  id: string,
  tags?: Array< string | null > | null,
};

export type ModelSubscriptionHouseholdFilterInput = {
  and?: Array< ModelSubscriptionHouseholdFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  householdName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionHouseholdFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionRequestsFilterInput = {
  adminEmail?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRequestsFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionRequestsFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userEmail?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  adminFlag?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  anonymousFlag?: ModelSubscriptionBooleanInput | null,
  anonymousLabel?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  householdID?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  tags?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type GetHouseholdQueryVariables = {
  id: string,
};

export type GetHouseholdQuery = {
  getHousehold?:  {
    __typename: "Household",
    createdAt: string,
    householdName: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type GetRequestsQueryVariables = {
  id: string,
};

export type GetRequestsQuery = {
  getRequests?:  {
    __typename: "Requests",
    adminEmail: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    userEmail: string,
    userId: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    adminFlag: boolean,
    anonymousFlag: boolean,
    anonymousLabel?: string | null,
    createdAt: string,
    email?: string | null,
    householdID: string,
    id: string,
    tags?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type ListHouseholdsQueryVariables = {
  filter?: ModelHouseholdFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListHouseholdsQuery = {
  listHouseholds?:  {
    __typename: "ModelHouseholdConnection",
    items:  Array< {
      __typename: "Household",
      createdAt: string,
      householdName: string,
      id: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListRequestsQueryVariables = {
  filter?: ModelRequestsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRequestsQuery = {
  listRequests?:  {
    __typename: "ModelRequestsConnection",
    items:  Array< {
      __typename: "Requests",
      adminEmail: string,
      createdAt: string,
      id: string,
      updatedAt: string,
      userEmail: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      adminFlag: boolean,
      anonymousFlag: boolean,
      anonymousLabel?: string | null,
      createdAt: string,
      email?: string | null,
      householdID: string,
      id: string,
      tags?: Array< string | null > | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateHouseholdMutationVariables = {
  condition?: ModelHouseholdConditionInput | null,
  input: CreateHouseholdInput,
};

export type CreateHouseholdMutation = {
  createHousehold?:  {
    __typename: "Household",
    createdAt: string,
    householdName: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type CreateRequestsMutationVariables = {
  condition?: ModelRequestsConditionInput | null,
  input: CreateRequestsInput,
};

export type CreateRequestsMutation = {
  createRequests?:  {
    __typename: "Requests",
    adminEmail: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    userEmail: string,
    userId: string,
  } | null,
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    adminFlag: boolean,
    anonymousFlag: boolean,
    anonymousLabel?: string | null,
    createdAt: string,
    email?: string | null,
    householdID: string,
    id: string,
    tags?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type DeleteHouseholdMutationVariables = {
  condition?: ModelHouseholdConditionInput | null,
  input: DeleteHouseholdInput,
};

export type DeleteHouseholdMutation = {
  deleteHousehold?:  {
    __typename: "Household",
    createdAt: string,
    householdName: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type DeleteRequestsMutationVariables = {
  condition?: ModelRequestsConditionInput | null,
  input: DeleteRequestsInput,
};

export type DeleteRequestsMutation = {
  deleteRequests?:  {
    __typename: "Requests",
    adminEmail: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    userEmail: string,
    userId: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    adminFlag: boolean,
    anonymousFlag: boolean,
    anonymousLabel?: string | null,
    createdAt: string,
    email?: string | null,
    householdID: string,
    id: string,
    tags?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type UpdateHouseholdMutationVariables = {
  condition?: ModelHouseholdConditionInput | null,
  input: UpdateHouseholdInput,
};

export type UpdateHouseholdMutation = {
  updateHousehold?:  {
    __typename: "Household",
    createdAt: string,
    householdName: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type UpdateRequestsMutationVariables = {
  condition?: ModelRequestsConditionInput | null,
  input: UpdateRequestsInput,
};

export type UpdateRequestsMutation = {
  updateRequests?:  {
    __typename: "Requests",
    adminEmail: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    userEmail: string,
    userId: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    adminFlag: boolean,
    anonymousFlag: boolean,
    anonymousLabel?: string | null,
    createdAt: string,
    email?: string | null,
    householdID: string,
    id: string,
    tags?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnCreateHouseholdSubscriptionVariables = {
  filter?: ModelSubscriptionHouseholdFilterInput | null,
};

export type OnCreateHouseholdSubscription = {
  onCreateHousehold?:  {
    __typename: "Household",
    createdAt: string,
    householdName: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type OnCreateRequestsSubscriptionVariables = {
  filter?: ModelSubscriptionRequestsFilterInput | null,
};

export type OnCreateRequestsSubscription = {
  onCreateRequests?:  {
    __typename: "Requests",
    adminEmail: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    userEmail: string,
    userId: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    adminFlag: boolean,
    anonymousFlag: boolean,
    anonymousLabel?: string | null,
    createdAt: string,
    email?: string | null,
    householdID: string,
    id: string,
    tags?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteHouseholdSubscriptionVariables = {
  filter?: ModelSubscriptionHouseholdFilterInput | null,
};

export type OnDeleteHouseholdSubscription = {
  onDeleteHousehold?:  {
    __typename: "Household",
    createdAt: string,
    householdName: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRequestsSubscriptionVariables = {
  filter?: ModelSubscriptionRequestsFilterInput | null,
};

export type OnDeleteRequestsSubscription = {
  onDeleteRequests?:  {
    __typename: "Requests",
    adminEmail: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    userEmail: string,
    userId: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    adminFlag: boolean,
    anonymousFlag: boolean,
    anonymousLabel?: string | null,
    createdAt: string,
    email?: string | null,
    householdID: string,
    id: string,
    tags?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateHouseholdSubscriptionVariables = {
  filter?: ModelSubscriptionHouseholdFilterInput | null,
};

export type OnUpdateHouseholdSubscription = {
  onUpdateHousehold?:  {
    __typename: "Household",
    createdAt: string,
    householdName: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRequestsSubscriptionVariables = {
  filter?: ModelSubscriptionRequestsFilterInput | null,
};

export type OnUpdateRequestsSubscription = {
  onUpdateRequests?:  {
    __typename: "Requests",
    adminEmail: string,
    createdAt: string,
    id: string,
    updatedAt: string,
    userEmail: string,
    userId: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    adminFlag: boolean,
    anonymousFlag: boolean,
    anonymousLabel?: string | null,
    createdAt: string,
    email?: string | null,
    householdID: string,
    id: string,
    tags?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};
