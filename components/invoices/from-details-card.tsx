"use client";

import { Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvoiceCard } from "./invoice-card";

interface FromDetailsCardProps {
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  onFromNameChange: (value: string) => void;
  onFromEmailChange: (value: string) => void;
  onFromAddressChange: (value: string) => void;
  isVisible: boolean;
  delay: string;
}

export function FromDetailsCard({
  fromName,
  fromEmail,
  fromAddress,
  onFromNameChange,
  onFromEmailChange,
  onFromAddressChange,
  isVisible,
  delay,
}: FromDetailsCardProps) {
  return (
    <InvoiceCard
      id="step-2" 
      icon={<Building2 className="w-5 h-5" />}
      title="Your Details"
      subtitle="Who is this invoice from?"
      visible={isVisible}
      delay={delay}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Company / Your Name</Label>
          <Input
            placeholder="Your Business Name"
            value={fromName}
            onChange={(e) => onFromNameChange(e.target.value)}
            className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Email Address</Label>
          <Input
            type="email"
            placeholder="your@email.com"
            value={fromEmail}
            onChange={(e) => onFromEmailChange(e.target.value)}
            className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Address</Label>
          <Input
            placeholder="123 Business St, City, Country"
            value={fromAddress}
            onChange={(e) => onFromAddressChange(e.target.value)}
            className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
          />
        </div>
      </div>
    </InvoiceCard>
  );
}
