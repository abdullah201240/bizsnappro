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
}

export function LineItemsCard({
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  isVisible,
}: LineItemsCardProps) {
  return (
    <InvoiceCard
      id="step-4"
      icon={<Package style={{ width: 20, height: 20 }} />}
      title="Line Items"
      subtitle="Add products or services"
      isVisible={isVisible}
      delay="0.4s"
    >
      {items.map((item) => (
        <div key={item.id} className="inv-item">
          <div className="inv-form-group">
            <Label className="inv-form-label">Description</Label>
            <Input
              placeholder="Item description"
              value={item.description}
              onChange={(e) => onUpdateItem(item.id, "description", e.target.value)}
              className="inv-input"
            />
          </div>
          <div className="inv-form-group">
            <Label className="inv-form-label">Qty</Label>
            <Input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => onUpdateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
              className="inv-input"
            />
          </div>
          <div className="inv-form-group">
            <Label className="inv-form-label">Price</Label>
            <Input
              type="number"
              min={0}
              step="0.01"
              value={item.price}
              onChange={(e) => onUpdateItem(item.id, "price", parseFloat(e.target.value) || 0)}
              className="inv-input"
            />
          </div>
          <div className="inv-item-amount">
            ${(item.quantity * item.price).toFixed(2)}
          </div>
          <button
            className="inv-item-delete"
            onClick={() => onRemoveItem(item.id)}
            disabled={items.length === 1}
            type="button"
          >
            <Trash2 style={{ width: 18, height: 18 }} />
          </button>
        </div>
      ))}
      
      <button className="inv-add-btn" onClick={onAddItem} type="button">
        <Plus style={{ width: 18, height: 18 }} />
        Add Item
      </button>
    </InvoiceCard>
  );
}
