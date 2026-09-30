"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  MapPin,
  Search,
  HeartPulse,
  Atom,
  Brain,
  Stethoscope,
  Bone,
} from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import BookingForm from "@/components/forms/bookingForm";
import ProductCard from "@/components/ProductCard";
// import { isLoggedIn } from "@/utils/auth";

const specialties = [
  {
    id: 123,
    name: "Cardiac Care",
    icon: HeartPulse,
  },
  {
    id: 9839,
    name: "Cancer Care",
    icon: Atom,
  },
  {
    id: 3939,
    name: "Neurosciences",
    icon: Brain,
  },
  {
    id: 64930,
    name: "Gastro sciences",
    icon: Stethoscope,
  },
  {
    id: 784939,
    name: "Orthopaedics",
    icon: Bone,
  },
];

export default function TreatmentSelectionPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [hospital, setHospital] = useState("All Medanta Hospitals");

  // const loggedIn = await isLoggedIn();

  // if (!loggedIn) {
  //   redirect("/login");
  // }

  return (
    <main className="min-h-screen bg-[#f3f3f3]">
      {/* Main content */}
      <div className="mx-auto max-w-[900px] px-6 py-[18px]">
        {/* Hospital selector */}
        <div className="mb-[18px] flex items-center gap-3">
          <span className="text-[19px] font-semibold text-[#292929]">
            Showing in
          </span>

          <MapPin
            size={23}
            fill="#f45135"
            strokeWidth={1.5}
            className="text-[#f45135]"
          />

          <button
            type="button"
            className="flex items-center gap-2 text-[18px] font-semibold text-[#f45135]"
          >
            <span className="underline underline-offset-2">{hospital}</span>

            <ChevronDown size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-[22px]">
          <Search
            size={25}
            strokeWidth={2}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-[#333]"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search For Doctors or Specialty"
            className="
              h-[68px]
              w-full
              rounded-[11px]
              border
              border-[#d6d6d6]
              bg-white
              px-6
              pr-16
              text-[20px]
              text-[#444]
              outline-none
              placeholder:text-[#747474]
              focus:border-[#f45135]
              focus:ring-1
              focus:ring-[#f45135]
            "
          />
        </div>

        {/* Specialties */}
        <section className="bg-white px-[22px] pb-[20px] pt-[22px]">
          <div className="flex justify-around p-2 m-2">
            {specialties.map((item) => (
              <div className="bg-green-200  h-14 rounded p-4 flex ">
                <p key={item.id}>{item.name}</p>
              </div>
            ))}
          </div>

          {/*  treatment section */}

            <div className="grid grid-cols-3  gap-4 mt-4">
              <ProductCard />
              <ProductCard /> 
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
        </section>
      </div>
    </main>
  );
}

function SpecialtyCard({
  name,
  icon: Icon,
}: {
  name: string;
  icon: React.ElementType;
}) {
  return (
    <button
      type="button"
      className="
        group
        flex
        min-w-0
        flex-col
        items-center
        justify-center
        rounded-lg
        py-1
        transition
        hover:bg-[#fff7f5]
      "
    >
      <div className="flex h-[55px] items-center justify-center">
        <Icon
          size={47}
          strokeWidth={1.3}
          className="text-[#4d4d4d] transition-colors group-hover:text-[#f45135]"
        />
      </div>

      <span className="mt-[9px] whitespace-nowrap text-[15px] font-medium text-[#333]">
        {name}
      </span>
    </button>
  );
}
