import Link from "next/link";
import React from "react";

const TreatmentDetails = () => {
  return (
    <div className="min-h-screen px-5 py-10 text-black">
      <div className="mx-auto max-w-[915px]">
        {/* Section Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-serif text-[28px] leading-tight tracking-[-0.5px] text-black">
              Treatment detail & specialist
            </h1>

            <p className="mt-2 text-[15px] text-[#a9b3ad]">
              Everything needed to decide, before committing to a date.
            </p>
          </div>

          <span className="mt-8 text-sm text-[#aab4ae]">03</span>
        </div>

        {/* Browser Preview */}
        <div className="overflow-hidden rounded-[18px] border">
          {/* Browser Header */}
          <div className="flex h-[47px] items-center border-b text-black  px-4">
            {/* Address bar */}
            <div className="ml-5 rounded-md border text-black px-3 py-1">
              <span className="font-mono text-[12px] text-[#8ea39a]">
                treatmenthub.app/treatments/sports-recovery
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid gap-10 px-7 py-7 md:grid-cols-[1fr_332px]">
            {/* Left */}
            <div>
              <p className="text-[14px] font-medium text-black">
                Physiotherapy
              </p>

              <h2 className="mt-1 font-serif text-[27px] leading-none text-black">
                Sports Recovery Session
              </h2>

              <div className="mt-4 text-[15px] text-black">
                60 minutes · <span className="text-black">★4.8</span> (212
                reviews) · <span className="text-black">₹1,200</span>
              </div>

              <p className="mt-5 max-w-[510px] text-[16px] leading-[1.7] text-black">
                A targeted session combining manual therapy and guided mobility
                work for recovering athletes and active adults managing
                recurring strain.
              </p>

              {/* Details */}
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-[14px] font-semibold text-black">
                    What's included
                  </h3>

                  <div className="mt-2 space-y-1 text-[15px] leading-6 text-[#abb6af]">
                    <p>Assessment · Manual therapy</p>
                    <p>Mobility plan · Take-home notes</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[14px] font-semibold text-black">
                    Before you arrive
                  </h3>

                  <div className="mt-2 space-y-1 text-[15px] leading-6 text-[#abb6af]">
                    <p>Wear loose clothing</p>
                    <p>Bring any prior scan results</p>
                  </div>
                </div>
              </div>

              {/* Cancellation */}
              <div className="mt-5 text-[14px] text-[#aab4ae]">
                <span className="font-semibold text-[#f0eee6]">
                  Cancellation policy
                </span>
                <span className="mx-1">—</span>
                free up to 12 hours before your slot.
              </div>
            </div>

            {/* Specialist Card */}
            <div className="self-start rounded-xl border border-[#303a34] bg-[#0d130f] p-5">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex h-48px w-[48px] shrink-0 items-center justify-center rounded-xl bg-[#16342f]">
                  <span className="text-sm font-semibold text-[#4bb5a2]">
                    ST
                  </span>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold text-[#f2efe7]">
                    Dr. Sarah Thomas
                  </h3>

                  <p className="mt-0.5 text-[14px] text-[#abb5af]">
                    ★4.9 · 1,140 sessions
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[14px] text-[#b2bdb6]">
                Next available:{" "}
                <span className="text-[#e9e6dc]">Today, 4:30 PM</span>
              </p>

              <Link
                href="/treatment/booking"
                className="mt-4 block w-full rounded-lg bg-[#e7a546] px-4 py-3 text-center text-[15px] font-semibold text-white"
              >
                Book this treatment
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="mt-[72px] h-px bg-[#29322d]" />
      </div>
    </div>
  );
};

export default TreatmentDetails;
