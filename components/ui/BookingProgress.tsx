import { CheckCircle } from "lucide-react";

const STEPS = ["Select Dates", "Your Details", "Confirmation"];

interface BookingProgressProps {
  currentStep: 1 | 2 | 3; // 1 = Select Dates, 2 = Your Details, 3 = Confirmation
}

export default function BookingProgress({ currentStep }: BookingProgressProps) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isActive    = stepNum === currentStep;
        const isPending   = stepNum > currentStep;

        return (
          <div key={step} className="flex items-center">
            <div className={`flex items-center gap-2 text-xs font-semibold ${
              isActive ? "text-secondary" : isCompleted ? "text-white/60" : "text-white/30"
            }`}>
              {/* Step circle */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                isActive    ? "bg-secondary text-primary" :
                isCompleted ? "bg-white/20 text-white/70" :
                              "bg-white/10 text-white/30"
              }`}>
                {isCompleted
                  ? <CheckCircle className="h-3.5 w-3.5" />
                  : <span className="text-xs font-bold">{stepNum}</span>
                }
              </div>
              <span className="hidden sm:block">{step}</span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div className={`w-8 sm:w-16 h-px mx-2 ${isCompleted ? "bg-white/40" : "bg-white/15"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
