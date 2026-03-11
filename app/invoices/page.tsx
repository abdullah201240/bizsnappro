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
  Plus,
  Trash2,
  Download,
  Eye,
  Calculator,
  CheckCircle2,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  items: InvoiceItem[];
  notes: string;
}

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
          {/* Step 1: Invoice Details */}
          <Card 
            id="step-1" 
            icon={<FileText className="w-5 h-5" />}
            title="Invoice Details"
            subtitle="Basic information about this invoice"
            delay={isVisible ? "0.1s" : "0s"}
            visible={isVisible}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col gap-2">
                <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Invoice Number</Label>
                <Input
                  value={invoice.invoiceNumber}
                  onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Invoice Date</Label>
                <Input
                  type="date"
                  value={invoice.date}
                  onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white focus:border-indigo-500/50 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Due Date</Label>
                <Input
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white focus:border-indigo-500/50 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </Card>

          {/* Step 2: From Details */}
          <Card 
            id="step-2" 
            icon={<Building2 className="w-5 h-5" />}
            title="Your Details"
            subtitle="Who is this invoice from?"
            delay={isVisible ? "0.2s" : "0s"}
            visible={isVisible}
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Company / Your Name</Label>
                <Input
                  placeholder="Your Business Name"
                  value={invoice.fromName}
                  onChange={(e) => setInvoice({ ...invoice, fromName: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Email Address</Label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={invoice.fromEmail}
                  onChange={(e) => setInvoice({ ...invoice, fromEmail: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Address</Label>
                <Input
                  placeholder="123 Business St, City, Country"
                  value={invoice.fromAddress}
                  onChange={(e) => setInvoice({ ...invoice, fromAddress: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </Card>

          {/* Step 3: To Details */}
          <Card 
            id="step-3" 
            icon={<User className="w-5 h-5" />}
            title="Client Details"
            subtitle="Who is this invoice for?"
            delay={isVisible ? "0.3s" : "0s"}
            visible={isVisible}
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Client Name / Company</Label>
                <Input
                  placeholder="Client Business Name"
                  value={invoice.toName}
                  onChange={(e) => setInvoice({ ...invoice, toName: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Email Address</Label>
                <Input
                  type="email"
                  placeholder="client@email.com"
                  value={invoice.toEmail}
                  onChange={(e) => setInvoice({ ...invoice, toEmail: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Address</Label>
                <Input
                  placeholder="456 Client St, City, Country"
                  value={invoice.toAddress}
                  onChange={(e) => setInvoice({ ...invoice, toAddress: e.target.value })}
                  className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </Card>

          {/* Step 4: Line Items */}
          <Card 
            id="step-4" 
            icon={<Package className="w-5 h-5" />}
            title="Line Items"
            subtitle="Add products or services"
            delay={isVisible ? "0.4s" : "0s"}
            visible={isVisible}
          >
            <div className="flex flex-col gap-4">
              {invoice.items?.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_80px_100px_100px_44px] gap-3 p-4 bg-white/5 border border-white/6 rounded-xl hover:border-white/10 transition-colors">
                  <div className="flex flex-col gap-2">
                    <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Description</Label>
                    <Input
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Qty</Label>
                    <Input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
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
                      onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
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
                      onClick={() => removeItem(item.id)}
                      disabled={(invoice.items?.length || 0) === 1}
                      className="h-11 w-11 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              <button 
                className="w-full h-12 rounded-xl border border-dashed border-white/15 bg-transparent text-white/60 text-sm font-medium flex items-center justify-center gap-2 hover:border-indigo-500/40 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all" 
                onClick={addItem}
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
          </Card>

          {/* Step 5: Notes */}
          <Card 
            id="step-5" 
            icon={<StickyNote className="w-5 h-5" />}
            title="Notes"
            subtitle="Additional information for the client"
            delay={isVisible ? "0.5s" : "0s"}
            visible={isVisible}
          >
            <Textarea
              placeholder="Thank you for your business!"
              value={invoice.notes}
              onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
              className="bg-white/5 border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:border-indigo-500/50 focus:ring-indigo-500/20 min-h-[100px] resize-none"
            />
          </Card>
        </div>

        {/* Sidebar */}
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
            onClick={handlePrint}
          >
            <Download className="w-4.5 h-4.5" />
            Download Invoice
          </button>

          <button 
            className="w-full h-11 mt-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors lg:hidden"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="w-4 h-4" />
            Preview Invoice
          </button>
        </div>
      </main>

      {/* Preview Modal (Mobile) */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] bg-[#05050a]/95 backdrop-blur-xl p-5 overflow-y-auto lg:hidden">
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => setShowPreview(false)}
              className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-[#0a0a12] rounded-xl border border-white/6 p-5">
            <InvoicePreviewContent invoice={invoice} subtotal={subtotal} tax={tax} total={total} />
          </div>
        </div>
      )}

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

// Card Component
function Card({ 
  id, 
  icon, 
  title, 
  subtitle, 
  children, 
  visible, 
  delay 
}: { 
  id: string; 
  icon: React.ReactNode; 
  title: string; 
  subtitle: string; 
  children: React.ReactNode; 
  visible: boolean; 
  delay: string;
}) {
  return (
    <div 
      id={id}
      className={`bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: delay }}
    >
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400">
          {icon}
        </div>
        <div>
          <h2 className="font-syne text-base font-bold text-white">{title}</h2>
          <p className="text-xs text-white/40 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

// Invoice Preview Content
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
