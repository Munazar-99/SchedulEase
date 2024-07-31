import React from "react";
import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getUser } from "@/lib/actions/user.actions";

// Define the props type
interface SearchParamProps {
  params: {
    userId: string;
  };
}

async function NewAppointment({ params: { userId } }: SearchParamProps) {
  // Fetch user data
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 flex-col justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            priority
            height={40} 
            width={160} 
            alt="logo"
            className="mb-12"
          />
          <AppointmentForm type="create" userId={userId} />

          <p className="copyright tracking-widest mt-10 py-12 text-center">
            © 2024 Munazar Ali
          </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        priority
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}

export default NewAppointment;
