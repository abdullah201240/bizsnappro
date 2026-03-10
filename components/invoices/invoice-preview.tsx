"use client";

import { Invoice, InvoiceItem } from "./types";

interface InvoicePreviewProps {
  invoice: Partial<Invoice>;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoicePreview({ invoice, isOpen, onClose }: InvoicePreviewProps) {
  const subtotal = invoice.items?.reduce(
    (sum: number, item: InvoiceItem) => sum + item.quantity * item.price,
    0
  ) || 0;

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className={`inv-sidebar ${isOpen ? "open" : ""}`}>
      <button className="inv-sidebar-close" onClick={onClose} type="button">
        ×
      </button>
      
      <div className="inv-preview">
        <div className="inv-preview-header">
          <span className="inv-preview-title">Live Preview</span>
          <div className="inv-preview-status">
            <span className="inv-preview-status-dot" />
            Auto-updating
          </div>
        </div>
        
        <div className="inv-preview-body">
          <div className="inv-doc">
            {/* Header */}
            <div className="inv-doc-header">
              <div>
                <div className="inv-doc-logo">
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>B</span>
                </div>
                <h2 className="inv-doc-title">INVOICE</h2>
                <p className="inv-doc-num">{invoice.invoiceNumber}</p>
              </div>
              <div className="inv-doc-company">
                <p className="inv-doc-company-name">{invoice.fromName || 'Your Business'}</p>
                <p className="inv-doc-company-detail">
                  {invoice.fromEmail && `${invoice.fromEmail}`}<br />
                  {invoice.fromAddress && `${invoice.fromAddress}`}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="inv-doc-dates">
              <div className="inv-doc-date-box">
                <div className="inv-doc-date-label">Invoice Date</div>
                <div className="inv-doc-date-value">{invoice.date}</div>
              </div>
              <div className="inv-doc-date-box">
                <div className="inv-doc-date-label">Due Date</div>
                <div className="inv-doc-date-value">{invoice.dueDate}</div>
              </div>
            </div>

            {/* Client */}
            <div className="inv-doc-client">
              <div className="inv-doc-client-label">Bill To</div>
              <div className="inv-doc-client-name">{invoice.toName || 'Client Name'}</div>
              <div className="inv-doc-client-detail">
                {invoice.toEmail && `${invoice.toEmail}`}<br />
                {invoice.toAddress && `${invoice.toAddress}`}
              </div>
            </div>

            {/* Items Table */}
            <table className="inv-doc-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style={{ textAlign: 'right' }}>Qty</th>
                  <th style={{ textAlign: 'right' }}>Price</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items?.map((item: InvoiceItem) => (
                  <tr key={item.id}>
                    <td>{item.description || 'Item'}</td>
                    <td style={{ textAlign: 'right' }}>{item.quantity}</td>
                    <td style={{ textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                    <td style={{ textAlign: 'right' }}>${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="inv-doc-totals">
              <div className="inv-doc-total-row">
                <span className="inv-doc-total-label">Subtotal</span>
                <span className="inv-doc-total-value">${subtotal.toFixed(2)}</span>
              </div>
              <div className="inv-doc-total-row">
                <span className="inv-doc-total-label">Tax (10%)</span>
                <span className="inv-doc-total-value">${tax.toFixed(2)}</span>
              </div>
              <div className="inv-doc-total-row final">
                <span className="inv-doc-total-label">Total</span>
                <span className="inv-doc-total-final">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
              <div className="inv-doc-notes">
                <div className="inv-doc-notes-label">Notes</div>
                <div className="inv-doc-notes-text">{invoice.notes}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
