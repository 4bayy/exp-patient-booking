import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Banner from "../assets/banner.jpg";

const HomePage = () => {
  return (
    <main className="min-h-screen flex">
      {/* Left */}
      <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <PatientForm />
        </div>
      </div>

      <div className="relative hidden lg:block lg:w-1/2">
        <Image
          src={Banner}
          alt="Healthcare Banner"
          fill
          priority
          className="object-cover"
        />
      </div>
    </main>
  );
};

export default HomePage;