"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomFormField from "../CustomFormField";
import { FormFieldType } from "@/types/form";

import { Button } from "@base-ui/react";
import { CalendarDays, Clock, MapPin, ShieldCheck } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { watch } from "fs";
import TreatmentCard from "../TreatmentCard";
import React, { useMemo } from "react";
import { Field, FieldLabel } from "../ui/field";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const appointmentSchema = z.object({
  spaId: z.string().min(1, "Please select a spa"),
  userId: z.string().min(1, "User ID is required"),
  allergies: z.string().optional(),
  treatment: z.string().min(1, "Please select a treatment"),
  therapist: z.string().min(1, "Please select a Therapist"),

  appointmentDate: z.date({ message: "Appointment date is required" }),
  appointmentTime: z.string().min(1, "Select appointment time"),

  reason: z.string().min(5, "Please describe your reason"),

  agreeTerms: z.boolean().refine((v) => v === true, {
    message: "Accept terms before booking",
  }),
});

const spaOptions = [
  {
    label: "Sydney Care Center",
    value: "sydney",
  },
  {
    label: "Melbourne Health Spa",
    value: "melbourne",
  },
  {
    label: "Brisbane Medical Center",
    value: "brisbane",
  },
];

const treatementOptions = [
  {
    id: "t001",
    name: "General Consultation",
    category: "Primary Care",
    description:
      "Basic health checkup and consultation with a general physician.",
    duration: "30 minutes",
    price: 50,
    icon: "stethoscope",
  },
  {
    id: "t002",
    name: "Cardiology Consultation",
    category: "Heart Care",
    description:
      "Diagnosis and treatment consultation for heart-related conditions.",
    duration: "45 minutes",
    price: 120,
    icon: "heart",
  },
  {
    id: "t003",
    name: "Dermatology Treatment",
    category: "Skin Care",
    description:
      "Treatment for skin conditions, acne, allergies, and infections.",
    duration: "40 minutes",
    price: 90,
    icon: "scan-face",
  },
  {
    id: "t004",
    name: "Dental Checkup",
    category: "Dental Care",
    description: "Complete oral examination and dental consultation.",
    duration: "30 minutes",
    price: 70,
    icon: "smile",
  },
  {
    id: "t005",
    name: "Physiotherapy Session",
    category: "Rehabilitation",
    description: "Physical therapy for pain relief and mobility improvement.",
    duration: "60 minutes",
    price: 80,
    icon: "activity",
  },
  {
    id: "t006",
    name: "Blood Test",
    category: "Laboratory",
    description: "Routine blood examination and health screening.",
    duration: "20 minutes",
    price: 40,
    icon: "flask",
  },
];

export const therapist = [
  {
    id: "doc001",
    name: "Dr. Sarah Johnson",
    specialization: "General Physician",
    experience: "10 years",
    qualification: "MBBS, MD",
    location: "Sydney Care Center",
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableTime: ["09:00 AM", "11:00 AM", "03:00 PM"],
    rating: 4.8,
    image: "/doctors/sarah-johnson.jpg",
  },
  {
    id: "doc002",
    name: "Dr. Michael Brown",
    specialization: "Cardiologist",
    experience: "15 years",
    qualification: "MBBS, MD Cardiology",
    location: "Melbourne Health Spa",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    availableTime: ["10:00 AM", "01:00 PM", "05:00 PM"],
    rating: 4.9,
    image: "/doctors/michael-brown.jpg",
  },
  {
    id: "doc003",
    name: "Dr. Emily Wilson",
    specialization: "Dermatologist",
    experience: "8 years",
    qualification: "MBBS, MD Dermatology",
    location: "Brisbane Medical Center",
    availableDays: ["Monday", "Thursday", "Sunday"],
    availableTime: ["09:30 AM", "12:30 PM", "04:30 PM"],
    rating: 4.7,
    image: "/doctors/emily-wilson.jpg",
  },
  {
    id: "doc004",
    name: "Dr. David Lee",
    specialization: "Physiotherapist",
    experience: "12 years",
    qualification: "BPT, MPT",
    location: "Sydney Care Center",
    availableDays: ["Wednesday", "Friday", "Saturday"],
    availableTime: ["08:00 AM", "02:00 PM", "06:00 PM"],
    rating: 4.6,
    image: "/doctors/david-lee.jpg",
  },
];

export default function BookingForm() {

  const userId = useSelector((state: any)=> state.onboard.userId);  
  const spaId = useSelector((state:any)=> state.onboard.spaId);


  console.log(" User ID  and spa Id ", userId , spaId);
  const form = useForm({
    resolver: zodResolver(appointmentSchema),

    defaultValues: {
      spaId: spaId,
      userId: userId,
      allergies: "",
      treatment: "",
      therapist: "",
      appointmentDate: undefined,
      appointmentTime: "",
      reason: "",
      agreeTerms: false,
    },
  });

  const values = form.watch();
  const selectedTreatment = form.watch("treatment");
  const treatmentDetails = treatementOptions.find(
    (item) => item.name === selectedTreatment,
  );

  console.log(
    "Selected Treatment and doctor",
    form.watch("therapist"),
    form.watch("appointmentDate"),
  );

  // Calculate available time slots based on selected treatment and therapist
  //  memo for future optimization

  const availableTimeSlots = () => {
    const selectedTherapist = form.watch("therapist");
    const selectedDate = form.watch("appointmentDate");
    if (!selectedTherapist || !selectedDate) {
      console.log("No treatment or therapist or date selected");
      return [];
    }

    const timeSlots =
      therapist.find((item) => item.name === form.watch("therapist"))
        ?.availableTime || [];
    return timeSlots;
  };
  const timeslots = availableTimeSlots();
  console.log("Available Time Slots", timeslots);

  const onSubmit = (data: any) => {
    console.log("Appointment Data", data);
  };

  return (
    <main
      className="
      min-h-screen
      bg-gradient-to-br
      from-emerald-50
      via-white
      to-sky-50
      px-6
      py-12
    "
    >
      {/* Header */}

      <section className="mb-10 text-center">
        <div
          className="
          mx-auto
          mb-4
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-emerald-100
          text-3xl
        "
        >
          🩺
        </div>

        <h1
          className="
          text-4xl
          font-bold
          text-slate-900
        "
        >
          Book an Appointment
        </h1>

        <p
          className="
          mt-3
          text-slate-500
        "
        >
          Schedule your healthcare visit in less than a minute.
        </p>
      </section>

      <div
        className="
        mx-auto
        grid
        max-w-6xl
        gap-8
        lg:grid-cols-[2fr_1fr]
      "
      >
        {/* FORM */}

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="
          rounded-3xl
          border
          bg-white
          p-8
          shadow-xl
          "
        >
          <div className="mb-8">
            <h2
              className="
              text-2xl
              font-bold
              text-slate-900
            "
            >
              Appointment Details
            </h2>

            <p
              className="
              mt-2
              text-sm
              text-slate-500
            "
            >
              Provide details for your appointment.
            </p>
          </div>

          <div className="space-y-6">
            {/* Select Treatment */}

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              name="treatment"
              label="Select Treatment"
              control={form.control}
              renderSelect={(field) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select Treatment" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {treatementOptions.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {/* if treament selected */}
            <div>
              {selectedTreatment && (
                <div>
                  <TreatmentCard treatment={treatmentDetails} selected={true} />
                </div>
              )}
            </div>

            {/* Therapist */}
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              name="therapist"
              label="Select Therapist"
              control={form.control}
              renderSelect={(field) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-12 rounded-xl ">
                    <SelectValue placeholder="Select Therapist" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {therapist.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {/* Date & Time */}

            <div
              className="grid gap-6 mt-4 md:grid-cols-2"
            >
              <CustomFormField
                fieldType={FormFieldType.DATE_TiME_PICKER}
                name="appointmentDate"
                label="Appointment Date"
                control={form.control}
              />

              <Field className="w-48">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  name="appointmentTime"
                  label="Time"
                  control={form.control}
                  renderSelect={(field) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={timeslots.length === 0}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue
                          placeholder={
                            timeslots.length === 0
                              ? "Select therapist & date first"
                              : "Select Time"
                          }
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {timeslots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </div>

            <CustomFormField
              fieldType={FormFieldType.TEXT_AREA}
              name="reason"
              label="Reason for Visit"
              placeholder="
              Describe your symptoms or reason for appointment
              "
              control={form.control}
            />

            <CustomFormField
              fieldType={FormFieldType.TEXT_AREA}
              name="allergies"
              label="Medical Conditions"
              placeholder="Any allergies or medical history"
              control={form.control}
            />

            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              name="agreeTerms"
              label="Terms & Conditions"
              placeholder="I agree to the Terms and Conditions"
              control={form.control}
            />

            <Button
              type="submit"
              className="
                h-14
                w-full
                rounded-xl
                bg-emerald-600
                text-lg
                font-semibold
                text-white
                hover:bg-emerald-700
              "
            >
              Confirm Appointment
            </Button>
          </div>
        </form>

        {/* SUMMARY */}

        <aside
          className="
          h-fit
          rounded-3xl
          border
          bg-white
          p-6
          shadow-xl
        "
        >
          <h3
            className="
            text-xl
            font-bold
          "
          >
            Appointment Summary
          </h3>

          <div
            className="
            mt-6
            space-y-4
          "
          >
            <div className="rounded-xl bg-slate-50 p-4">
              <MapPin size={20} />

              <p className="mt-2 text-sm text-slate-500">Location</p>

              <p className="font-semibold">{values.spa || "Not selected"}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <CalendarDays size={20} />

              <p className="mt-2 text-sm text-slate-500">Date</p>

              <p className="font-semibold">
                {values.appointmentDate
                  ? values.appointmentDate.toDateString()
                  : "Not selected"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <Clock size={20} />

              <p className="mt-2 text-sm text-slate-500">Time</p>

              <p className="font-semibold">
                {values.appointmentTime || "Not selected"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <ShieldCheck size={20} />

              <p className="mt-2 text-sm text-slate-500">Insurance</p>

              <p className="font-semibold">
                {values.insuranceProvider || "None"}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
