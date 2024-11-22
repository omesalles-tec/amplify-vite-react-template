/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getDishes = /* GraphQL */ `query GetDishes($id: ID!) {
  getDishes(id: $id) {
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
` as GeneratedQuery<APITypes.GetDishesQueryVariables, APITypes.GetDishesQuery>;
export const getDoneCalculations = /* GraphQL */ `query GetDoneCalculations($createdAt: String!, $id: ID!) {
  getDoneCalculations(createdAt: $createdAt, id: $id) {
    cost
    createdAt
    id
    items
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDoneCalculationsQueryVariables,
  APITypes.GetDoneCalculationsQuery
>;
export const getFavouriteDishes = /* GraphQL */ `query GetFavouriteDishes($id: ID!) {
  getFavouriteDishes(id: $id) {
    createdAt
    id
    preferences
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFavouriteDishesQueryVariables,
  APITypes.GetFavouriteDishesQuery
>;
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
export const getIngredients = /* GraphQL */ `query GetIngredients($id: ID!) {
  getIngredients(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetIngredientsQueryVariables,
  APITypes.GetIngredientsQuery
>;
export const getIngredientsShoppingLists = /* GraphQL */ `query GetIngredientsShoppingLists($id: ID!) {
  getIngredientsShoppingLists(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetIngredientsShoppingListsQueryVariables,
  APITypes.GetIngredientsShoppingListsQuery
>;
export const getItems = /* GraphQL */ `query GetItems($id: ID!) {
  getItems(id: $id) {
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
` as GeneratedQuery<APITypes.GetItemsQueryVariables, APITypes.GetItemsQuery>;
export const getPendingCalculations = /* GraphQL */ `query GetPendingCalculations($id: ID!) {
  getPendingCalculations(id: $id) {
    createdAt
    householdId
    id
    name
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPendingCalculationsQueryVariables,
  APITypes.GetPendingCalculationsQuery
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
export const listDishes = /* GraphQL */ `query ListDishes(
  $filter: ModelDishesFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listDishes(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDishesQueryVariables,
  APITypes.ListDishesQuery
>;
export const listDoneCalculations = /* GraphQL */ `query ListDoneCalculations(
  $createdAt: ModelStringKeyConditionInput
  $filter: ModelDoneCalculationsFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listDoneCalculations(
    createdAt: $createdAt
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      cost
      createdAt
      id
      items
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDoneCalculationsQueryVariables,
  APITypes.ListDoneCalculationsQuery
>;
export const listFavouriteDishes = /* GraphQL */ `query ListFavouriteDishes(
  $filter: ModelFavouriteDishesFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listFavouriteDishes(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      id
      preferences
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFavouriteDishesQueryVariables,
  APITypes.ListFavouriteDishesQuery
>;
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
export const listIngredients = /* GraphQL */ `query ListIngredients(
  $filter: ModelIngredientsFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listIngredients(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      id
      maxLifespan
      name
      unit
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListIngredientsQueryVariables,
  APITypes.ListIngredientsQuery
>;
export const listIngredientsShoppingLists = /* GraphQL */ `query ListIngredientsShoppingLists(
  $filter: ModelIngredientsShoppingListsFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listIngredientsShoppingLists(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListIngredientsShoppingListsQueryVariables,
  APITypes.ListIngredientsShoppingListsQuery
>;
export const listItems = /* GraphQL */ `query ListItems(
  $filter: ModelItemsFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listItems(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      changeOfUnit
      createdAt
      description
      id
      ingredientId
      link
      price
      quantity
      supermarketId
      unit
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListItemsQueryVariables, APITypes.ListItemsQuery>;
export const listItemsByIngredientId = /* GraphQL */ `query ListItemsByIngredientId(
  $filter: ModelItemsFilterInput
  $ingredientId: ID!
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listItemsByIngredientId(
    filter: $filter
    ingredientId: $ingredientId
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      changeOfUnit
      createdAt
      description
      id
      ingredientId
      link
      price
      quantity
      supermarketId
      unit
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListItemsByIngredientIdQueryVariables,
  APITypes.ListItemsByIngredientIdQuery
>;
export const listPendingCalculations = /* GraphQL */ `query ListPendingCalculations(
  $filter: ModelPendingCalculationsFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listPendingCalculations(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      householdId
      id
      name
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPendingCalculationsQueryVariables,
  APITypes.ListPendingCalculationsQuery
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
