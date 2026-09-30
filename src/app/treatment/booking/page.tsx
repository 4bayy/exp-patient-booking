"use client";

// components/booking/BookingFlowFull.tsx
// Treatment → Specialist → Date → Time slot → Funding → Review → Confirmation

import { useEffect, useReducer, useState } from "react";

/* ---------- Types & mock data (replace with API calls) ---------- */

type StepId = "treatment" | "specialist" | "date" | "slot" | "funding" | "review" | "confirmation";

interface Treatment { id: string; slug: string; name: string; category: string; duration: number; price: number; specialistIds: string[] }
interface Specialist { id: string; name: string; title: string; rating: number }
interface Slot { id: string; time: string; available: boolean }
interface Funding { id: string; label: string; description: string }

const TREATMENTS: Treatment[] = [
  { id: "t1", slug: "sports-recovery", name: "Sports Recovery Session", category: "Physiotherapy", duration: 60, price: 1200, specialistIds: ["s1", "s2"] },
  { id: "t2", slug: "deep-tissue-massage", name: "Deep Tissue Massage", category: "Massage", duration: 60, price: 1500, specialistIds: ["s3"] },
  { id: "t3", slug: "guided-relaxation", name: "Guided Relaxation", category: "Wellness", duration: 45, price: 950, specialistIds: ["s3", "s2"] },
];
const SPECIALISTS: Specialist[] = [
  { id: "s1", name: "Dr. Sarah Thomas", title: "Physiotherapist", rating: 4.9 },
  { id: "s2", name: "Dr. Rahul Menon", title: "Rehabilitation Specialist", rating: 4.7 },
  { id: "s3", name: "John Mathew", title: "Massage Therapist", rating: 4.9 },
];
const FUNDING: Funding[] = [
  { id: "self", label: "Pay myself", description: "Card or UPI at checkout" },
  { id: "insurance", label: "Insurance", description: "Claim via your provider" },
  { id: "voucher", label: "Voucher / employer plan", description: "Apply a code at review" },
];
const STEPS: { id: StepId; label: string }[] = [
  { id: "treatment", label: "Treatment" },
  { id: "specialist", label: "Specialist" },
  { id: "date", label: "Date" },
  { id: "slot", label: "Time slot" },
  { id: "funding", label: "Funding" },
  { id: "review", label: "Review" },
  { id: "confirmation", label: "Confirmation" },
];

const TIMES = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"];

// Mock: replace with GET /api/availability?specialistId&date&treatmentId
async function fetchSlots(specialistId: string, date: string): Promise<Slot[]> {
  await new Promise((r) => setTimeout(r, 350));
  const seed = (specialistId + date).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return TIMES.map((time, i) => ({ id: `${date}T${time}`, time, available: (seed + i * 7) % 4 !== 0 }));
}

// Mock: replace with POST /api/bookings — the backend does the atomic slot lock.
async function confirmBooking(): Promise<{ ok: true; reference: string } | { ok: false; reason: "SLOT_TAKEN" }> {
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true, reference: "TH" + Math.random().toString(36).slice(2, 8).toUpperCase() };
}

/* ---------- State ---------- */

interface State {
  step: StepId;
  treatmentId: string | null;
  specialistId: string | null;
  date: string | null;
  slotId: string | null;
  fundingId: string | null;
  reference: string | null;
  notice: string | null;
}
type Action =
  | { type: "goto"; step: StepId }
  | { type: "treatment"; id: string }
  | { type: "specialist"; id: string }
  | { type: "date"; date: string }
  | { type: "slot"; id: string }
  | { type: "funding"; id: string }
  | { type: "confirmed"; reference: string }
  | { type: "slotTaken" };

const initial: State = { step: "treatment", treatmentId: null, specialistId: null, date: null, slotId: null, fundingId: null, reference: null, notice: null };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "goto":
      return { ...s, step: a.step, notice: null };
    case "treatment": {
      const t = TREATMENTS.find((x) => x.id === a.id)!;
      const keep = !!s.specialistId && t.specialistIds.includes(s.specialistId);
      return { ...s, treatmentId: a.id, notice: null, specialistId: keep ? s.specialistId : null, slotId: keep ? s.slotId : null };
    }
    case "specialist":
      return { ...s, specialistId: a.id, slotId: s.specialistId === a.id ? s.slotId : null, notice: null };
    case "date":
      return { ...s, date: a.date, slotId: s.date === a.date ? s.slotId : null, notice: null };
    case "slot":
      return { ...s, slotId: a.id, notice: null };
    case "funding":
      return { ...s, fundingId: a.id, notice: null };
    case "confirmed":
      return { ...s, reference: a.reference, step: "confirmation" };
    case "slotTaken":
      return { ...s, slotId: null, step: "slot", notice: "That slot was just booked by someone else. Please pick another time — your other choices are saved." };
  }
}

function nextDates(n = 7) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return { iso: d.toISOString().slice(0, 10), label: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }) };
  });
}
const inr = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

/* ---------- Component ---------- */

interface BookingFlowProps {
  /** Treatment slug from the route, e.g. /book/sports-recovery */
  treatmentSlug?: string;
  /** Specialist id from ?specialistId=... on the details page CTA */
  specialistId?: string;
}

function init({ treatmentSlug, specialistId }: BookingFlowProps): State {
  const t = TREATMENTS.find((x) => x.slug === treatmentSlug);
  if (!t) return initial;
  const sp = specialistId && t.specialistIds.includes(specialistId) ? specialistId : null;
  // Arrived from the details page: treatment is chosen, so start at the next open step.
  return { ...initial, treatmentId: t.id, specialistId: sp, step: sp ? "date" : "specialist" };
}

export default function BookingFlowFull(props: BookingFlowProps) {
  const [s, dispatch] = useReducer(reducer, props, init);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const treatment = TREATMENTS.find((t) => t.id === s.treatmentId);
  const specialist = SPECIALISTS.find((x) => x.id === s.specialistId);
  const funding = FUNDING.find((f) => f.id === s.fundingId);
  const slotTime = s.slotId?.split("T")[1];

  useEffect(() => {
    if (s.step !== "slot" || !s.specialistId || !s.date) return;
    let cancelled = false;
    setSlots(null);
    fetchSlots(s.specialistId, s.date).then((r) => !cancelled && setSlots(r));
    return () => { cancelled = true; };
  }, [s.step, s.specialistId, s.date]);

  const done: Record<StepId, boolean> = {
    treatment: !!s.treatmentId, specialist: !!s.specialistId, date: !!s.date,
    slot: !!s.slotId, funding: !!s.fundingId, review: !!s.reference, confirmation: !!s.reference,
  };
  // A step is reachable if every step before it has a choice. Locked after confirmation.
  const reachable = (id: StepId) => {
    if (s.reference) return false;
    const idx = STEPS.findIndex((x) => x.id === id);
    return STEPS.slice(0, idx).every((x) => done[x.id]);
  };

  async function handleConfirm() {
    setSubmitting(true);
    const res = await confirmBooking();
    setSubmitting(false);
    if (res.ok) dispatch({ type: "confirmed", reference: res.reference });
    else dispatch({ type: "slotTaken" });
  }

  const stepIndex = STEPS.findIndex((x) => x.id === s.step);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 text-[#16211C]">
      {/* Stepper */}
      <nav aria-label="Booking progress" className="mb-8 overflow-x-auto">
        <ol className="flex min-w-max items-center gap-2">
          {STEPS.map((st, i) => {
            const current = s.step === st.id;
            const complete = done[st.id] && !current;
            const canClick = reachable(st.id) && !current;
            return (
              <li key={st.id} className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={!canClick}
                  onClick={() => dispatch({ type: "goto", step: st.id })}
                  aria-current={current ? "step" : undefined}
                  className={`flex items-center gap-2 rounded-full px-2 py-1 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#164B43] disabled:cursor-default ${current ? "font-semibold" : "text-[#5B6B62]"} ${canClick ? "hover:bg-[#DDEAE5]" : ""}`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${complete ? "border-[#164B43] bg-[#164B43] text-white" : current ? "border-[#164B43] text-[#164B43]" : "border-[#BFC8BE]"}`}>
                    {complete ? "✓" : i + 1}
                  </span>
                  {st.label}
                </button>
                {i < STEPS.length - 1 && <span className="h-px w-4 bg-[#BFC8BE]" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="grid gap-8 md:grid-cols-[1.6fr_1fr]">
        <section aria-live="polite">
          {s.notice && (
            <p role="alert" className="mb-4 rounded-lg bg-[#F6E2DE] px-3 py-2 text-sm text-[#B14538]">{s.notice}</p>
          )}

          {s.step === "treatment" && (
            <Choices title="Choose a treatment">
              {TREATMENTS.map((t) => (
                <Option key={t.id} selected={s.treatmentId === t.id} onClick={() => dispatch({ type: "treatment", id: t.id })}
                  title={t.name} meta={`${t.category} · ${t.duration} min`} right={inr(t.price)} />
              ))}
            </Choices>
          )}

          {s.step === "specialist" && treatment && (
            <Choices title="Choose a specialist">
              {SPECIALISTS.filter((x) => treatment.specialistIds.includes(x.id)).map((x) => (
                <Option key={x.id} selected={s.specialistId === x.id} onClick={() => dispatch({ type: "specialist", id: x.id })}
                  title={x.name} meta={x.title} right={`★ ${x.rating}`} />
              ))}
            </Choices>
          )}

          {s.step === "date" && (
            <Choices title="Pick a date">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {nextDates().map((d) => (
                  <button key={d.iso} type="button" onClick={() => dispatch({ type: "date", date: d.iso })}
                    className={`rounded-lg border px-3 py-3 text-sm ${s.date === d.iso ? "border-[#164B43] bg-[#DDEAE5] font-semibold" : "border-[#DCE2DB] hover:border-[#164B43]"}`}>
                    {d.label}
                  </button>
                ))}
              </div>
            </Choices>
          )}

          {s.step === "slot" && (
            <Choices title="Pick a time">
              {!slots ? (
                <p className="text-sm text-[#5B6B62]">Checking availability…</p>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((sl) => (
                    <button key={sl.id} type="button" disabled={!sl.available}
                      aria-label={sl.available ? sl.time : `${sl.time}, unavailable`}
                      onClick={() => dispatch({ type: "slot", id: sl.id })}
                      className={`rounded-lg border px-2 py-2.5 text-sm ${!sl.available ? "cursor-not-allowed border-[#DCE2DB] bg-[#F3F5F0] text-[#5B6B62] line-through opacity-60" : s.slotId === sl.id ? "border-[#164B43] bg-[#DDEAE5] font-semibold" : "border-[#DCE2DB] hover:border-[#164B43]"}`}>
                      {sl.time}
                    </button>
                  ))}
                </div>
              )}
            </Choices>
          )}

          {s.step === "funding" && (
            <Choices title="How will this be paid for?">
              {FUNDING.map((f) => (
                <Option key={f.id} selected={s.fundingId === f.id} onClick={() => dispatch({ type: "funding", id: f.id })}
                  title={f.label} meta={f.description} />
              ))}
            </Choices>
          )}

          {s.step === "review" && treatment && specialist && funding && (
            <div>
              <h2 className="mb-4 font-[Newsreader] text-2xl">Review your booking</h2>
              <dl className="divide-y divide-[#DCE2DB] rounded-xl border border-[#DCE2DB] bg-white">
                <ReviewRow label="Treatment" value={treatment.name} onEdit={() => dispatch({ type: "goto", step: "treatment" })} />
                <ReviewRow label="Specialist" value={specialist.name} onEdit={() => dispatch({ type: "goto", step: "specialist" })} />
                <ReviewRow label="Date" value={s.date ?? ""} onEdit={() => dispatch({ type: "goto", step: "date" })} />
                <ReviewRow label="Time" value={slotTime ?? ""} onEdit={() => dispatch({ type: "goto", step: "slot" })} />
                <ReviewRow label="Funding" value={funding.label} onEdit={() => dispatch({ type: "goto", step: "funding" })} />
              </dl>
              <button type="button" onClick={handleConfirm} disabled={submitting}
                className="mt-6 w-full rounded-lg bg-[#C9862A] px-4 py-3 text-sm font-semibold text-white hover:bg-[#B67723] disabled:opacity-60">
                {submitting ? "Confirming…" : `Confirm booking · ${inr(treatment.price)}`}
              </button>
              <p className="mt-2 text-xs text-[#5B6B62]">Availability is checked again when you confirm.</p>
            </div>
          )}

          {s.step === "confirmation" && treatment && specialist && (
            <div className="rounded-xl border border-[#DCE2DB] bg-white p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#DCEFE6] text-xl text-[#1E7A5F]">✓</div>
              <h2 className="font-[Newsreader] text-2xl">You&apos;re booked</h2>
              <p className="mt-1 text-sm text-[#5B6B62]">{treatment.name} with {specialist.name}<br />{s.date} at {slotTime}</p>
              <p className="mt-4 text-xs text-[#5B6B62]">Booking reference</p>
              <p className="font-mono text-lg font-semibold tracking-wider">{s.reference}</p>
            </div>
          )}

          {s.step !== "confirmation" && (
            <div className="mt-8 flex items-center gap-3">
              {stepIndex > 0 && (
                <button type="button"
                  className="rounded-lg border border-[#BFC8BE] px-4 py-2.5 text-sm font-semibold"
                  onClick={() => dispatch({ type: "goto", step: STEPS[stepIndex - 1].id })}>
                  Back
                </button>
              )}
              {s.step !== "review" && (
                <button type="button" disabled={!done[s.step]}
                  className="rounded-lg bg-[#164B43] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
                  onClick={() => dispatch({ type: "goto", step: STEPS[stepIndex + 1].id })}>
                  Continue
                </button>
              )}
            </div>
          )}
        </section>

        {/* Summary rail */}
        <aside className="h-fit rounded-xl border border-[#DCE2DB] bg-[#F3F5F0] p-4 text-sm">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#5B6B62]">Your booking</h3>
          <SummaryLine label="Treatment" value={treatment?.name} />
          <SummaryLine label="Specialist" value={specialist?.name} />
          <SummaryLine label="Date" value={s.date ?? undefined} />
          <SummaryLine label="Time" value={slotTime} />
          <SummaryLine label="Funding" value={funding?.label} />
          <div className="mt-2 flex justify-between border-t border-[#DCE2DB] pt-2 font-semibold">
            <span>Total</span><span>{treatment ? inr(treatment.price) : "—"}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- Small pieces ---------- */

function Choices({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-[Newsreader] text-2xl">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Option({ title, meta, right, selected, onClick }: { title: string; meta?: string; right?: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={selected}
      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left ${selected ? "border-[#164B43] bg-[#DDEAE5]" : "border-[#DCE2DB] bg-white hover:border-[#164B43]"}`}>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        {meta && <span className="text-xs text-[#5B6B62]">{meta}</span>}
      </span>
      {right && <span className="text-sm font-semibold">{right}</span>}
    </button>
  );
}

function ReviewRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm">
      <dt className="text-[#5B6B62]">{label}</dt>
      <dd className="flex items-center gap-3 font-medium">
        {value}
        <button type="button" onClick={onEdit} className="text-xs font-normal text-[#164B43] underline underline-offset-2">Edit</button>
      </dd>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-[#5B6B62]">{label}</span>
      <span className={value ? "font-medium" : "text-[#BFC8BE]"}>{value ?? "—"}</span>
    </div>
  );
}