"use server";

import { ID, Query } from "node-appwrite";
import getAppWriteConfig from "../appwrite.config";
import { getEnv, parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  const { users, databases } = getAppWriteConfig();
  const USER_COLLECTION_ID = getEnv("USER_COLLECTION_ID");
  const DATABASE_ID = getEnv("DATABASE_ID");

  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log({newUser});

    // register user
    const registeredUser = await databases.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      newUser.$id,
      {
        email: user.email,
        phone: user.phone,
        name: user.name,
        userId: newUser.$id,
      }
    );
    return newUser;
  } catch (error: any) {
    if (error?.code === 409) {
      const existingUsers = await users.list([
        Query.equal("email", [user.email]),
      ]);
      return existingUsers?.users[0];
    }
    console.error("Error creating user:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const getUser = async (userId: string) => {
  try {
    const { users } = getAppWriteConfig();
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error: any) {
    console.error("Error fetching user:", error);
    throw error; // Re-throw the error after logging it
  }
};
