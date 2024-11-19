/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateDishes = /* GraphQL */ `subscription OnCreateDishes($filter: ModelSubscriptionDishesFilterInput) {
  onCreateDishes(filter: $filter) {
    avgCost
    createdAt
    dishName
    id
    numberRecipes
    recipesArray
    type
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateDishesSubscriptionVariables,
  APITypes.OnCreateDishesSubscription
>;
export const onCreateDoneCalculations = /* GraphQL */ `subscription OnCreateDoneCalculations(
  $filter: ModelSubscriptionDoneCalculationsFilterInput
) {
  onCreateDoneCalculations(filter: $filter) {
    cost
    createdAt
    id
    items
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateDoneCalculationsSubscriptionVariables,
  APITypes.OnCreateDoneCalculationsSubscription
>;
export const onCreateFavouriteDishes = /* GraphQL */ `subscription OnCreateFavouriteDishes(
  $filter: ModelSubscriptionFavouriteDishesFilterInput
) {
  onCreateFavouriteDishes(filter: $filter) {
    createdAt
    id
    preferences
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFavouriteDishesSubscriptionVariables,
  APITypes.OnCreateFavouriteDishesSubscription
>;
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
export const onDeleteDishes = /* GraphQL */ `subscription OnDeleteDishes($filter: ModelSubscriptionDishesFilterInput) {
  onDeleteDishes(filter: $filter) {
    avgCost
    createdAt
    dishName
    id
    numberRecipes
    recipesArray
    type
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteDishesSubscriptionVariables,
  APITypes.OnDeleteDishesSubscription
>;
export const onDeleteDoneCalculations = /* GraphQL */ `subscription OnDeleteDoneCalculations(
  $filter: ModelSubscriptionDoneCalculationsFilterInput
) {
  onDeleteDoneCalculations(filter: $filter) {
    cost
    createdAt
    id
    items
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteDoneCalculationsSubscriptionVariables,
  APITypes.OnDeleteDoneCalculationsSubscription
>;
export const onDeleteFavouriteDishes = /* GraphQL */ `subscription OnDeleteFavouriteDishes(
  $filter: ModelSubscriptionFavouriteDishesFilterInput
) {
  onDeleteFavouriteDishes(filter: $filter) {
    createdAt
    id
    preferences
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFavouriteDishesSubscriptionVariables,
  APITypes.OnDeleteFavouriteDishesSubscription
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
export const onUpdateDishes = /* GraphQL */ `subscription OnUpdateDishes($filter: ModelSubscriptionDishesFilterInput) {
  onUpdateDishes(filter: $filter) {
    avgCost
    createdAt
    dishName
    id
    numberRecipes
    recipesArray
    type
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateDishesSubscriptionVariables,
  APITypes.OnUpdateDishesSubscription
>;
export const onUpdateDoneCalculations = /* GraphQL */ `subscription OnUpdateDoneCalculations(
  $filter: ModelSubscriptionDoneCalculationsFilterInput
) {
  onUpdateDoneCalculations(filter: $filter) {
    cost
    createdAt
    id
    items
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateDoneCalculationsSubscriptionVariables,
  APITypes.OnUpdateDoneCalculationsSubscription
>;
export const onUpdateFavouriteDishes = /* GraphQL */ `subscription OnUpdateFavouriteDishes(
  $filter: ModelSubscriptionFavouriteDishesFilterInput
) {
  onUpdateFavouriteDishes(filter: $filter) {
    createdAt
    id
    preferences
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateFavouriteDishesSubscriptionVariables,
  APITypes.OnUpdateFavouriteDishesSubscription
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
