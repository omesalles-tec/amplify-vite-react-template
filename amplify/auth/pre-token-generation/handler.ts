import type { PreTokenGenerationTriggerHandler } from "aws-lambda";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../data/resource";
import { listUsers } from "../../graphql/queries";
import { env } from "process";

/* Adding householdID to the session info to check authorisation
however this is not a secure way to do it, as the householdID is
publicly available in the url.

A better way would be to use a custom authorisation header in the
API and check the user's householdID there.
*/

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

export const handler: PreTokenGenerationTriggerHandler = async (event) => {
  try {
    const user = await client.graphql({
      query: listUsers,
      variables: {
        filter: {
          email: { eq: event.request.userAttributes.email || "" },
        },
      },
    });

  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        householdID: user.data?.listUsers?.items[0]?.householdID || "",
      },
    },
  };

    return event;
  } catch (error) {
    console.error("Error adding housholdID to session info:", error);
    return event;
  }
};
