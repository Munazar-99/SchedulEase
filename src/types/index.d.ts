/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare type CreateAppointmentParams = {
  userId: string;
  reason: string;
  schedule: Date;
  status: Status;
  users:string
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  timeZone?: string;
  appointment: Appointment;
  type: string;
};
