"use server";

import { ID, Query } from "node-appwrite";
import getAppWriteConfig from "../appwrite.config";
import { getEnv, parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const { databases } = getAppWriteConfig();
    const DATABASE_ID = getEnv("DATABASE_ID");
    const APPOINTMENTS_COLLECTION_ID = getEnv("APPOINTMENTS_COLLECTION_ID");

    const newAppointment = await databases.createDocument(
      DATABASE_ID,
      APPOINTMENTS_COLLECTION_ID,
      ID.unique(),
      appointment
    );
    revalidatePath("/admin");
    console.log({ newAppointment });
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const { databases } = getAppWriteConfig();
    const DATABASE_ID = getEnv("DATABASE_ID");
    const APPOINTMENTS_COLLECTION_ID = getEnv("APPOINTMENTS_COLLECTION_ID");

    const appointment = await databases.getDocument(
      DATABASE_ID,
      APPOINTMENTS_COLLECTION_ID,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const getRecentAppointments = async () => {
  try {
    const { databases } = getAppWriteConfig();
    const DATABASE_ID = getEnv("DATABASE_ID");
    const APPOINTMENTS_COLLECTION_ID = getEnv("APPOINTMENTS_COLLECTION_ID");
    const appointments = await databases.listDocuments(
      DATABASE_ID,
      APPOINTMENTS_COLLECTION_ID,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };
    revalidatePath("/admin");
    return parseStringify(data);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  console.log("func hit");

  const { databases } = getAppWriteConfig();
  const DATABASE_ID = getEnv("DATABASE_ID");
  const APPOINTMENTS_COLLECTION_ID = getEnv("APPOINTMENTS_COLLECTION_ID");

  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENTS_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) throw Error;

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
  }
};
