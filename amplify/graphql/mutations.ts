/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createHousehold = /* GraphQL */ `mutation CreateHousehold(
  $condition: ModelHouseholdConditionInput
  $input: CreateHouseholdInput!
) {
  createHousehold(condition: $condition, input: $input) {
    createdAt
    householdName
    id
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateHouseholdMutationVariables,
  APITypes.CreateHouseholdMutation
>;
export const createIngredients = /* GraphQL */ `mutation CreateIngredients(
  $condition: ModelIngredientsConditionInput
  $input: CreateIngredientsInput!
) {
  createIngredients(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateIngredientsMutationVariables,
  APITypes.CreateIngredientsMutation
>;
export const createIngredientsShoppingLists = /* GraphQL */ `mutation CreateIngredientsShoppingLists(
  $condition: ModelIngredientsShoppingListsConditionInput
  $input: CreateIngredientsShoppingListsInput!
) {
  createIngredientsShoppingLists(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateIngredientsShoppingListsMutationVariables,
  APITypes.CreateIngredientsShoppingListsMutation
>;
export const createItems = /* GraphQL */ `mutation CreateItems(
  $condition: ModelItemsConditionInput
  $input: CreateItemsInput!
) {
  createItems(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateItemsMutationVariables,
  APITypes.CreateItemsMutation
>;
export const createPendingCalculations = /* GraphQL */ `mutation CreatePendingCalculations(
  $condition: ModelPendingCalculationsConditionInput
  $input: CreatePendingCalculationsInput!
) {
  createPendingCalculations(condition: $condition, input: $input) {
    createdAt
    householdId
    id
    name
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePendingCalculationsMutationVariables,
  APITypes.CreatePendingCalculationsMutation
>;
export const createRequests = /* GraphQL */ `mutation CreateRequests(
  $condition: ModelRequestsConditionInput
  $input: CreateRequestsInput!
) {
  createRequests(condition: $condition, input: $input) {
    adminEmail
    createdAt
    id
    updatedAt
    userEmail
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateRequestsMutationVariables,
  APITypes.CreateRequestsMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $condition: ModelUserConditionInput
  $input: CreateUserInput!
) {
  createUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const deleteHousehold = /* GraphQL */ `mutation DeleteHousehold(
  $condition: ModelHouseholdConditionInput
  $input: DeleteHouseholdInput!
) {
  deleteHousehold(condition: $condition, input: $input) {
    createdAt
    householdName
    id
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteHouseholdMutationVariables,
  APITypes.DeleteHouseholdMutation
>;
export const deleteIngredients = /* GraphQL */ `mutation DeleteIngredients(
  $condition: ModelIngredientsConditionInput
  $input: DeleteIngredientsInput!
) {
  deleteIngredients(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteIngredientsMutationVariables,
  APITypes.DeleteIngredientsMutation
>;
export const deleteIngredientsShoppingLists = /* GraphQL */ `mutation DeleteIngredientsShoppingLists(
  $condition: ModelIngredientsShoppingListsConditionInput
  $input: DeleteIngredientsShoppingListsInput!
) {
  deleteIngredientsShoppingLists(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteIngredientsShoppingListsMutationVariables,
  APITypes.DeleteIngredientsShoppingListsMutation
>;
export const deleteItems = /* GraphQL */ `mutation DeleteItems(
  $condition: ModelItemsConditionInput
  $input: DeleteItemsInput!
) {
  deleteItems(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteItemsMutationVariables,
  APITypes.DeleteItemsMutation
>;
export const deletePendingCalculations = /* GraphQL */ `mutation DeletePendingCalculations(
  $condition: ModelPendingCalculationsConditionInput
  $input: DeletePendingCalculationsInput!
) {
  deletePendingCalculations(condition: $condition, input: $input) {
    createdAt
    date
    householdId
    id
    name
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePendingCalculationsMutationVariables,
  APITypes.DeletePendingCalculationsMutation
>;
export const deleteRequests = /* GraphQL */ `mutation DeleteRequests(
  $condition: ModelRequestsConditionInput
  $input: DeleteRequestsInput!
) {
  deleteRequests(condition: $condition, input: $input) {
    adminEmail
    createdAt
    id
    updatedAt
    userEmail
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteRequestsMutationVariables,
  APITypes.DeleteRequestsMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $condition: ModelUserConditionInput
  $input: DeleteUserInput!
) {
  deleteUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const updateCognitoHousehold = /* GraphQL */ `mutation UpdateCognitoHousehold($newHouseholdID: String, $userEmail: String) {
  updateCognitoHousehold(newHouseholdID: $newHouseholdID, userEmail: $userEmail)
}
` as GeneratedMutation<
  APITypes.UpdateCognitoHouseholdMutationVariables,
  APITypes.UpdateCognitoHouseholdMutation
>;
export const updateHousehold = /* GraphQL */ `mutation UpdateHousehold(
  $condition: ModelHouseholdConditionInput
  $input: UpdateHouseholdInput!
) {
  updateHousehold(condition: $condition, input: $input) {
    createdAt
    householdName
    id
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateHouseholdMutationVariables,
  APITypes.UpdateHouseholdMutation
>;
export const updateIngredients = /* GraphQL */ `mutation UpdateIngredients(
  $condition: ModelIngredientsConditionInput
  $input: UpdateIngredientsInput!
) {
  updateIngredients(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateIngredientsMutationVariables,
  APITypes.UpdateIngredientsMutation
>;
export const updateIngredientsShoppingLists = /* GraphQL */ `mutation UpdateIngredientsShoppingLists(
  $condition: ModelIngredientsShoppingListsConditionInput
  $input: UpdateIngredientsShoppingListsInput!
) {
  updateIngredientsShoppingLists(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateIngredientsShoppingListsMutationVariables,
  APITypes.UpdateIngredientsShoppingListsMutation
>;
export const updateItems = /* GraphQL */ `mutation UpdateItems(
  $condition: ModelItemsConditionInput
  $input: UpdateItemsInput!
) {
  updateItems(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateItemsMutationVariables,
  APITypes.UpdateItemsMutation
>;
export const updatePendingCalculations = /* GraphQL */ `mutation UpdatePendingCalculations(
  $condition: ModelPendingCalculationsConditionInput
  $input: UpdatePendingCalculationsInput!
) {
  updatePendingCalculations(condition: $condition, input: $input) {
    createdAt
    date
    householdId
    id
    name
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePendingCalculationsMutationVariables,
  APITypes.UpdatePendingCalculationsMutation
>;
export const updateRequests = /* GraphQL */ `mutation UpdateRequests(
  $condition: ModelRequestsConditionInput
  $input: UpdateRequestsInput!
) {
  updateRequests(condition: $condition, input: $input) {
    adminEmail
    createdAt
    id
    updatedAt
    userEmail
    userId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateRequestsMutationVariables,
  APITypes.UpdateRequestsMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $condition: ModelUserConditionInput
  $input: UpdateUserInput!
) {
  updateUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
