"use client";

import { X } from "lucide-react";
import { Invoice } from "./types";

interface InvoicePreviewProps {
  invoice: Partial<Invoice>;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoicePreview({ invoice, isOpen, onClose }: InvoicePreviewProps) {
  const subtotal = invoice.items?.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  ) || 0;

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#05050a]/95 backdrop-blur-xl p-5 overflow-y-auto lg:hidden">
      <div className="flex justify-end mb-4">
        <button 
          onClick={onClose}
          className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="bg-[#0a0a12] rounded-xl border border-white/6 p-5">
        <InvoicePreviewContent invoice={invoice} subtotal={subtotal} tax={tax} total={total} />
      </div>
    </div>
  );
}

function InvoicePreviewContent({ invoice, subtotal, tax, total }: { 
  invoice: Partial<Invoice>; 
  subtotal: number; 
  tax: number; 
  total: number;
}) {
  return (
    <div>
      <div className="flex justify-between items-start mb-5 pb-4 border-b border-white/6">
        <div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-3">
            <span className="text-white font-extrabold text-xl">B</span>
          </div>
          <h2 className="font-syne text-xl font-extrabold text-white">INVOICE</h2>
          <p className="text-xs text-white/40 mt-1">{invoice.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-white">{invoice.fromName || 'Your Business'}</p>
          <p className="text-xs text-white/40 mt-1 leading-relaxed">
            {invoice.fromEmail && <>{invoice.fromEmail}<br /></>}
            {invoice.fromAddress && <>{invoice.fromAddress}</>}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">Invoice Date</div>
          <div className="text-sm font-semibold text-white">{invoice.date}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">Due Date</div>
          <div className="text-sm font-semibold text-white">{invoice.dueDate}</div>
        </div>
      </div>

      <div className="bg-indigo-500/8 border border-indigo-500/15 rounded-lg p-3.5 mb-5">
        <div className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider mb-1.5">Bill To</div>
        <div className="text-sm font-semibold text-white">{invoice.toName || 'Client Name'}</div>
        <div className="text-xs text-white/50 mt-1 leading-relaxed">
          {invoice.toEmail && <>{invoice.toEmail}<br /></>}
          {invoice.toAddress && <>{invoice.toAddress}</>}
        </div>
      </div>

      <table className="w-full mb-5">
        <thead>
          <tr>
            <th className="text-left py-2.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider border-b border-white/8">Description</th>
            <th className="text-right py-2.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider border-b border-white/8">Qty</th>
            <th className="text-right py-2.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider border-b border-white/8">Price</th>
            <th className="text-right py-2.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider border-b border-white/8">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items?.map((item) => (
            <tr key={item.id}>
              <td className="py-2.5 text-xs text-white/80 border-b border-white/4">{item.description || 'Item'}</td>
              <td className="py-2.5 text-xs text-white/80 border-b border-white/4 text-right">{item.quantity}</td>
              <td className="py-2.5 text-xs text-white/80 border-b border-white/4 text-right">${item.price.toFixed(2)}</td>
              <td className="py-2.5 text-xs text-white/80 border-b border-white/4 text-right">${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t-2 border-white/8 pt-4">
        <div className="flex justify-between py-2 text-xs">
          <span className="text-white/50">Subtotal</span>
          <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-2 text-xs">
          <span className="text-white/50">Tax (10%)</span>
          <span className="text-white font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-3 mt-2 border-t border-white/8">
          <span className="text-sm text-white/50">Total</span>
          <span className="font-syne text-xl font-extrabold text-emerald-400">${total.toFixed(2)}</span>
        </div>
      </div>

      {invoice.notes && (
        <div className="mt-6 pt-5 border-t border-white/6">
          <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2">Notes</div>
          <div className="text-xs text-white/60 leading-relaxed">{invoice.notes}</div>
        </div>
      )}
    </div>
  );
}
