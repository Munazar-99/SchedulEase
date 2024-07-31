"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { AppointmentFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./ClientForm";
import { createAppointment } from "@/lib/actions/appointment.actions";

// Define the types for props
interface AppointmentFormProps {
  userId: string;
  type: "create" | "cancel" | "schedule";
}

const AppointmentForm = ({ userId, type }: AppointmentFormProps) => {
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      schedule: new Date(),
      reason: "",
      cancellationReason: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Map status and button labels based on the form type
  const statusMap: Record<string, Status> = {
    schedule: "scheduled",
    cancel: "cancelled",
    create: "pending",
  };

  const buttonLabelMap: Record<string, string> = {
    cancel: "Cancel Appointment",
    create: "Create Appointment",
    schedule: "Schedule Appointment",
  };

  const onSubmit = async (data: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);

    try {
      if (type === "create" && userId) {
        const appointmentData = {
          userId,
          schedule: new Date(data.schedule),
          reason: data.reason,
          status: statusMap[type],
        };

        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/user/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">
            Request a new Appointment in 10 seconds
          </p>
        </section>
        {type !== "cancel" ? (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
              placeholder="John Doe"
            />
            <div className="flex flex-col gap-6">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter reason for appointment"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
              />
            </div>
          </>
        ) : (
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Enter reason for cancellation"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabelMap[type]}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
