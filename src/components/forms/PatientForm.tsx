// "use client";

// import { userSchema } from "@/utils/vallidation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { email, z } from "zod";
// import { Button } from "../ui/button";
// import CustomFormField from "../CustomFormField";
// import { useState } from "react";
// import { registerUser } from "@/services/authApi";
// import { useRouter } from "next/navigation";
// import { FormFieldType } from "@/types/form";


// type FormValues = z.infer<typeof userSchema>;


// export default function PatientForm() {
//   const form = useForm<FormValues>({
//     resolver: zodResolver(userSchema),
//     defaultValues: {
//       fullName: "",
//       email: "",
//       password: "",
//       // phone: "",
//     },
//   });

//   const router = useRouter()


//   async function onSubmit({ fullName, email, password }: FormValues) {
//     try {
//       const formData = { fullName, email, password };
//       console.log("Form data",formData);
//       const result = await registerUser(formData);
//       console.log(result.data.id);

//       if (result.data.id){
//         console.log("cookie",document.cookie);
//         router.push(`/patients/${result.data.id}/onboard`)
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="w-full max-w-md">
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         {/* Header */}
//         <section className="space-y-2">
//           <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//             Welcome 👋
//           </h1>

//           <p className="text-gray-500">
//             Start your onboarding by filling in your details.
//           </p>
//         </section>

//         {/* Form Fields */}
//         <div className="space-y-5">
//           <CustomFormField
//             fieldType={FormFieldType.INPUT}
//             name="fullName"
//             label="Full Name"
//             placeholder="John Doe"
//             icon=""
//             iconAlt=""
//             control={form.control}
//           />

//           <CustomFormField
//             fieldType={FormFieldType.INPUT}
//             name="email"
//             label="Email"
//             placeholder="john@example.com"
//             icon=""
//             iconAlt=""
//             control={form.control}
//           />

//           {/* <CustomFormField
//             fieldType={FormFieldType.PHONE}
//             name="phone"
//             label="Phone Number"
//             placeholder="+91 9876543210"
//             icon=""
//             iconAlt=""
//             control={form.control}
//           /> */}

//           <CustomFormField
//             fieldType={FormFieldType.INPUT}
//             name="password"
//             label="Password"
//             placeholder="••••••••"
//             icon=""
//             iconAlt=""
//             control={form.control}
//           />
//         </div>

//         {/* Button */}
//         <Button type="submit" className="h-11 w-full rounded-lg bg-green-500">
//           Continue
//         </Button>

//         {/* Footer */}
//         <p className="text-center text-sm text-gray-500">
//           By continuing, you agree to our Terms & Conditions.
//         </p>
//       </form>
//     </div>
//   );
// }
