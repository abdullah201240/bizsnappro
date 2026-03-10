"use client";

import { StickyNote } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { InvoiceCard } from "./invoice-card";

interface NotesCardProps {
  notes: string;
  onNotesChange: (value: string) => void;
  isVisible: boolean;
}

export function NotesCard({ notes, onNotesChange, isVisible }: NotesCardProps) {
  return (
    <InvoiceCard
      id="step-5"
      icon={<StickyNote style={{ width: 20, height: 20 }} />}
      title="Notes"
      subtitle="Additional information for the client"
      isVisible={isVisible}
      delay="0.5s"
    >
      <Textarea
        placeholder="Thank you for your business!"
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="inv-textarea"
        rows={4}
      />
    </InvoiceCard>
  );
}
