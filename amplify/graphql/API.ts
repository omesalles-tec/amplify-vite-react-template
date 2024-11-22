/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Dishes = {
  __typename: "Dishes",
  avgCost?: number | null,
  classification?: Array< string | null > | null,
  createdAt: string,
  diet?: Array< string | null > | null,
  dishName: string,
  id: string,
  numberRecipes?: number | null,
  recipesArray?: Array< string | null > | null,
  season?: Array< number | null > | null,
  type?: Array< string | null > | null,
  updatedAt: string,
};

export type DoneCalculations = {
  __typename: "DoneCalculations",
  cost?: number | null,
  createdAt: string,
  id: string,
  items?: Array< string | null > | null,
  updatedAt: string,
};

export type FavouriteDishes = {
  __typename: "FavouriteDishes",
  createdAt: string,
  id: string,
  preferences: string,
  updatedAt: string,
};

export type Household = {
  __typename: "Household",
  createdAt: string,
  householdName: string,
  id: string,
  updatedAt: string,
};

export type Ingredients = {
  __typename: "Ingredients",
  createdAt: string,
  id: string,
  items?: ModelItemsConnection | null,
  maxLifespan?: number | null,
  name: string,
  unit: string,
  updatedAt: string,
};

export type ModelItemsConnection = {
  __typename: "ModelItemsConnection",
  items:  Array<Items | null >,
  nextToken?: string | null,
};

export type Items = {
  __typename: "Items",
  changeOfUnit?: string | null,
  createdAt: string,
  description: string,
  id: string,
  ingredient?: Ingredients | null,
  ingredientId: string,
  link?: string | null,
  price: number,
  quantity: number,
  supermarketId: number,
  unit: string,
  updatedAt: string,
};

export type IngredientsShoppingLists = {
  __typename: "IngredientsShoppingLists",
  createdAt: string,
  householdId: string,
  id: string,
  ingredientsId?: Array< string | null > | null,
  ingredientsName?: Array< string | null > | null,
  ingredientsQty?: Array< number | null > | null,
  name: string,
  updatedAt: string,
};

export type PendingCalculations = {
  __typename: "PendingCalculations",
  createdAt: string,
  householdId: string,
  id: string,
  name: string,
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

export type ModelDishesFilterInput = {
  and?: Array< ModelDishesFilterInput | null > | null,
  avgCost?: ModelFloatInput | null,
  classification?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  diet?: ModelStringInput | null,
  dishName?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelDishesFilterInput | null,
  numberRecipes?: ModelIntInput | null,
  or?: Array< ModelDishesFilterInput | null > | null,
  recipesArray?: ModelStringInput | null,
  season?: ModelIntInput | null,
  type?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
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

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelDishesConnection = {
  __typename: "ModelDishesConnection",
  items:  Array<Dishes | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
};

export type ModelDoneCalculationsFilterInput = {
  and?: Array< ModelDoneCalculationsFilterInput | null > | null,
  cost?: ModelFloatInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  items?: ModelStringInput | null,
  not?: ModelDoneCalculationsFilterInput | null,
  or?: Array< ModelDoneCalculationsFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelDoneCalculationsConnection = {
  __typename: "ModelDoneCalculationsConnection",
  items:  Array<DoneCalculations | null >,
  nextToken?: string | null,
};

export type ModelFavouriteDishesFilterInput = {
  and?: Array< ModelFavouriteDishesFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelFavouriteDishesFilterInput | null,
  or?: Array< ModelFavouriteDishesFilterInput | null > | null,
  preferences?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFavouriteDishesConnection = {
  __typename: "ModelFavouriteDishesConnection",
  items:  Array<FavouriteDishes | null >,
  nextToken?: string | null,
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

export type ModelHouseholdConnection = {
  __typename: "ModelHouseholdConnection",
  items:  Array<Household | null >,
  nextToken?: string | null,
};

export type ModelIngredientsFilterInput = {
  and?: Array< ModelIngredientsFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  maxLifespan?: ModelIntInput | null,
  name?: ModelStringInput | null,
  not?: ModelIngredientsFilterInput | null,
  or?: Array< ModelIngredientsFilterInput | null > | null,
  unit?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIngredientsConnection = {
  __typename: "ModelIngredientsConnection",
  items:  Array<Ingredients | null >,
  nextToken?: string | null,
};

export type ModelIngredientsShoppingListsFilterInput = {
  and?: Array< ModelIngredientsShoppingListsFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  householdId?: ModelStringInput | null,
  id?: ModelIDInput | null,
  ingredientsId?: ModelStringInput | null,
  ingredientsName?: ModelStringInput | null,
  ingredientsQty?: ModelFloatInput | null,
  name?: ModelStringInput | null,
  not?: ModelIngredientsShoppingListsFilterInput | null,
  or?: Array< ModelIngredientsShoppingListsFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIngredientsShoppingListsConnection = {
  __typename: "ModelIngredientsShoppingListsConnection",
  items:  Array<IngredientsShoppingLists | null >,
  nextToken?: string | null,
};

export type ModelItemsFilterInput = {
  and?: Array< ModelItemsFilterInput | null > | null,
  changeOfUnit?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  id?: ModelIDInput | null,
  ingredientId?: ModelIDInput | null,
  link?: ModelStringInput | null,
  not?: ModelItemsFilterInput | null,
  or?: Array< ModelItemsFilterInput | null > | null,
  price?: ModelFloatInput | null,
  quantity?: ModelFloatInput | null,
  supermarketId?: ModelIntInput | null,
  unit?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelPendingCalculationsFilterInput = {
  and?: Array< ModelPendingCalculationsFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  householdId?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelPendingCalculationsFilterInput | null,
  or?: Array< ModelPendingCalculationsFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelPendingCalculationsConnection = {
  __typename: "ModelPendingCalculationsConnection",
  items:  Array<PendingCalculations | null >,
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

export type ModelDishesConditionInput = {
  and?: Array< ModelDishesConditionInput | null > | null,
  avgCost?: ModelFloatInput | null,
  classification?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  diet?: ModelStringInput | null,
  dishName?: ModelStringInput | null,
  not?: ModelDishesConditionInput | null,
  numberRecipes?: ModelIntInput | null,
  or?: Array< ModelDishesConditionInput | null > | null,
  recipesArray?: ModelStringInput | null,
  season?: ModelIntInput | null,
  type?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateDishesInput = {
  avgCost?: number | null,
  classification?: Array< string | null > | null,
  diet?: Array< string | null > | null,
  dishName: string,
  id?: string | null,
  numberRecipes?: number | null,
  recipesArray?: Array< string | null > | null,
  season?: Array< number | null > | null,
  type?: Array< string | null > | null,
};

export type ModelDoneCalculationsConditionInput = {
  and?: Array< ModelDoneCalculationsConditionInput | null > | null,
  cost?: ModelFloatInput | null,
  items?: ModelStringInput | null,
  not?: ModelDoneCalculationsConditionInput | null,
  or?: Array< ModelDoneCalculationsConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateDoneCalculationsInput = {
  cost?: number | null,
  createdAt?: string | null,
  id?: string | null,
  items?: Array< string | null > | null,
};

export type ModelFavouriteDishesConditionInput = {
  and?: Array< ModelFavouriteDishesConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  not?: ModelFavouriteDishesConditionInput | null,
  or?: Array< ModelFavouriteDishesConditionInput | null > | null,
  preferences?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateFavouriteDishesInput = {
  id?: string | null,
  preferences: string,
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

export type ModelIngredientsConditionInput = {
  and?: Array< ModelIngredientsConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  maxLifespan?: ModelIntInput | null,
  name?: ModelStringInput | null,
  not?: ModelIngredientsConditionInput | null,
  or?: Array< ModelIngredientsConditionInput | null > | null,
  unit?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateIngredientsInput = {
  id?: string | null,
  maxLifespan?: number | null,
  name: string,
  unit: string,
};

export type ModelIngredientsShoppingListsConditionInput = {
  and?: Array< ModelIngredientsShoppingListsConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  householdId?: ModelStringInput | null,
  ingredientsId?: ModelStringInput | null,
  ingredientsName?: ModelStringInput | null,
  ingredientsQty?: ModelFloatInput | null,
  name?: ModelStringInput | null,
  not?: ModelIngredientsShoppingListsConditionInput | null,
  or?: Array< ModelIngredientsShoppingListsConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateIngredientsShoppingListsInput = {
  householdId: string,
  id?: string | null,
  ingredientsId?: Array< string | null > | null,
  ingredientsName?: Array< string | null > | null,
  ingredientsQty?: Array< number | null > | null,
  name: string,
};

export type ModelItemsConditionInput = {
  and?: Array< ModelItemsConditionInput | null > | null,
  changeOfUnit?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  description?: ModelStringInput | null,
  ingredientId?: ModelIDInput | null,
  link?: ModelStringInput | null,
  not?: ModelItemsConditionInput | null,
  or?: Array< ModelItemsConditionInput | null > | null,
  price?: ModelFloatInput | null,
  quantity?: ModelFloatInput | null,
  supermarketId?: ModelIntInput | null,
  unit?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateItemsInput = {
  changeOfUnit?: string | null,
  description: string,
  id?: string | null,
  ingredientId: string,
  link?: string | null,
  price: number,
  quantity: number,
  supermarketId: number,
  unit: string,
};

export type ModelPendingCalculationsConditionInput = {
  and?: Array< ModelPendingCalculationsConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  householdId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelPendingCalculationsConditionInput | null,
  or?: Array< ModelPendingCalculationsConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreatePendingCalculationsInput = {
  householdId: string,
  id?: string | null,
  name: string,
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

export type DeleteDishesInput = {
  id: string,
};

export type DeleteDoneCalculationsInput = {
  createdAt: string,
  id: string,
};

export type DeleteFavouriteDishesInput = {
  id: string,
};

export type DeleteHouseholdInput = {
  id: string,
};

export type DeleteIngredientsInput = {
  id: string,
};

export type DeleteIngredientsShoppingListsInput = {
  id: string,
};

export type DeleteItemsInput = {
  id: string,
};

export type DeletePendingCalculationsInput = {
  id: string,
};

export type DeleteRequestsInput = {
  id: string,
};

export type DeleteUserInput = {
  id: string,
};

export type UpdateDishesInput = {
  avgCost?: number | null,
  classification?: Array< string | null > | null,
  diet?: Array< string | null > | null,
  dishName?: string | null,
  id: string,
  numberRecipes?: number | null,
  recipesArray?: Array< string | null > | null,
  season?: Array< number | null > | null,
  type?: Array< string | null > | null,
};

export type UpdateDoneCalculationsInput = {
  cost?: number | null,
  createdAt: string,
  id: string,
  items?: Array< string | null > | null,
};

export type UpdateFavouriteDishesInput = {
  id: string,
  preferences?: string | null,
};

export type UpdateHouseholdInput = {
  householdName?: string | null,
  id: string,
};

export type UpdateIngredientsInput = {
  id: string,
  maxLifespan?: number | null,
  name?: string | null,
  unit?: string | null,
};

export type UpdateIngredientsShoppingListsInput = {
  householdId?: string | null,
  id: string,
  ingredientsId?: Array< string | null > | null,
  ingredientsName?: Array< string | null > | null,
  ingredientsQty?: Array< number | null > | null,
  name?: string | null,
};

export type UpdateItemsInput = {
  changeOfUnit?: string | null,
  description?: string | null,
  id: string,
  ingredientId?: string | null,
  link?: string | null,
  price?: number | null,
  quantity?: number | null,
  supermarketId?: number | null,
  unit?: string | null,
};

export type UpdatePendingCalculationsInput = {
  householdId?: string | null,
  id: string,
  name?: string | null,
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

export type ModelSubscriptionDishesFilterInput = {
  and?: Array< ModelSubscriptionDishesFilterInput | null > | null,
  avgCost?: ModelSubscriptionFloatInput | null,
  classification?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  diet?: ModelSubscriptionStringInput | null,
  dishName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  numberRecipes?: ModelSubscriptionIntInput | null,
  or?: Array< ModelSubscriptionDishesFilterInput | null > | null,
  recipesArray?: ModelSubscriptionStringInput | null,
  season?: ModelSubscriptionIntInput | null,
  type?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
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

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionDoneCalculationsFilterInput = {
  and?: Array< ModelSubscriptionDoneCalculationsFilterInput | null > | null,
  cost?: ModelSubscriptionFloatInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  items?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionDoneCalculationsFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionFavouriteDishesFilterInput = {
  and?: Array< ModelSubscriptionFavouriteDishesFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionFavouriteDishesFilterInput | null > | null,
  preferences?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionHouseholdFilterInput = {
  and?: Array< ModelSubscriptionHouseholdFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  householdName?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionHouseholdFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionIngredientsFilterInput = {
  and?: Array< ModelSubscriptionIngredientsFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  maxLifespan?: ModelSubscriptionIntInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionIngredientsFilterInput | null > | null,
  unit?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionIngredientsShoppingListsFilterInput = {
  and?: Array< ModelSubscriptionIngredientsShoppingListsFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  householdId?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  ingredientsId?: ModelSubscriptionStringInput | null,
  ingredientsName?: ModelSubscriptionStringInput | null,
  ingredientsQty?: ModelSubscriptionFloatInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionIngredientsShoppingListsFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionItemsFilterInput = {
  and?: Array< ModelSubscriptionItemsFilterInput | null > | null,
  changeOfUnit?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  ingredientId?: ModelSubscriptionIDInput | null,
  link?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionItemsFilterInput | null > | null,
  price?: ModelSubscriptionFloatInput | null,
  quantity?: ModelSubscriptionFloatInput | null,
  supermarketId?: ModelSubscriptionIntInput | null,
  unit?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionPendingCalculationsFilterInput = {
  and?: Array< ModelSubscriptionPendingCalculationsFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  householdId?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionPendingCalculationsFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
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

export type GetDishesQueryVariables = {
  id: string,
};

export type GetDishesQuery = {
  getDishes?:  {
    __typename: "Dishes",
    avgCost?: number | null,
    classification?: Array< string | null > | null,
    createdAt: string,
    diet?: Array< string | null > | null,
    dishName: string,
    id: string,
    numberRecipes?: number | null,
    recipesArray?: Array< string | null > | null,
    season?: Array< number | null > | null,
    type?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type GetDoneCalculationsQueryVariables = {
  createdAt: string,
  id: string,
};

export type GetDoneCalculationsQuery = {
  getDoneCalculations?:  {
    __typename: "DoneCalculations",
    cost?: number | null,
    createdAt: string,
    id: string,
    items?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type GetFavouriteDishesQueryVariables = {
  id: string,
};

export type GetFavouriteDishesQuery = {
  getFavouriteDishes?:  {
    __typename: "FavouriteDishes",
    createdAt: string,
    id: string,
    preferences: string,
    updatedAt: string,
  } | null,
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

export type GetIngredientsQueryVariables = {
  id: string,
};

export type GetIngredientsQuery = {
  getIngredients?:  {
    __typename: "Ingredients",
    createdAt: string,
    id: string,
    items?:  {
      __typename: "ModelItemsConnection",
      nextToken?: string | null,
    } | null,
    maxLifespan?: number | null,
    name: string,
    unit: string,
    updatedAt: string,
  } | null,
};

export type GetIngredientsShoppingListsQueryVariables = {
  id: string,
};

export type GetIngredientsShoppingListsQuery = {
  getIngredientsShoppingLists?:  {
    __typename: "IngredientsShoppingLists",
    createdAt: string,
    householdId: string,
    id: string,
    ingredientsId?: Array< string | null > | null,
    ingredientsName?: Array< string | null > | null,
    ingredientsQty?: Array< number | null > | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type GetItemsQueryVariables = {
  id: string,
};

export type GetItemsQuery = {
  getItems?:  {
    __typename: "Items",
    changeOfUnit?: string | null,
    createdAt: string,
    description: string,
    id: string,
    ingredient?:  {
      __typename: "Ingredients",
      createdAt: string,
      id: string,
      maxLifespan?: number | null,
      name: string,
      unit: string,
      updatedAt: string,
    } | null,
    ingredientId: string,
    link?: string | null,
    price: number,
    quantity: number,
    supermarketId: number,
    unit: string,
    updatedAt: string,
  } | null,
};

export type GetPendingCalculationsQueryVariables = {
  id: string,
};

export type GetPendingCalculationsQuery = {
  getPendingCalculations?:  {
    __typename: "PendingCalculations",
    createdAt: string,
    householdId: string,
    id: string,
    name: string,
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

export type ListDishesQueryVariables = {
  filter?: ModelDishesFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDishesQuery = {
  listDishes?:  {
    __typename: "ModelDishesConnection",
    items:  Array< {
      __typename: "Dishes",
      avgCost?: number | null,
      classification?: Array< string | null > | null,
      createdAt: string,
      diet?: Array< string | null > | null,
      dishName: string,
      id: string,
      numberRecipes?: number | null,
      recipesArray?: Array< string | null > | null,
      season?: Array< number | null > | null,
      type?: Array< string | null > | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListDoneCalculationsQueryVariables = {
  createdAt?: ModelStringKeyConditionInput | null,
  filter?: ModelDoneCalculationsFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDoneCalculationsQuery = {
  listDoneCalculations?:  {
    __typename: "ModelDoneCalculationsConnection",
    items:  Array< {
      __typename: "DoneCalculations",
      cost?: number | null,
      createdAt: string,
      id: string,
      items?: Array< string | null > | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListFavouriteDishesQueryVariables = {
  filter?: ModelFavouriteDishesFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListFavouriteDishesQuery = {
  listFavouriteDishes?:  {
    __typename: "ModelFavouriteDishesConnection",
    items:  Array< {
      __typename: "FavouriteDishes",
      createdAt: string,
      id: string,
      preferences: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
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

export type ListIngredientsQueryVariables = {
  filter?: ModelIngredientsFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListIngredientsQuery = {
  listIngredients?:  {
    __typename: "ModelIngredientsConnection",
    items:  Array< {
      __typename: "Ingredients",
      createdAt: string,
      id: string,
      maxLifespan?: number | null,
      name: string,
      unit: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListIngredientsShoppingListsQueryVariables = {
  filter?: ModelIngredientsShoppingListsFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListIngredientsShoppingListsQuery = {
  listIngredientsShoppingLists?:  {
    __typename: "ModelIngredientsShoppingListsConnection",
    items:  Array< {
      __typename: "IngredientsShoppingLists",
      createdAt: string,
      householdId: string,
      id: string,
      ingredientsId?: Array< string | null > | null,
      ingredientsName?: Array< string | null > | null,
      ingredientsQty?: Array< number | null > | null,
      name: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListItemsQueryVariables = {
  filter?: ModelItemsFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListItemsQuery = {
  listItems?:  {
    __typename: "ModelItemsConnection",
    items:  Array< {
      __typename: "Items",
      changeOfUnit?: string | null,
      createdAt: string,
      description: string,
      id: string,
      ingredientId: string,
      link?: string | null,
      price: number,
      quantity: number,
      supermarketId: number,
      unit: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListItemsByIngredientIdQueryVariables = {
  filter?: ModelItemsFilterInput | null,
  ingredientId: string,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListItemsByIngredientIdQuery = {
  listItemsByIngredientId?:  {
    __typename: "ModelItemsConnection",
    items:  Array< {
      __typename: "Items",
      changeOfUnit?: string | null,
      createdAt: string,
      description: string,
      id: string,
      ingredientId: string,
      link?: string | null,
      price: number,
      quantity: number,
      supermarketId: number,
      unit: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPendingCalculationsQueryVariables = {
  filter?: ModelPendingCalculationsFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPendingCalculationsQuery = {
  listPendingCalculations?:  {
    __typename: "ModelPendingCalculationsConnection",
    items:  Array< {
      __typename: "PendingCalculations",
      createdAt: string,
      householdId: string,
      id: string,
      name: string,
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

export type CreateDishesMutationVariables = {
  condition?: ModelDishesConditionInput | null,
  input: CreateDishesInput,
};

export type CreateDishesMutation = {
  createDishes?:  {
    __typename: "Dishes",
    avgCost?: number | null,
    classification?: Array< string | null > | null,
    createdAt: string,
    diet?: Array< string | null > | null,
    dishName: string,
    id: string,
    numberRecipes?: number | null,
    recipesArray?: Array< string | null > | null,
    season?: Array< number | null > | null,
    type?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type CreateDoneCalculationsMutationVariables = {
  condition?: ModelDoneCalculationsConditionInput | null,
  input: CreateDoneCalculationsInput,
};

export type CreateDoneCalculationsMutation = {
  createDoneCalculations?:  {
    __typename: "DoneCalculations",
    cost?: number | null,
    createdAt: string,
    id: string,
    items?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type CreateFavouriteDishesMutationVariables = {
  condition?: ModelFavouriteDishesConditionInput | null,
  input: CreateFavouriteDishesInput,
};

export type CreateFavouriteDishesMutation = {
  createFavouriteDishes?:  {
    __typename: "FavouriteDishes",
    createdAt: string,
    id: string,
    preferences: string,
    updatedAt: string,
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

export type CreateIngredientsMutationVariables = {
  condition?: ModelIngredientsConditionInput | null,
  input: CreateIngredientsInput,
};

export type CreateIngredientsMutation = {
  createIngredients?:  {
    __typename: "Ingredients",
    createdAt: string,
    id: string,
    items?:  {
      __typename: "ModelItemsConnection",
      nextToken?: string | null,
    } | null,
    maxLifespan?: number | null,
    name: string,
    unit: string,
    updatedAt: string,
  } | null,
};

export type CreateIngredientsShoppingListsMutationVariables = {
  condition?: ModelIngredientsShoppingListsConditionInput | null,
  input: CreateIngredientsShoppingListsInput,
};

export type CreateIngredientsShoppingListsMutation = {
  createIngredientsShoppingLists?:  {
    __typename: "IngredientsShoppingLists",
    createdAt: string,
    householdId: string,
    id: string,
    ingredientsId?: Array< string | null > | null,
    ingredientsName?: Array< string | null > | null,
    ingredientsQty?: Array< number | null > | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type CreateItemsMutationVariables = {
  condition?: ModelItemsConditionInput | null,
  input: CreateItemsInput,
};

export type CreateItemsMutation = {
  createItems?:  {
    __typename: "Items",
    changeOfUnit?: string | null,
    createdAt: string,
    description: string,
    id: string,
    ingredient?:  {
      __typename: "Ingredients",
      createdAt: string,
      id: string,
      maxLifespan?: number | null,
      name: string,
      unit: string,
      updatedAt: string,
    } | null,
    ingredientId: string,
    link?: string | null,
    price: number,
    quantity: number,
    supermarketId: number,
    unit: string,
    updatedAt: string,
  } | null,
};

export type CreatePendingCalculationsMutationVariables = {
  condition?: ModelPendingCalculationsConditionInput | null,
  input: CreatePendingCalculationsInput,
};

export type CreatePendingCalculationsMutation = {
  createPendingCalculations?:  {
    __typename: "PendingCalculations",
    createdAt: string,
    householdId: string,
    id: string,
    name: string,
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

export type DeleteDishesMutationVariables = {
  condition?: ModelDishesConditionInput | null,
  input: DeleteDishesInput,
};

export type DeleteDishesMutation = {
  deleteDishes?:  {
    __typename: "Dishes",
    avgCost?: number | null,
    classification?: Array< string | null > | null,
    createdAt: string,
    diet?: Array< string | null > | null,
    dishName: string,
    id: string,
    numberRecipes?: number | null,
    recipesArray?: Array< string | null > | null,
    season?: Array< number | null > | null,
    type?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type DeleteDoneCalculationsMutationVariables = {
  condition?: ModelDoneCalculationsConditionInput | null,
  input: DeleteDoneCalculationsInput,
};

export type DeleteDoneCalculationsMutation = {
  deleteDoneCalculations?:  {
    __typename: "DoneCalculations",
    cost?: number | null,
    createdAt: string,
    id: string,
    items?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type DeleteFavouriteDishesMutationVariables = {
  condition?: ModelFavouriteDishesConditionInput | null,
  input: DeleteFavouriteDishesInput,
};

export type DeleteFavouriteDishesMutation = {
  deleteFavouriteDishes?:  {
    __typename: "FavouriteDishes",
    createdAt: string,
    id: string,
    preferences: string,
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

export type DeleteIngredientsMutationVariables = {
  condition?: ModelIngredientsConditionInput | null,
  input: DeleteIngredientsInput,
};

export type DeleteIngredientsMutation = {
  deleteIngredients?:  {
    __typename: "Ingredients",
    createdAt: string,
    id: string,
    items?:  {
      __typename: "ModelItemsConnection",
      nextToken?: string | null,
    } | null,
    maxLifespan?: number | null,
    name: string,
    unit: string,
    updatedAt: string,
  } | null,
};

export type DeleteIngredientsShoppingListsMutationVariables = {
  condition?: ModelIngredientsShoppingListsConditionInput | null,
  input: DeleteIngredientsShoppingListsInput,
};

export type DeleteIngredientsShoppingListsMutation = {
  deleteIngredientsShoppingLists?:  {
    __typename: "IngredientsShoppingLists",
    createdAt: string,
    householdId: string,
    id: string,
    ingredientsId?: Array< string | null > | null,
    ingredientsName?: Array< string | null > | null,
    ingredientsQty?: Array< number | null > | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type DeleteItemsMutationVariables = {
  condition?: ModelItemsConditionInput | null,
  input: DeleteItemsInput,
};

export type DeleteItemsMutation = {
  deleteItems?:  {
    __typename: "Items",
    changeOfUnit?: string | null,
    createdAt: string,
    description: string,
    id: string,
    ingredient?:  {
      __typename: "Ingredients",
      createdAt: string,
      id: string,
      maxLifespan?: number | null,
      name: string,
      unit: string,
      updatedAt: string,
    } | null,
    ingredientId: string,
    link?: string | null,
    price: number,
    quantity: number,
    supermarketId: number,
    unit: string,
    updatedAt: string,
  } | null,
};

export type DeletePendingCalculationsMutationVariables = {
  condition?: ModelPendingCalculationsConditionInput | null,
  input: DeletePendingCalculationsInput,
};

export type DeletePendingCalculationsMutation = {
  deletePendingCalculations?:  {
    __typename: "PendingCalculations",
    createdAt: string,
    householdId: string,
    id: string,
    name: string,
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

export type UpdateCognitoHouseholdMutationVariables = {
  newHouseholdID?: string | null,
  userEmail?: string | null,
};

export type UpdateCognitoHouseholdMutation = {
  updateCognitoHousehold?: string | null,
};

export type UpdateDishesMutationVariables = {
  condition?: ModelDishesConditionInput | null,
  input: UpdateDishesInput,
};

export type UpdateDishesMutation = {
  updateDishes?:  {
    __typename: "Dishes",
    avgCost?: number | null,
    classification?: Array< string | null > | null,
    createdAt: string,
    diet?: Array< string | null > | null,
    dishName: string,
    id: string,
    numberRecipes?: number | null,
    recipesArray?: Array< string | null > | null,
    season?: Array< number | null > | null,
    type?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type UpdateDoneCalculationsMutationVariables = {
  condition?: ModelDoneCalculationsConditionInput | null,
  input: UpdateDoneCalculationsInput,
};

export type UpdateDoneCalculationsMutation = {
  updateDoneCalculations?:  {
    __typename: "DoneCalculations",
    cost?: number | null,
    createdAt: string,
    id: string,
    items?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type UpdateFavouriteDishesMutationVariables = {
  condition?: ModelFavouriteDishesConditionInput | null,
  input: UpdateFavouriteDishesInput,
};

export type UpdateFavouriteDishesMutation = {
  updateFavouriteDishes?:  {
    __typename: "FavouriteDishes",
    createdAt: string,
    id: string,
    preferences: string,
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

export type UpdateIngredientsMutationVariables = {
  condition?: ModelIngredientsConditionInput | null,
  input: UpdateIngredientsInput,
};

export type UpdateIngredientsMutation = {
  updateIngredients?:  {
    __typename: "Ingredients",
    createdAt: string,
    id: string,
    items?:  {
      __typename: "ModelItemsConnection",
      nextToken?: string | null,
    } | null,
    maxLifespan?: number | null,
    name: string,
    unit: string,
    updatedAt: string,
  } | null,
};

export type UpdateIngredientsShoppingListsMutationVariables = {
  condition?: ModelIngredientsShoppingListsConditionInput | null,
  input: UpdateIngredientsShoppingListsInput,
};

export type UpdateIngredientsShoppingListsMutation = {
  updateIngredientsShoppingLists?:  {
    __typename: "IngredientsShoppingLists",
    createdAt: string,
    householdId: string,
    id: string,
    ingredientsId?: Array< string | null > | null,
    ingredientsName?: Array< string | null > | null,
    ingredientsQty?: Array< number | null > | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type UpdateItemsMutationVariables = {
  condition?: ModelItemsConditionInput | null,
  input: UpdateItemsInput,
};

export type UpdateItemsMutation = {
  updateItems?:  {
    __typename: "Items",
    changeOfUnit?: string | null,
    createdAt: string,
    description: string,
    id: string,
    ingredient?:  {
      __typename: "Ingredients",
      createdAt: string,
      id: string,
      maxLifespan?: number | null,
      name: string,
      unit: string,
      updatedAt: string,
    } | null,
    ingredientId: string,
    link?: string | null,
    price: number,
    quantity: number,
    supermarketId: number,
    unit: string,
    updatedAt: string,
  } | null,
};

export type UpdatePendingCalculationsMutationVariables = {
  condition?: ModelPendingCalculationsConditionInput | null,
  input: UpdatePendingCalculationsInput,
};

export type UpdatePendingCalculationsMutation = {
  updatePendingCalculations?:  {
    __typename: "PendingCalculations",
    createdAt: string,
    householdId: string,
    id: string,
    name: string,
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

export type OnCreateDishesSubscriptionVariables = {
  filter?: ModelSubscriptionDishesFilterInput | null,
};

export type OnCreateDishesSubscription = {
  onCreateDishes?:  {
    __typename: "Dishes",
    avgCost?: number | null,
    classification?: Array< string | null > | null,
    createdAt: string,
    diet?: Array< string | null > | null,
    dishName: string,
    id: string,
    numberRecipes?: number | null,
    recipesArray?: Array< string | null > | null,
    season?: Array< number | null > | null,
    type?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnCreateDoneCalculationsSubscriptionVariables = {
  filter?: ModelSubscriptionDoneCalculationsFilterInput | null,
};

export type OnCreateDoneCalculationsSubscription = {
  onCreateDoneCalculations?:  {
    __typename: "DoneCalculations",
    cost?: number | null,
    createdAt: string,
    id: string,
    items?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnCreateFavouriteDishesSubscriptionVariables = {
  filter?: ModelSubscriptionFavouriteDishesFilterInput | null,
};

export type OnCreateFavouriteDishesSubscription = {
  onCreateFavouriteDishes?:  {
    __typename: "FavouriteDishes",
    createdAt: string,
    id: string,
    preferences: string,
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

export type OnCreateIngredientsSubscriptionVariables = {
  filter?: ModelSubscriptionIngredientsFilterInput | null,
};

export type OnCreateIngredientsSubscription = {
  onCreateIngredients?:  {
    __typename: "Ingredients",
    createdAt: string,
    id: string,
    items?:  {
      __typename: "ModelItemsConnection",
      nextToken?: string | null,
    } | null,
    maxLifespan?: number | null,
    name: string,
    unit: string,
    updatedAt: string,
  } | null,
};

export type OnCreateIngredientsShoppingListsSubscriptionVariables = {
  filter?: ModelSubscriptionIngredientsShoppingListsFilterInput | null,
};

export type OnCreateIngredientsShoppingListsSubscription = {
  onCreateIngredientsShoppingLists?:  {
    __typename: "IngredientsShoppingLists",
    createdAt: string,
    householdId: string,
    id: string,
    ingredientsId?: Array< string | null > | null,
    ingredientsName?: Array< string | null > | null,
    ingredientsQty?: Array< number | null > | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnCreateItemsSubscriptionVariables = {
  filter?: ModelSubscriptionItemsFilterInput | null,
};

export type OnCreateItemsSubscription = {
  onCreateItems?:  {
    __typename: "Items",
    changeOfUnit?: string | null,
    createdAt: string,
    description: string,
    id: string,
    ingredient?:  {
      __typename: "Ingredients",
      createdAt: string,
      id: string,
      maxLifespan?: number | null,
      name: string,
      unit: string,
      updatedAt: string,
    } | null,
    ingredientId: string,
    link?: string | null,
    price: number,
    quantity: number,
    supermarketId: number,
    unit: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePendingCalculationsSubscriptionVariables = {
  filter?: ModelSubscriptionPendingCalculationsFilterInput | null,
};

export type OnCreatePendingCalculationsSubscription = {
  onCreatePendingCalculations?:  {
    __typename: "PendingCalculations",
    createdAt: string,
    householdId: string,
    id: string,
    name: string,
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

export type OnDeleteDishesSubscriptionVariables = {
  filter?: ModelSubscriptionDishesFilterInput | null,
};

export type OnDeleteDishesSubscription = {
  onDeleteDishes?:  {
    __typename: "Dishes",
    avgCost?: number | null,
    classification?: Array< string | null > | null,
    createdAt: string,
    diet?: Array< string | null > | null,
    dishName: string,
    id: string,
    numberRecipes?: number | null,
    recipesArray?: Array< string | null > | null,
    season?: Array< number | null > | null,
    type?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteDoneCalculationsSubscriptionVariables = {
  filter?: ModelSubscriptionDoneCalculationsFilterInput | null,
};

export type OnDeleteDoneCalculationsSubscription = {
  onDeleteDoneCalculations?:  {
    __typename: "DoneCalculations",
    cost?: number | null,
    createdAt: string,
    id: string,
    items?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteFavouriteDishesSubscriptionVariables = {
  filter?: ModelSubscriptionFavouriteDishesFilterInput | null,
};

export type OnDeleteFavouriteDishesSubscription = {
  onDeleteFavouriteDishes?:  {
    __typename: "FavouriteDishes",
    createdAt: string,
    id: string,
    preferences: string,
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

export type OnDeleteIngredientsSubscriptionVariables = {
  filter?: ModelSubscriptionIngredientsFilterInput | null,
};

export type OnDeleteIngredientsSubscription = {
  onDeleteIngredients?:  {
    __typename: "Ingredients",
    createdAt: string,
    id: string,
    items?:  {
      __typename: "ModelItemsConnection",
      nextToken?: string | null,
    } | null,
    maxLifespan?: number | null,
    name: string,
    unit: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteIngredientsShoppingListsSubscriptionVariables = {
  filter?: ModelSubscriptionIngredientsShoppingListsFilterInput | null,
};

export type OnDeleteIngredientsShoppingListsSubscription = {
  onDeleteIngredientsShoppingLists?:  {
    __typename: "IngredientsShoppingLists",
    createdAt: string,
    householdId: string,
    id: string,
    ingredientsId?: Array< string | null > | null,
    ingredientsName?: Array< string | null > | null,
    ingredientsQty?: Array< number | null > | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteItemsSubscriptionVariables = {
  filter?: ModelSubscriptionItemsFilterInput | null,
};

export type OnDeleteItemsSubscription = {
  onDeleteItems?:  {
    __typename: "Items",
    changeOfUnit?: string | null,
    createdAt: string,
    description: string,
    id: string,
    ingredient?:  {
      __typename: "Ingredients",
      createdAt: string,
      id: string,
      maxLifespan?: number | null,
      name: string,
      unit: string,
      updatedAt: string,
    } | null,
    ingredientId: string,
    link?: string | null,
    price: number,
    quantity: number,
    supermarketId: number,
    unit: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePendingCalculationsSubscriptionVariables = {
  filter?: ModelSubscriptionPendingCalculationsFilterInput | null,
};

export type OnDeletePendingCalculationsSubscription = {
  onDeletePendingCalculations?:  {
    __typename: "PendingCalculations",
    createdAt: string,
    householdId: string,
    id: string,
    name: string,
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

export type OnUpdateDishesSubscriptionVariables = {
  filter?: ModelSubscriptionDishesFilterInput | null,
};

export type OnUpdateDishesSubscription = {
  onUpdateDishes?:  {
    __typename: "Dishes",
    avgCost?: number | null,
    classification?: Array< string | null > | null,
    createdAt: string,
    diet?: Array< string | null > | null,
    dishName: string,
    id: string,
    numberRecipes?: number | null,
    recipesArray?: Array< string | null > | null,
    season?: Array< number | null > | null,
    type?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateDoneCalculationsSubscriptionVariables = {
  filter?: ModelSubscriptionDoneCalculationsFilterInput | null,
};

export type OnUpdateDoneCalculationsSubscription = {
  onUpdateDoneCalculations?:  {
    __typename: "DoneCalculations",
    cost?: number | null,
    createdAt: string,
    id: string,
    items?: Array< string | null > | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateFavouriteDishesSubscriptionVariables = {
  filter?: ModelSubscriptionFavouriteDishesFilterInput | null,
};

export type OnUpdateFavouriteDishesSubscription = {
  onUpdateFavouriteDishes?:  {
    __typename: "FavouriteDishes",
    createdAt: string,
    id: string,
    preferences: string,
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

export type OnUpdateIngredientsSubscriptionVariables = {
  filter?: ModelSubscriptionIngredientsFilterInput | null,
};

export type OnUpdateIngredientsSubscription = {
  onUpdateIngredients?:  {
    __typename: "Ingredients",
    createdAt: string,
    id: string,
    items?:  {
      __typename: "ModelItemsConnection",
      nextToken?: string | null,
    } | null,
    maxLifespan?: number | null,
    name: string,
    unit: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateIngredientsShoppingListsSubscriptionVariables = {
  filter?: ModelSubscriptionIngredientsShoppingListsFilterInput | null,
};

export type OnUpdateIngredientsShoppingListsSubscription = {
  onUpdateIngredientsShoppingLists?:  {
    __typename: "IngredientsShoppingLists",
    createdAt: string,
    householdId: string,
    id: string,
    ingredientsId?: Array< string | null > | null,
    ingredientsName?: Array< string | null > | null,
    ingredientsQty?: Array< number | null > | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateItemsSubscriptionVariables = {
  filter?: ModelSubscriptionItemsFilterInput | null,
};

export type OnUpdateItemsSubscription = {
  onUpdateItems?:  {
    __typename: "Items",
    changeOfUnit?: string | null,
    createdAt: string,
    description: string,
    id: string,
    ingredient?:  {
      __typename: "Ingredients",
      createdAt: string,
      id: string,
      maxLifespan?: number | null,
      name: string,
      unit: string,
      updatedAt: string,
    } | null,
    ingredientId: string,
    link?: string | null,
    price: number,
    quantity: number,
    supermarketId: number,
    unit: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePendingCalculationsSubscriptionVariables = {
  filter?: ModelSubscriptionPendingCalculationsFilterInput | null,
};

export type OnUpdatePendingCalculationsSubscription = {
  onUpdatePendingCalculations?:  {
    __typename: "PendingCalculations",
    createdAt: string,
    householdId: string,
    id: string,
    name: string,
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
