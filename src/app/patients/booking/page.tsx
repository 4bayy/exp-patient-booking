import AppointmentForm from "@/components/forms/bookingForm";
import Banner from "../../../../assets/banner.jpg";
import Image from "next/image";
import BookingForm from "@/components/forms/bookingForm";

export default async function NewAppointment({ params }: { params: { userid: string } }) {


  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full ">
        <BookingForm />
      </div>
    </main>
  );
}
