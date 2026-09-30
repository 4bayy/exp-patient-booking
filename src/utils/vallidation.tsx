import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { email } from "zod";

export const userSchema = z.object({
  fullName: z.string().min(3, "Must contain at least 3 characters"),

  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
  // phone: z
  // .string()
  // .min(8, "Please enter a valid phone number")
});
