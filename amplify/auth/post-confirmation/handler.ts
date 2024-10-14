import type { PostConfirmationTriggerHandler } from "aws-lambda";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../data/resource";
import { createHousehold, createUser } from "../../graphql/mutations";
import { env } from "process";

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
            accessKeyId: env.AWS_ACCESS_KEY_ID || '',
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY || '',
            sessionToken: env.AWS_SESSION_TOKEN || '',
          },
        }),
        clearCredentialsAndIdentityId: () => {
          /* noop */
        },
      },
    },
  }
)

const client = generateClient<Schema>({
  authMode: "iam",
});

export const handler: PostConfirmationTriggerHandler = async (event) => {
  try {
    const {
      userName,
      request: { userAttributes },
    } = event;
    // Creata a default household
    const createHouseholdResult = await client.graphql({
        query: createHousehold,
        variables: {
          input: {
            householdName: "Default household",
          },
        },
      });
    const householdID = createHouseholdResult.data.createHousehold?.id || null;

    // Create a new user with the householdID
    await client.graphql({
      query: createUser,
      variables: {
        input: {
          email: event.request.userAttributes.email,
          householdID: householdID,
          householdName: "Default household",
        },
      },
    });

    // add householdID to AWS cognito user attributes custom:householdID
    if (event.response && typeof event.response === 'object') {
      const response = event.response as { userAttributes?: Record<string, string> };
      if (!response.userAttributes) {
        response.userAttributes = {};
      }
      if (householdID) {
        response.userAttributes["custom:householdID"] = householdID;
      }
    }

  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
  return event;
};