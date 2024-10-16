import { defineAuth } from "@aws-amplify/backend";
import { postConfirmation } from "../auth/post-confirmation/resource";
//import { preTokenGeneration } from "../auth/pre-token-generation/resource";
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  
  userAttributes: {
    // specify a "birthdate" attribute
    "custom:householdID": {
      dataType: "String",
      mutable: true,
    },
    "custom:householdName": {
      dataType: "String",
      mutable: true,
    },
    "custom:userID": {
      dataType: "String",
      mutable: true,
    }
  },  
  triggers: {
    postConfirmation,
    //preTokenGeneration
  },
  access: (allow) => [allow.resource(postConfirmation).to(["updateUserAttributes"])]
});