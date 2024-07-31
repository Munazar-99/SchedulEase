'use server';

import { ID } from 'node-appwrite';
import getAppWriteConfig from '../appwrite.config';
import { getEnv, parseStringify } from '../utils';

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const { databases } = getAppWriteConfig();
    const DATABASE_ID = getEnv('DATABASE_ID');
    const APPOINTMENTS_COLLECTION_ID = getEnv('APPOINTMENTS_COLLECTION_ID');

    const newAppointment = await databases.createDocument(
      DATABASE_ID,
      APPOINTMENTS_COLLECTION_ID,
      ID.unique(),
      appointment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error; // Re-throw the error after logging it
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const { databases } = getAppWriteConfig();
    const DATABASE_ID = getEnv('DATABASE_ID');
    const APPOINTMENTS_COLLECTION_ID = getEnv('APPOINTMENTS_COLLECTION_ID');

    const appointment = await databases.getDocument(
      DATABASE_ID,
      APPOINTMENTS_COLLECTION_ID,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    throw error; // Re-throw the error after logging it
  }
};
