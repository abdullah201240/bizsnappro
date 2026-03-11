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
    <div className="lg:sticky lg:top-6 h-fit">
      <div className="bg-white/[0.02] border border-white/6 rounded-2xl p-6 mb-5">
        <h3 className="font-syne text-base font-bold text-white mb-5 flex items-center gap-2.5">
          <Calculator className="w-4.5 h-4.5" />
          Summary
        </h3>
        
        <div className="flex justify-between items-center py-3 border-b border-white/6">
          <span className="text-sm text-white/50">Subtotal</span>
          <span className="text-sm font-semibold text-white">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b border-white/6">
          <span className="text-sm text-white/50">Tax (10%)</span>
          <span className="text-sm font-semibold text-white">${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center pt-4 mt-1">
          <span className="text-sm text-white/50">Total</span>
          <span className="font-syne text-2xl font-extrabold text-emerald-400">${total.toFixed(2)}</span>
        </div>
      </div>

      <button 
        className="w-full h-13 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_200%] text-white text-sm font-semibold flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all"
        onClick={onDownload}
      >
        <Download className="w-4.5 h-4.5" />
        Download Invoice
      </button>

      <button 
        className="w-full h-11 mt-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors lg:hidden"
        onClick={onTogglePreview}
      >
        <Eye className="w-4 h-4" />
        Preview Invoice
      </button>
    </div>
  );
}
