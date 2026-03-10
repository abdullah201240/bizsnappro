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
}

export function ToDetailsCard({
  toName,
  toEmail,
  toAddress,
  onToNameChange,
  onToEmailChange,
  onToAddressChange,
  isVisible,
}: ToDetailsCardProps) {
  return (
    <InvoiceCard
      id="step-3"
      icon={<User style={{ width: 20, height: 20 }} />}
      title="Client Details"
      subtitle="Who is this invoice for?"
      isVisible={isVisible}
      delay="0.3s"
    >
      <div className="inv-form-group" style={{ marginBottom: 20 }}>
        <Label className="inv-form-label">Client Name / Company</Label>
        <Input
          placeholder="Client Business Name"
          value={toName}
          onChange={(e) => onToNameChange(e.target.value)}
          className="inv-input"
        />
      </div>
      <div className="inv-form-group" style={{ marginBottom: 20 }}>
        <Label className="inv-form-label">Email Address</Label>
        <Input
          type="email"
          placeholder="client@email.com"
          value={toEmail}
          onChange={(e) => onToEmailChange(e.target.value)}
          className="inv-input"
        />
      </div>
      <div className="inv-form-group">
        <Label className="inv-form-label">Address</Label>
        <Input
          placeholder="456 Client St, City, Country"
          value={toAddress}
          onChange={(e) => onToAddressChange(e.target.value)}
          className="inv-input"
        />
      </div>
    </InvoiceCard>
  );
}
