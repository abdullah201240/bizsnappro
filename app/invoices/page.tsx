"use client";

import { useState, useEffect } from "react";
import {
  InvoiceHeader,
  ProgressSteps,
  InvoiceDetailsCard,
  FromDetailsCard,
  ToDetailsCard,
  LineItemsCard,
  NotesCard,
  InvoiceSummary,
  InvoicePreview,
  Invoice,
  InvoiceItem,
} from "@/components/invoices";
import "@/components/invoices/invoices.css";

export default function InvoicesPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const [invoice, setInvoice] = useState<Partial<Invoice>>({
    invoiceNumber: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    items: [{ id: "1", description: "", quantity: 1, price: 0 }],
    notes: "Thank you for your business!",
  });

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...(prev.items || []),
        { id: Date.now().toString(), description: "", quantity: 1, price: 0 },
      ],
    }));
  };

  const removeItem = (id: string) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items?.filter((item) => item.id !== id),
    }));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items?.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const subtotal = invoice.items?.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  ) || 0;

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePrint = () => {
    window.print();
  };

  const scrollToStep = (stepId: number) => {
    setActiveStep(stepId);
    const element = document.getElementById(`step-${stepId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="inv-root">
        {/* Header */}
        <div className="inv-header">
          <div className="inv-header-grid" />
          <div className="inv-header-content">
            <InvoiceHeader />
            
            {/* Progress Steps */}
            <ProgressSteps
              activeStep={activeStep}
              onStepClick={scrollToStep}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="inv-main">
          {/* Form Section */}
          <div className="inv-form">
            {/* Step 1: Invoice Details */}
            <InvoiceDetailsCard
              invoiceNumber={invoice.invoiceNumber || ""}
              date={invoice.date || ""}
              dueDate={invoice.dueDate || ""}
              onInvoiceNumberChange={(value) => setInvoice({ ...invoice, invoiceNumber: value })}
              onDateChange={(value) => setInvoice({ ...invoice, date: value })}
              onDueDateChange={(value) => setInvoice({ ...invoice, dueDate: value })}
              isVisible={isVisible}
            />

            {/* Step 2: From Details */}
            <FromDetailsCard
              fromName={invoice.fromName || ""}
              fromEmail={invoice.fromEmail || ""}
              fromAddress={invoice.fromAddress || ""}
              onFromNameChange={(value) => setInvoice({ ...invoice, fromName: value })}
              onFromEmailChange={(value) => setInvoice({ ...invoice, fromEmail: value })}
              onFromAddressChange={(value) => setInvoice({ ...invoice, fromAddress: value })}
              isVisible={isVisible}
            />

            {/* Step 3: To Details */}
            <ToDetailsCard
              toName={invoice.toName || ""}
              toEmail={invoice.toEmail || ""}
              toAddress={invoice.toAddress || ""}
              onToNameChange={(value) => setInvoice({ ...invoice, toName: value })}
              onToEmailChange={(value) => setInvoice({ ...invoice, toEmail: value })}
              onToAddressChange={(value) => setInvoice({ ...invoice, toAddress: value })}
              isVisible={isVisible}
            />

            {/* Step 4: Line Items */}
            <LineItemsCard
              items={invoice.items || []}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onUpdateItem={updateItem}
              isVisible={isVisible}
            />

            {/* Step 5: Notes */}
            <NotesCard
              notes={invoice.notes || ""}
              onNotesChange={(value) => setInvoice({ ...invoice, notes: value })}
              isVisible={isVisible}
            />
          </div>

          {/* Sidebar */}
          <InvoiceSummary
            subtotal={subtotal}
            tax={tax}
            total={total}
            onDownload={handlePrint}
            onTogglePreview={() => setShowPreview(!showPreview)}
          />
        </div>

        {/* Preview Modal */}
        <InvoicePreview
          invoice={invoice}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
        />
      </div>
    </>
  );
}
