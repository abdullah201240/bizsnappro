"use client";

import { Calculator, Download, Eye } from "lucide-react";

interface InvoiceSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  onDownload: () => void;
  onTogglePreview: () => void;
}

export function InvoiceSummary({
  subtotal,
  tax,
  total,
  onDownload,
  onTogglePreview,
}: InvoiceSummaryProps) {
  return (
    <div className="inv-sidebar">
      <div className="inv-summary">
        <h3 className="inv-summary-title">
          <Calculator style={{ width: 18, height: 18 }} />
          Summary
        </h3>
        
        <div className="inv-summary-row">
          <span className="inv-summary-label">Subtotal</span>
          <span className="inv-summary-value">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="inv-summary-row">
          <span className="inv-summary-label">Tax (10%)</span>
          <span className="inv-summary-value">${tax.toFixed(2)}</span>
        </div>
        
        <div className="inv-summary-row" style={{ borderBottom: 'none', paddingTop: 16, marginTop: 4 }}>
          <span className="inv-summary-label">Total</span>
          <span className="inv-summary-total">${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="inv-download-btn" onClick={onDownload} type="button">
        <Download style={{ width: 18, height: 18 }} />
        Download Invoice
      </button>

      <button className="inv-preview-toggle" onClick={onTogglePreview} type="button">
        <Eye style={{ width: 16, height: 16 }} />
        Preview Invoice
      </button>
    </div>
  );
}
