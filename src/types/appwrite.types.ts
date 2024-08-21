import { Models } from "node-appwrite";

export interface Appointment extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  status:string
}