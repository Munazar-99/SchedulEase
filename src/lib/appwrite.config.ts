'use server';

import * as sdk from 'node-appwrite';

const getAppWriteConfig = () => {
  const { PROJECT_ID, API_KEY, ENDPOINT } = process.env;

  if (!PROJECT_ID || !API_KEY || !ENDPOINT) {
    throw new Error('Missing environment variables');
  }

  const client = new sdk.Client();

  client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);

  const databases = new sdk.Databases(client);
  const storage = new sdk.Storage(client);
  const users = new sdk.Users(client);
  const messaging = new sdk.Messaging(client);

  return {
    client,
    databases,
    storage,
    users,
    messaging,
  };
};

export default getAppWriteConfig;
