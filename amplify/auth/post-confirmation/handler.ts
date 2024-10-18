import type { PostConfirmationTriggerHandler } from "aws-lambda";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../data/resource";
import { createHousehold, createUser } from "../../graphql/mutations";
import { env } from "process";
import {
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

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

export const handler: PostConfirmationTriggerHandler = async (event) => {
  try {
    const {
      userName,
      request: { userAttributes },
    } = event;
    // Creata a default household
    const createHouseholdResult = await clientGraphql.graphql({
      query: createHousehold,
      variables: {
        input: {
          householdName: "Default household",
        },
      },
    });
    const householdID = createHouseholdResult.data.createHousehold?.id || "";
    // Create a new user with the householdID
    const createUserResult = await clientGraphql.graphql({
      query: createUser,
      variables: {
        input: {
          id: event.request.userAttributes.sub,
          adminFlag: true,
          anonymousFlag: false,
          anonymousLabel: "",
          email: event.request.userAttributes.email,
          householdID: householdID,
          tags: [],
        },
      },
    });

    // Add householdID to AWS Cognito user attributes
    if (householdID) {
      // Use AdminUpdateUserAttributesCommand to update the user's custom attributes in Cognito
      const updateCommand = new AdminUpdateUserAttributesCommand({
        UserPoolId: event.userPoolId,
        Username: event.userName,
        UserAttributes: [
          {
            Name: "custom:householdID", 
            Value: householdID,
          },
        ],
      });

      // Execute the update command
      await cognitoClient.send(updateCommand);
      console.log(`Successfully updated custom attribute for user ${userName}`);
      return event; // Always return the event
    }
  } catch (error) {
    console.error("Error in post-confirmation handler:", error);
    throw error;
  }
};
