"use client";

import { Package, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvoiceCard } from "./invoice-card";
import { InvoiceItem } from "./types";

interface LineItemsCardProps {
  items: InvoiceItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, field: keyof InvoiceItem, value: string | number) => void;
  isVisible: boolean;
  delay: string;
}

export function LineItemsCard({
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  isVisible,
  delay,
}: LineItemsCardProps) {
  return (
    <InvoiceCard
      id="step-4" 
      icon={<Package className="w-5 h-5" />}
      title="Line Items"
      subtitle="Add products or services"
      visible={isVisible}
      delay={delay}
    >
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_80px_100px_100px_44px] gap-3 p-4 bg-white/5 border border-white/6 rounded-xl hover:border-white/10 transition-colors">
            <div className="flex flex-col gap-2">
              <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Description</Label>
              <Input
                placeholder="Item description"
                value={item.description}
                onChange={(e) => onUpdateItem(item.id, "description", e.target.value)}
                className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Qty</Label>
              <Input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => onUpdateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white focus:border-indigo-500/50 focus:ring-indigo-500/20"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Price</Label>
              <Input
                type="number"
                min={0}
                step="0.01"
                value={item.price}
                onChange={(e) => onUpdateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white focus:border-indigo-500/50 focus:ring-indigo-500/20"
              />
            </div>
            <div className="flex items-end justify-end">
              <div className="h-11 flex items-center px-3 bg-white/5 rounded-xl text-sm font-semibold text-emerald-400">
                ${(item.quantity * item.price).toFixed(2)}
              </div>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => onRemoveItem(item.id)}
                disabled={items.length === 1}
                className="h-11 w-11 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        
        <button 
          className="w-full h-12 rounded-xl border border-dashed border-white/15 bg-transparent text-white/60 text-sm font-medium flex items-center justify-center gap-2 hover:border-indigo-500/40 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all" 
          onClick={onAddItem}
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>
    </InvoiceCard>
  );
}
