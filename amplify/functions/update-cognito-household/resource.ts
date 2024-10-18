import { defineFunction } from '@aws-amplify/backend';

export const updateCognitoHousehold = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'update-cognito-household',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts'
});