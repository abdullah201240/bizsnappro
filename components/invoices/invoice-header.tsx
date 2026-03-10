"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface InvoiceHeaderProps {
  title?: string;
  subtitle?: string;
}

export function InvoiceHeader({ 
  title = "Create Invoice", 
  subtitle = "Generate professional invoices in seconds" 
}: InvoiceHeaderProps) {
  return (
    <div className="inv-header">
      <div className="inv-header-grid" />
      <div className="inv-header-content">
        <Link href="/" className="inv-back-link">
          <ArrowLeft style={{ width: 16, height: 16 }} />
          Back to Home
        </Link>
        <h1 className="inv-header-title">{title}</h1>
        <p className="inv-header-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
