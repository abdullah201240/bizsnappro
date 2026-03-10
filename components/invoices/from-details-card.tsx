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
}

export function FromDetailsCard({
  fromName,
  fromEmail,
  fromAddress,
  onFromNameChange,
  onFromEmailChange,
  onFromAddressChange,
  isVisible,
}: FromDetailsCardProps) {
  return (
    <InvoiceCard
      id="step-2"
      icon={<Building2 style={{ width: 20, height: 20 }} />}
      title="Your Details"
      subtitle="Who is this invoice from?"
      isVisible={isVisible}
      delay="0.2s"
    >
      <div className="inv-form-group" style={{ marginBottom: 20 }}>
        <Label className="inv-form-label">Company / Your Name</Label>
        <Input
          placeholder="Your Business Name"
          value={fromName}
          onChange={(e) => onFromNameChange(e.target.value)}
          className="inv-input"
        />
      </div>
      <div className="inv-form-group" style={{ marginBottom: 20 }}>
        <Label className="inv-form-label">Email Address</Label>
        <Input
          type="email"
          placeholder="your@email.com"
          value={fromEmail}
          onChange={(e) => onFromEmailChange(e.target.value)}
          className="inv-input"
        />
      </div>
      <div className="inv-form-group">
        <Label className="inv-form-label">Address</Label>
        <Input
          placeholder="123 Business St, City, Country"
          value={fromAddress}
          onChange={(e) => onFromAddressChange(e.target.value)}
          className="inv-input"
        />
      </div>
    </InvoiceCard>
  );
}
