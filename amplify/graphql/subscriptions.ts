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
export const onCreateIngredients = /* GraphQL */ `subscription OnCreateIngredients(
  $filter: ModelSubscriptionIngredientsFilterInput
) {
  onCreateIngredients(filter: $filter) {
    createdAt
    id
    items {
      nextToken
      __typename
    }
    maxLifespan
    name
    unit
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateIngredientsSubscriptionVariables,
  APITypes.OnCreateIngredientsSubscription
>;
export const onCreateIngredientsShoppingLists = /* GraphQL */ `subscription OnCreateIngredientsShoppingLists(
  $filter: ModelSubscriptionIngredientsShoppingListsFilterInput
) {
  onCreateIngredientsShoppingLists(filter: $filter) {
    createdAt
    householdId
    id
    ingredientsId
    ingredientsName
    ingredientsQty
    name
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateIngredientsShoppingListsSubscriptionVariables,
  APITypes.OnCreateIngredientsShoppingListsSubscription
>;
export const onCreateItems = /* GraphQL */ `subscription OnCreateItems($filter: ModelSubscriptionItemsFilterInput) {
  onCreateItems(filter: $filter) {
    changeOfUnit
    createdAt
    description
    id
    ingredient {
      createdAt
      id
      maxLifespan
      name
      unit
      updatedAt
      __typename
    }
    ingredientId
    link
    price
    quantity
    supermarketId
    unit
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateItemsSubscriptionVariables,
  APITypes.OnCreateItemsSubscription
>;
export const onCreatePendingCalculations = /* GraphQL */ `subscription OnCreatePendingCalculations(
  $filter: ModelSubscriptionPendingCalculationsFilterInput
) {
  onCreatePendingCalculations(filter: $filter) {
    createdAt
    date
    householdId
    id
    name
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePendingCalculationsSubscriptionVariables,
  APITypes.OnCreatePendingCalculationsSubscription
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
export const onDeleteIngredients = /* GraphQL */ `subscription OnDeleteIngredients(
  $filter: ModelSubscriptionIngredientsFilterInput
) {
  onDeleteIngredients(filter: $filter) {
    createdAt
    id
    items {
      nextToken
      __typename
    }
    maxLifespan
    name
    unit
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteIngredientsSubscriptionVariables,
  APITypes.OnDeleteIngredientsSubscription
>;
export const onDeleteIngredientsShoppingLists = /* GraphQL */ `subscription OnDeleteIngredientsShoppingLists(
  $filter: ModelSubscriptionIngredientsShoppingListsFilterInput
) {
  onDeleteIngredientsShoppingLists(filter: $filter) {
    createdAt
    householdId
    id
    ingredientsId
    ingredientsName
    ingredientsQty
    name
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteIngredientsShoppingListsSubscriptionVariables,
  APITypes.OnDeleteIngredientsShoppingListsSubscription
>;
export const onDeleteItems = /* GraphQL */ `subscription OnDeleteItems($filter: ModelSubscriptionItemsFilterInput) {
  onDeleteItems(filter: $filter) {
    changeOfUnit
    createdAt
    description
    id
    ingredient {
      createdAt
      id
      maxLifespan
      name
      unit
      updatedAt
      __typename
    }
    ingredientId
    link
    price
    quantity
    supermarketId
    unit
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteItemsSubscriptionVariables,
  APITypes.OnDeleteItemsSubscription
>;
export const onDeletePendingCalculations = /* GraphQL */ `subscription OnDeletePendingCalculations(
  $filter: ModelSubscriptionPendingCalculationsFilterInput
) {
  onDeletePendingCalculations(filter: $filter) {
    createdAt
    date
    householdId
    id
    name
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePendingCalculationsSubscriptionVariables,
  APITypes.OnDeletePendingCalculationsSubscription
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
export const onUpdateIngredients = /* GraphQL */ `subscription OnUpdateIngredients(
  $filter: ModelSubscriptionIngredientsFilterInput
) {
  onUpdateIngredients(filter: $filter) {
    createdAt
    id
    items {
      nextToken
      __typename
    }
    maxLifespan
    name
    unit
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateIngredientsSubscriptionVariables,
  APITypes.OnUpdateIngredientsSubscription
>;
export const onUpdateIngredientsShoppingLists = /* GraphQL */ `subscription OnUpdateIngredientsShoppingLists(
  $filter: ModelSubscriptionIngredientsShoppingListsFilterInput
) {
  onUpdateIngredientsShoppingLists(filter: $filter) {
    createdAt
    householdId
    id
    ingredientsId
    ingredientsName
    ingredientsQty
    name
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateIngredientsShoppingListsSubscriptionVariables,
  APITypes.OnUpdateIngredientsShoppingListsSubscription
>;
export const onUpdateItems = /* GraphQL */ `subscription OnUpdateItems($filter: ModelSubscriptionItemsFilterInput) {
  onUpdateItems(filter: $filter) {
    changeOfUnit
    createdAt
    description
    id
    ingredient {
      createdAt
      id
      maxLifespan
      name
      unit
      updatedAt
      __typename
    }
    ingredientId
    link
    price
    quantity
    supermarketId
    unit
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateItemsSubscriptionVariables,
  APITypes.OnUpdateItemsSubscription
>;
export const onUpdatePendingCalculations = /* GraphQL */ `subscription OnUpdatePendingCalculations(
  $filter: ModelSubscriptionPendingCalculationsFilterInput
) {
  onUpdatePendingCalculations(filter: $filter) {
    createdAt
    date
    householdId
    id
    name
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePendingCalculationsSubscriptionVariables,
  APITypes.OnUpdatePendingCalculationsSubscription
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
