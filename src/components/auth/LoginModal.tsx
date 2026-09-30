"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginUser, registerUser } from "@/services/authApi";
import router, { useRouter } from "next/navigation";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormValues {
  email: string;
  name: string;
  password: string;
}

type AuthMode = "login" | "register";

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (mode === "login") {
        const response = await loginUser({
          email: form.email,
          password: form.password,
        });
        console.log("Login successful:", response);
        onOpenChange(false);
        router.push(`/explore`);
        router.refresh();
      return;
      }
      // Registration validation
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const response = await registerUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      console.log(response.data.id);
      if (response.data.id) {
        console.log("cookie", document.cookie);
        router.push(`/patients/${response.data.id}/onboard`);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function onSubmit(formData: FormValues) {}

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setShowPassword(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-32px)]   bg-white max-w-md overflow-hidden rounded-2xl p-0">
        {/* Header */}
        <div className="bg-[#f45135] px-6 py-7 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white">
              {mode === "login" ? "Welcome Back" : "Create Your Account"}
            </DialogTitle>

            <DialogDescription className="mt-1 text-white/85">
              {mode === "login"
                ? "Login to manage your appointments and records."
                : "Create an account to book and manage appointments."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Login / Register tabs */}
        <div className="px-6 pt-5">
          <div className="grid grid-cols-2 rounded-xl bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-white text-[#f45135] shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                mode === "register"
                  ? "bg-white text-[#f45135] shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-7 pt-5">
          {/* REGISTER ONLY */}
          {mode === "register" && (
            <>
              {/* Name */}
              <FormField label="Full Name" icon={<UserRound size={18} />}>
                <Input
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  className="h-11 rounded-xl pl-10"
                  required
                />
              </FormField>

              {/* Phone */}
              <FormField label="Phone Number" icon={<Phone size={18} />}>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={handleChange}
                  className="h-11 rounded-xl pl-10"
                  required
                />
              </FormField>
            </>
          )}

          {/* Email */}
          <FormField label="Email" icon={<Mail size={18} />}>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="h-11 rounded-xl pl-10"
              required
            />
          </FormField>

          {/* Password */}
          <FormField label="Password" icon={<LockKeyhole size={18} />}>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="h-11 rounded-xl pl-10 pr-11"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormField>

          {/* Confirm Password */}
          {mode === "register" && (
            <FormField
              label="Confirm Password"
              icon={<LockKeyhole size={18} />}
            >
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="h-11 rounded-xl pl-10"
                required
              />
            </FormField>
          )}

          {/* Forgot Password */}
          {mode === "login" && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-medium text-[#f45135] hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-[#f45135] text-base font-semibold hover:bg-[#df432a]"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </Button>

          {/* Bottom switch */}
          <p className="pt-1 text-center text-sm text-gray-500">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() =>
                switchMode(mode === "login" ? "register" : "login")
              }
              className="font-semibold text-[#f45135] hover:underline"
            >
              {mode === "login" ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FormField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        {children}
      </div>
    </div>
  );
}
