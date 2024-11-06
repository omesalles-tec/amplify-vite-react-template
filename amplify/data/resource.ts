import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { postConfirmation } from "../auth/post-confirmation/resource";
import { updateCognitoHousehold } from "../functions/update-cognito-household/resource";
//import { preTokenGeneration } from "../auth/pre-token-generation/resource";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a
  .schema({
    User: a.model({
      id: a.id().required(),
      email: a.string(),
      householdID: a.id().required(),
      adminFlag: a.boolean().required(),
      anonymousLabel: a.string(),
      anonymousFlag: a.boolean().required(),
      tags: a.string().array(),
    }),
    Requests: a.model({
      userId: a.string().required(),
      userEmail: a.string().required(),
      adminEmail: a.string().required(),
    }),
    Household: a.model({
      id: a.id().required(),
      householdName: a.string().required(),
      //members: a.hasMany("User", "householdID"),
      //https://docs.amplify.aws/react/build-a-backend/data/connect-to-existing-data-sources/connect-external-ddb-table/
    }),
    Ingredients: a.model({
      id: a.id().required(),
      name: a.string().required(), 
      unit: a.string().required(), 
      maxLifespan: a.integer(),
      items: a.hasMany('Items', 'ingredientId')
    }),   
    Items: a.model({
      id: a.id().required(),
      ingredientId: a.id().required(), 
      supermarketId: a.integer().required(), 
      description:a.string().required(), 
      link: a.string(), 
      price: a.float().required(), 
      unit: a.string().required(), 
      quantity: a.float().required(), 
      changeOfUnit: a.string(),
      ingredient: a.belongsTo('Ingredients', 'ingredientId')
    }).secondaryIndexes((index) => [index("ingredientId")]),
    IngredientsShoppingLists: a.model({
      id: a.id().required(),
      name: a.string().required(), 
      householdId: a.string().required(),
      ingredientsId: a.string().array(),
      ingredientsName: a.string().array(),
      ingredientsQty: a.float().array(),
    }),
    PendingCalculations: a.model({
      id: a.id().required(),
      name: a.string().required(), 
      householdId: a.string().required(),
    }),
    DoneCalculations: a.model({
      id: a.id().required(),
      createdAt: a.string().required(),
      items: a.json().array(),
      cost: a.float(),
    })
    .identifier(['id', 'createdAt']), // https://docs.amplify.aws/react/build-a-backend/data/data-modeling/identifiers/
    updateCognitoHousehold: a
      .mutation()
      .arguments({
        userEmail: a.string(),
        newHouseholdID: a.string(),
      })
      .returns(a.string())
      .handler(a.handler.function(updateCognitoHousehold)),
  })
  .authorization((allow) => [
    allow.resource(postConfirmation),
    allow.resource(updateCognitoHousehold),
    allow.authenticated(),
  ]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    /*defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },*/
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
