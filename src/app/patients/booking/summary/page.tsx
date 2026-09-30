"use client";

import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  Stethoscope,
  CreditCard,
  FileText,
  CheckCircle,
} from "lucide-react";

export default function BookingSummaryPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Booking Summary
          </h1>
          <p className="mt-2 text-slate-500">
            Please review your appointment before confirming.
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-10 flex items-center justify-center">
          {["Onboarding", "Appointment", "Funding", "Review"].map(
            (step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                    index === 3
                      ? "bg-blue-600 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {index === 3 ? "4" : "✓"}
                </div>

                <span className="mx-3 text-sm font-medium text-slate-700">
                  {step}
                </span>

                {index !== 3 && (
                  <div className="h-1 w-20 rounded bg-green-400" />
                )}
              </div>
            )
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Left */}
          <div className="space-y-6 lg:col-span-2">

            {/* Patient */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                <User size={20} />
                Patient Details
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <Info icon={<User size={18} />} title="Full Name" value="Abhay Krishna K" />
                <Info icon={<Mail size={18} />} title="Email" value="abhay@gmail.com" />
                <Info icon={<Phone size={18} />} title="Phone" value="+61 412345678" />
                <Info icon={<MapPin size={18} />} title="Address" value="Perth, Australia" />
              </div>
            </section>

            {/* Appointment */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                <Calendar size={20} />
                Appointment Details
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <Info icon={<MapPin size={18} />} title="Spa" value="Sydney Wellness Clinic" />
                <Info
                  icon={<Stethoscope size={18} />}
                  title="Treatment"
                  value="Deep Tissue Massage"
                />
                <Info
                  icon={<User size={18} />}
                  title="Therapist"
                  value="Dr. Sarah Wilson"
                />
                <Info
                  icon={<Calendar size={18} />}
                  title="Date"
                  value="20 August 2026"
                />
                <Info icon={<Clock size={18} />} title="Time" value="10:30 AM" />
                <Info icon={<Clock size={18} />} title="Duration" value="60 Minutes" />
              </div>
            </section>

            {/* Funding */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
                <CreditCard size={20} />
                Funding Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <Info
                  icon={<CreditCard size={18} />}
                  title="Provider"
                  value="NDIS"
                />

                <Info
                  icon={<FileText size={18} />}
                  title="Plan Number"
                  value="NDIS-123456"
                />

                <Info
                  icon={<CheckCircle size={18} />}
                  title="Funding Tier"
                  value="Tier 2"
                />

                <Info
                  icon={<CreditCard size={18} />}
                  title="Remaining Balance"
                  value="$2,350"
                />
              </div>
            </section>

            {/* Notes */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-semibold">Additional Notes</h2>

              <p className="text-slate-600">
                Patient prefers a morning appointment and requires wheelchair
                access.
              </p>
            </section>
          </div>

          {/* Right */}
          <aside className="sticky top-6 h-fit rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Booking Summary
            </h2>

            <SummaryRow
              label="Consultation"
              value="$120"
            />

            <SummaryRow
              label="Treatment"
              value="$180"
            />

            <SummaryRow
              label="GST"
              value="$18"
            />

            <SummaryRow
              label="Discount"
              value="-$20"
              danger
            />

            <div className="my-5 border-t" />

            <SummaryRow
              label="Total"
              value="$298"
              total
            />

            <div className="mt-8 flex items-start gap-3 rounded-lg border bg-slate-50 p-4">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1"
              />

              <p className="text-sm text-slate-600">
                I confirm that all the information above is correct.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <button className="w-full rounded-xl border py-3 font-medium">
                Previous
              </button>

              <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
                Confirm Booking
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 text-blue-600">{icon}</div>

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  total,
  danger,
}: {
  label: string;
  value: string;
  total?: boolean;
  danger?: boolean;
}) {
  return (
    <div
      className={`flex justify-between py-3 ${
        total ? "text-xl font-bold" : "text-sm"
      }`}
    >
      <span>{label}</span>

      <span
        className={
          danger ? "font-semibold text-red-500" : "font-medium"
        }
      >
        {value}
      </span>
    </div>
  );
}