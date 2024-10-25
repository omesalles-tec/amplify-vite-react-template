import type { Schema } from "../../data/resource";
import {
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import { env } from "process";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT || "",
        region: env.AWS_REGION,
        defaultAuthMode: "iam",
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID || "",
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY || "",
            sessionToken: env.AWS_SESSION_TOKEN || "",
          },
        }),
        clearCredentialsAndIdentityId: () => {},
      },
    },
  }
);

const clientGraphql = generateClient<Schema>({
  authMode: "iam",
});

const cognitoClient = new CognitoIdentityProviderClient({
  region: env.AWS_REGION,
  
});

export const handler: Schema["updateCognitoHousehold"]["functionHandler"] =
  async (event) => {
    // your function code goes here
    try {
      const userEmail = event.arguments.userEmail ?? "";
      const newHouseholdID = event.arguments.newHouseholdID ?? "";
      const updateCommand = new AdminUpdateUserAttributesCommand({
        UserPoolId: env.userPoolId || "",
        Username: userEmail,
        UserAttributes: [
          {
            Name: "custom:householdID",
            Value: newHouseholdID,
          },
        ],
      });

      console.log(updateCommand);
      // Execute the update command
      await cognitoClient.send(updateCommand);
      console.log(
        `Successfully updated custom attribute for user ${userEmail}`
      );
      return "success";
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
