"use client";

import { StickyNote } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { InvoiceCard } from "./invoice-card";

interface NotesCardProps {
  notes: string;
  onNotesChange: (value: string) => void;
  isVisible: boolean;
  delay: string;
}

export function NotesCard({ notes, onNotesChange, isVisible, delay }: NotesCardProps) {
  return (
    <InvoiceCard
      id="step-5" 
      icon={<StickyNote className="w-5 h-5" />}
      title="Notes"
      subtitle="Additional information for the client"
      visible={isVisible}
      delay={delay}
    >
      <Textarea
        placeholder="Thank you for your business!"
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="bg-white/5 border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20 min-h-[100px] resize-none"
      />
    </InvoiceCard>
  );
}
