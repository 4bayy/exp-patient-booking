import { Clock, IndianRupee, Stethoscope } from "lucide-react";

interface Treatment {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  price: number;
}

interface TreatmentCardProps {
  treatment: Treatment;
  selected?: boolean;
//   onSelect?: () => void;
}

export default function TreatmentCard({
  treatment,
  selected = false
}: TreatmentCardProps) {
  return (
    <div
    //   onClick={onSelect}
      className={`
        cursor-pointer
        rounded-2xl
        border
        bg-white
        p-5
        shadow-sm
        transition-all
        hover:shadow-lg
        ${
          selected
            ? "border-emerald-600 ring-2 ring-emerald-200"
            : "border-slate-200"
        }
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-emerald-100
            text-emerald-600
          "
          >
            <Stethoscope size={24} />
          </div>

          <div>
            <h3
              className="
              text-lg
              font-semibold
              text-slate-900
            "
            >
              {treatment.name}
            </h3>

            <p
              className="
              text-sm
              text-slate-500
            "
            >
              {treatment.category}
            </p>
          </div>
        </div>

        {selected && (
          <span
            className="
              rounded-full
              bg-emerald-100
              px-3
              py-1
              text-xs
              font-medium
              text-emerald-700
            "
          >
            Selected
          </span>
        )}
      </div>

      {/* Description */}

      <p
        className="
        mt-4
        text-sm
        leading-6
        text-slate-600
      "
      >
        {treatment.description}
      </p>

      {/* Details */}

      <div
        className="
        mt-5
        flex
        items-center
        justify-between
        border-t
        pt-4
      "
      >
        <div
          className="
          flex
          items-center
          gap-2
          text-sm
          text-slate-600
        "
        >
          <Clock size={18} />
          {treatment.duration}
        </div>

        <div
          className="
          flex
          items-center
          gap-1
          font-semibold
          text-emerald-600
        "
        >
          <IndianRupee size={18} />
          {treatment.price}
        </div>
      </div>
    </div>
  );
}
