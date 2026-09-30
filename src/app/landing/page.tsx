import {
  Ambulance,
  FlaskConical,
  HeartPulse,
  HouseHeart,
  Phone,
  Search,
  UserRound,
  Pill,
  ScanLine,
} from "lucide-react";

const diagnosticServices = [
  {
    title: "X-Ray, MRI, CT, ECHO",
    icon: ScanLine,
  },
  {
    title: "Health Check Packages",
    icon: HeartPulse,
  },
  {
    title: "Lab Tests",
    icon: FlaskConical,
  },
];

const otherServices = [
  {
    title: "Second Opinion",
    icon: UserRound,
  },
  {
    title: "Medicine Delivery",
    icon: Pill,
  },
  {
    title: "Homecare Services",
    icon: HouseHeart,
  },
];

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <section className="relative">
      <div className="relative h-[235px] overflow-hidden bg-[#f45135]">

          <div className="relative mx-auto flex max-w-[1400px] items-start justify-between px-8 pt-8">
            {/* Greeting */}
            <h1 className="text-2xl font-semibold text-white">
              FInd You Next Therapist,{" "}
              <span className="underline decoration-2 underline-offset-4">
                for exactly what's bothering you
              </span>
            </h1>
            
          </div>
        </div>


        {/* Appointment card */}
        <div className="relative z-10 mx-auto -mt-[52px] max-w-[820px] px-4">
          <div className="rounded-[20px] border border-gray-300 bg-white p-5 shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
            <p>Search by condition, specialty or doctor name, compare real availability,
               and confirm a visit or video consult — no phone calls needed.</p>
           
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-[1150px] px-6 pb-16 pt-12">
        <ServiceSection
          title="Book Diagnostic Services"
          services={diagnosticServices}
        />

        <div className="mt-12">
          <ServiceSection title="Other Services" services={otherServices} />
        </div>
      </section>
    </main>
  );
}

type Service = {
  title: string;
  icon: React.ElementType;
};

function ServiceSection({
  title,
  services,
}: {
  title: string;
  services: Service[];
}) {
  return (
    <section>
      <h2 className="mb-5 text-[24px] font-semibold text-[#4b4b4b]">{title}</h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <button key={service.title} className="group text-center">
              {/* Card */}
              <div className="flex h-[100px] items-center justify-center rounded-[20px] border border-[#ddd] bg-white transition-all duration-200 group-hover:-translate-y-1 group-hover:border-[#f45135] group-hover:shadow-md">
                <Icon
                  size={48}
                  strokeWidth={1.5}
                  className="text-[#555] transition group-hover:text-[#f45135]"
                />
              </div>

              {/* Label */}
              <p className="mt-2 text-[17px] font-medium text-[#666]">
                {service.title}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
