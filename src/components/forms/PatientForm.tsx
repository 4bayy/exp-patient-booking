"use client";

import { userSchema } from "@/utils/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import CustomFormField from "../CustomFormField";

type FormValues = z.infer<typeof userSchema>;

export enum FormFieldType {
  INPUT = "input",
  PHONE = "phone",
}

export default function PatientForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Header */}
        <section className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Welcome 👋
          </h1>

          <p className="text-gray-500">
            Start your onboarding by filling in your details.
          </p>
        </section>

        {/* Form Fields */}
        <div className="space-y-5">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            icon=""
            iconAlt=""
            control={form.control}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="email"
            label="Email"
            placeholder="john@example.com"
            icon=""
            iconAlt=""
            control={form.control}
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE}
            name="phone"
            label="Phone Number"
            placeholder="+91 9876543210"
            icon=""
            iconAlt=""
            control={form.control}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="password"
            label="Password"
            placeholder="••••••••"
            icon=""
            iconAlt=""
            control={form.control}
          />
        </div>

        {/* Button */}
        <Button type="submit" className="h-11 w-full rounded-lg bg-green-500">
          Continue
        </Button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          By continuing, you agree to our Terms & Conditions.
        </p>
      </form>
    </div>
  );
}
