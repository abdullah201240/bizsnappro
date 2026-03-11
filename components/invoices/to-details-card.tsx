"use client";

import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvoiceCard } from "./invoice-card";

interface ToDetailsCardProps {
  toName: string;
  toEmail: string;
  toAddress: string;
  onToNameChange: (value: string) => void;
  onToEmailChange: (value: string) => void;
  onToAddressChange: (value: string) => void;
  isVisible: boolean;
  delay: string;
}

export function ToDetailsCard({
  toName,
  toEmail,
  toAddress,
  onToNameChange,
  onToEmailChange,
  onToAddressChange,
  isVisible,
  delay,
}: ToDetailsCardProps) {
  return (
    <InvoiceCard
      id="step-3" 
      icon={<User className="w-5 h-5" />}
      title="Client Details"
      subtitle="Who is this invoice for?"
      visible={isVisible}
      delay={delay}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Client Name / Company</Label>
          <Input
            placeholder="Client Business Name"
            value={toName}
            onChange={(e) => onToNameChange(e.target.value)}
            className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Email Address</Label>
          <Input
            type="email"
            placeholder="client@email.com"
            value={toEmail}
            onChange={(e) => onToEmailChange(e.target.value)}
            className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Address</Label>
          <Input
            placeholder="456 Client St, City, Country"
            value={toAddress}
            onChange={(e) => onToAddressChange(e.target.value)}
            className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
          />
        </div>
      </div>
    </InvoiceCard>
  );
}
