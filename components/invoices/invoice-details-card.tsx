"use client";

import { FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvoiceCard } from "./invoice-card";

interface InvoiceDetailsCardProps {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  onInvoiceNumberChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onDueDateChange: (value: string) => void;
  isVisible: boolean;
  delay: string;
}

export function InvoiceDetailsCard({
  invoiceNumber,
  date,
  dueDate,
  onInvoiceNumberChange,
  onDateChange,
  onDueDateChange,
  isVisible,
  delay,
}: InvoiceDetailsCardProps) {
  return (
    <InvoiceCard
      id="step-1" 
      icon={<FileText className="w-5 h-5" />}
      title="Invoice Details"
      subtitle="Basic information about this invoice"
      visible={isVisible}
      delay={delay}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Invoice Number</Label>
          <Input
            value={invoiceNumber}
            onChange={(e) => onInvoiceNumberChange(e.target.value)}
            className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Invoice Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white focus:border-indigo-500/50 focus:ring-indigo-500/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Due Date</Label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => onDueDateChange(e.target.value)}
            className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white focus:border-indigo-500/50 focus:ring-indigo-500/20"
          />
        </div>
      </div>
    </InvoiceCard>
  );
}
