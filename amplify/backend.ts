import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { updateCognitoHousehold } from './functions/update-cognito-household/resource'

const backend = defineBackend({
  auth,
  data,
  storage,
  updateCognitoHousehold
});

