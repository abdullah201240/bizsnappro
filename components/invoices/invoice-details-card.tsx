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
}

export function InvoiceDetailsCard({
  invoiceNumber,
  date,
  dueDate,
  onInvoiceNumberChange,
  onDateChange,
  onDueDateChange,
  isVisible,
}: InvoiceDetailsCardProps) {
  return (
    <InvoiceCard
      id="step-1"
      icon={<FileText style={{ width: 20, height: 20 }} />}
      title="Invoice Details"
      subtitle="Basic information about this invoice"
      isVisible={isVisible}
      delay="0.1s"
    >
      <div className="inv-form-grid">
        <div className="inv-form-group">
          <Label className="inv-form-label">Invoice Number</Label>
          <Input
            value={invoiceNumber}
            onChange={(e) => onInvoiceNumberChange(e.target.value)}
            className="inv-input"
          />
        </div>
        <div className="inv-form-group">
          <Label className="inv-form-label">Invoice Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="inv-input"
          />
        </div>
        <div className="inv-form-group">
          <Label className="inv-form-label">Due Date</Label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => onDueDateChange(e.target.value)}
            className="inv-input"
          />
        </div>
      </div>
    </InvoiceCard>
  );
}
