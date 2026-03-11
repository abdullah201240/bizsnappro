"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft,
  FileText,
  Building2,
  User,
  Package,
  StickyNote,
  CheckCircle2,
} from "lucide-react";
import { 
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

const steps = [
  { id: 1, title: "Invoice Details", icon: FileText },
  { id: 2, title: "Your Details", icon: Building2 },
  { id: 3, title: "Client Details", icon: User },
  { id: 4, title: "Line Items", icon: Package },
  { id: 5, title: "Notes", icon: StickyNote },
];

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
    <div className="min-h-screen bg-[#05050a] text-white font-sans">
      {/* Header */}
      <header className="bg-gradient-to-b from-indigo-500/8 to-transparent border-b border-white/6 relative overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-10 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white no-underline mb-5 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="font-syne text-2xl md:text-3xl font-extrabold text-white mb-2">Create Invoice</h1>
          <p className="text-sm text-white/50 mb-6">Generate professional invoices in seconds</p>

          {/* Progress Steps */}
          <div className="flex flex-wrap gap-2">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              const isCompleted = activeStep > step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => scrollToStep(step.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                    isActive 
                      ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400' 
                      : isCompleted 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-white/5 border-transparent text-white/60 hover:bg-white/5'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-indigo-500/30' : isCompleted ? 'bg-emerald-500/30' : 'bg-white/10'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : step.id}
                  </span>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-5 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        {/* Form Section */}
        <div className="flex flex-col gap-6">
          <InvoiceDetailsCard
            invoiceNumber={invoice.invoiceNumber || ""}
            date={invoice.date || ""}
            dueDate={invoice.dueDate || ""}
            onInvoiceNumberChange={(value) => setInvoice({ ...invoice, invoiceNumber: value })}
            onDateChange={(value) => setInvoice({ ...invoice, date: value })}
            onDueDateChange={(value) => setInvoice({ ...invoice, dueDate: value })}
            isVisible={isVisible}
            delay={isVisible ? "0.1s" : "0s"}
          />

          <FromDetailsCard
            fromName={invoice.fromName || ""}
            fromEmail={invoice.fromEmail || ""}
            fromAddress={invoice.fromAddress || ""}
            onFromNameChange={(value) => setInvoice({ ...invoice, fromName: value })}
            onFromEmailChange={(value) => setInvoice({ ...invoice, fromEmail: value })}
            onFromAddressChange={(value) => setInvoice({ ...invoice, fromAddress: value })}
            isVisible={isVisible}
            delay={isVisible ? "0.2s" : "0s"}
          />

          <ToDetailsCard
            toName={invoice.toName || ""}
            toEmail={invoice.toEmail || ""}
            toAddress={invoice.toAddress || ""}
            onToNameChange={(value) => setInvoice({ ...invoice, toName: value })}
            onToEmailChange={(value) => setInvoice({ ...invoice, toEmail: value })}
            onToAddressChange={(value) => setInvoice({ ...invoice, toAddress: value })}
            isVisible={isVisible}
            delay={isVisible ? "0.3s" : "0s"}
          />

          <LineItemsCard
            items={invoice.items || []}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            onUpdateItem={updateItem}
            isVisible={isVisible}
            delay={isVisible ? "0.4s" : "0s"}
          />

          <NotesCard
            notes={invoice.notes || ""}
            onNotesChange={(value) => setInvoice({ ...invoice, notes: value })}
            isVisible={isVisible}
            delay={isVisible ? "0.5s" : "0s"}
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
      </main>

      {/* Preview Modal (Mobile) */}
      <InvoicePreview
        invoice={invoice}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          header, .lg\\:sticky, button { display: none !important; }
          .grid { display: block !important; }
          .bg-\\[\\#0a0a12\\] { background: #fff !important; color: #000 !important; }
        }
      `}</style>
    </div>
  );
}
