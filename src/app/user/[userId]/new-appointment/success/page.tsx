import Link from "next/link";
import Image from "next/image";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Button } from "@/components/ui/button";

interface SearchParamProps {
  params: {
    userId: string;
  };
  searchParams: {
    appointmentId?: string;
  };
}

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  const appointmentId = searchParams.appointmentId || "";
  
  // Fetch appointment data on the server
  let appointment = null;
  if (appointmentId) {
    try {
      appointment = await getAppointment(appointmentId);
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  }

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img flex flex-col items-center justify-center w-full">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            priority
            height={40}
            width={160} 
            alt="logo"
            className="mb-6"
          />
        </Link>
        <section className="flex flex-col items-center mb-8">
          <Image
            src="/assets/gifs/success.gif"
            priority
            height={300}
            width={200}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted.
          </h2>
          <p className="text-center">We will be in touch shortly to confirm</p>
        </section>
        <Button variant="outline" className="shad-primary-btn">
          <Link href={`/user/${userId}/new-appointment`}>New Appointment</Link>
        </Button>
        <p className="copyright mt-6 text-center">© 2024 Munazar Ali</p>
      </div>
    </div>
  );
};

export default Success;
