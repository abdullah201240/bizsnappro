"use client";

import { CheckCircle2, FileText, Building2, User, Package, StickyNote } from "lucide-react";
import { InvoiceStep } from "./types";

const defaultSteps: InvoiceStep[] = [
  { id: 1, title: "Invoice Details", icon: FileText },
  { id: 2, title: "Your Details", icon: Building2 },
  { id: 3, title: "Client Details", icon: User },
  { id: 4, title: "Line Items", icon: Package },
  { id: 5, title: "Notes", icon: StickyNote },
];

interface ProgressStepsProps {
  steps?: InvoiceStep[];
  activeStep: number;
  onStepClick: (stepId: number) => void;
}

export function ProgressSteps({ 
  steps = defaultSteps, 
  activeStep, 
  onStepClick 
}: ProgressStepsProps) {
  return (
    <div className="inv-steps">
      {steps.map((step) => {
        const Icon = step.icon;
        const isActive = activeStep === step.id;
        const isCompleted = activeStep > step.id;
        return (
          <button
            key={step.id}
            className={`inv-step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
            onClick={() => onStepClick(step.id)}
          >
            <span className="inv-step-num">
              {isCompleted ? (
                <CheckCircle2 style={{ width: 14, height: 14 }} />
              ) : (
                step.id
              )}
            </span>
            <Icon style={{ width: 14, height: 14 }} />
            {step.title}
          </button>
        );
      })}
    </div>
  );
}
