"use client";

import z from "zod";
import CustomFormField from "../CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { EnquiryData, FormFieldType } from "@/types/form";
import { Button } from "@base-ui/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Suspense } from "react";
// import { useRouter } from "next/navigation";
import { createEnquiry } from "@/services/enquiry";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSpaId, setUserId } from "@/redux/onboardSlice";

const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

export const onBoardSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  fullName: z.string().min(3, "3 Charectors required"),
  email: z.string().min(3, "Min 3 Charectors are required"),
  phoneNumber: z
    .string()
    .min(8, " Minimum 8 Charectors are required")
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  dateOfBirth: z.date().nullable(),
  address: z.string().min(5, "Address is required"),
  gender: z.enum(["male", "female", "other"]),
  occupation: z.string().min(5, "Address is required"),
  emergencyContactName: z.string().min(3, "3 Charectors required"),
  emergencyContactNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid emergency contact number"),
  // insuranceProvider: z.string().min(3, " 3 chareactors required"),
  spaId: z.string().min(1, "Please select a spa"),
  agreeTerms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms.",
  }),
});

interface SpaProps {
  label: string;
  city: string;
  spaId: string;
}
interface User {
  userId: string;
  fullName: string;
  email: string;
}

interface OnBoardingProps {
  spaOptions: SpaProps[];
  userData: User;
}

export default function OnBoardingForm({ spaOptions, userData }: OnBoardingProps) {

  const router = useRouter();
  // redux 
  const dispatch = useDispatch();
  
  const form = useForm({
    resolver: zodResolver(onBoardSchema),
    defaultValues: {
      userId:   userData.userId, // Replace with actual user ID
      spaId: "",    
      fullName: userData.fullName,
      email: userData.email,
      phoneNumber: "",

      dateOfBirth: null,

      gender: "male",
      address: "",
      occupation: "",

      emergencyContactName: "",
      emergencyContactNumber: "",

      insuranceProvider: "",
      insurancePolicyNumber: "",
      medicalConditions: "",

      agreeTerms: false,
    },
  });

  const onSubmit = async (data: EnquiryData) => {
  try {

    console.log("Form data", data);
    const result = await createEnquiry(data);
    console.log("Result", result);

    if (result?.data?.id) {
      dispatch(setUserId(data.userId));
      dispatch(setSpaId(data.spaId));
      
      setTimeout(() => {
        router.push(`/patients/booking`);
      }, 1000);
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto w-full max-w-5xl px-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Header */}
          <section className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Welcome to Medanta
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-slate-500">
              Complete your personal and medical information to help us provide
              safe, personalized, and efficient healthcare services.
            </p>
          </section>

          {/* ========================= */}
          {/* Personal Information */}
          {/* ========================= */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <section className="mb-6 border-b border-slate-100 pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Please enter your personal details.
              </p>
            </section>

            <div className="space-y-6">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
                control={form.control}
              />

              {/* Email & Phone */}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="email"
                  label="Email Address"
                  placeholder="john@example.com"
                  control={form.control}
                />

                <CustomFormField
                  fieldType={FormFieldType.PHONE}
                  name="phoneNumber"
                  label="Phone Number"
                  control={form.control}
                />
              </div>

              {/* DOB & Gender */}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-end">
                <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  name="dateOfBirth"
                  label="Date of Birth"
                  placeholder="Select your birth date"
                  control={form.control}
                />

                <CustomFormField
                  fieldType={FormFieldType.SKELTON}
                  name="gender"
                  label="Gender"
                  control={form.control}
                  renderSkelton={(field) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex h-11 items-center gap-8 rounded-md border border-slate-200 px-4"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>

              {/* Address & Occupation */}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="address"
                  label="Address"
                  placeholder="14 Street, New York"
                  control={form.control}
                />

                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="occupation"
                  label="Occupation"
                  placeholder="Software Engineer"
                  control={form.control}
                />
              </div>

              {/* Emergency Contact */}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="emergencyContactName"
                  label="Emergency Contact Name"
                  placeholder="Guardian Name"
                  control={form.control}
                />

                <CustomFormField
                  fieldType={FormFieldType.PHONE}
                  name="emergencyContactNumber"
                  label="Emergency Contact Number"
                  placeholder="+91 9876543210"
                  control={form.control}
                />
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* Medical Information */}
          {/* ========================= */}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <section className="mb-6 border-b border-slate-100 pb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Medical Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Help us provide better care by sharing your medical details.
              </p>
            </section>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="insuranceProvider"
                  label="Insurance Provider"
                  placeholder="e.g. Blue Cross"
                  control={form.control}
                />

                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  name="insurancePolicyNumber"
                  label="Insurance Policy Number"
                  placeholder="e.g. ABCG123455"
                  control={form.control}
                />
              </div>

              <CustomFormField
                fieldType={FormFieldType.TEXT_AREA}
                name="medicalConditions"
                label="Allergies & Medical Conditions"
                placeholder="Mention allergies, medications, previous surgeries, or other relevant medical information."
                control={form.control}
              />
            </div>

            {/* select spa */}
            <div className="mt-4">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                name="spaId"
                label="Select Your Spa"
                placeholder="Select a value"
                control={form.control}
                options={spaOptions}
                renderSelect={(field) => (
                  <Select
                    items={spaOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full h-11">
                      <SelectValue placeholder="Sydney" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectGroup>
                        {spaOptions.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.city}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="mt-6">
              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                name="agreeTerms"
                label="Terms & Conditions"
                placeholder="I agree to the Terms and Conditions"
                control={form.control}
              />
            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="h-12 min-w-[180px] rounded-lg bg-emerald-600 px-8 text-base font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
