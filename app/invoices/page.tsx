"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Download, FileText, Sparkles, CheckCircle2 } from "lucide-react";

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

export default function InvoicesPage() {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-white">
        <div className="container py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Invoice Generator</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create Invoice</h1>
              <p className="text-muted-foreground mt-1">Generate professional invoices in seconds</p>
            </div>
            <Button onClick={handlePrint} className="rounded-full bg-slate-900 hover:bg-slate-800">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Invoice Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Invoice Details */}
            <Card className="border-border/50 shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-bold text-slate-600">1</span>
                  Invoice Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber" className="text-xs font-medium text-muted-foreground uppercase">Invoice Number</Label>
                    <Input
                      id="invoiceNumber"
                      value={invoice.invoiceNumber}
                      onChange={(e) =>
                        setInvoice({ ...invoice, invoiceNumber: e.target.value })
                      }
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-xs font-medium text-muted-foreground uppercase">Invoice Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={invoice.date}
                      onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate" className="text-xs font-medium text-muted-foreground uppercase">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={invoice.dueDate}
                      onChange={(e) =>
                        setInvoice({ ...invoice, dueDate: e.target.value })
                      }
                      className="h-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* From Details */}
            <Card className="border-border/50 shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-bold text-slate-600">2</span>
                  From (Your Details)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fromName" className="text-xs font-medium text-muted-foreground uppercase">Company / Your Name</Label>
                  <Input
                    id="fromName"
                    placeholder="Your Business Name"
                    value={invoice.fromName}
                    onChange={(e) =>
                      setInvoice({ ...invoice, fromName: e.target.value })
                    }
                    className="h-10"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail" className="text-xs font-medium text-muted-foreground uppercase">Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={invoice.fromEmail}
                      onChange={(e) =>
                        setInvoice({ ...invoice, fromEmail: e.target.value })
                      }
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromPhone" className="text-xs font-medium text-muted-foreground uppercase">Phone (Optional)</Label>
                    <Input
                      id="fromPhone"
                      placeholder="+1 (555) 000-0000"
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromAddress" className="text-xs font-medium text-muted-foreground uppercase">Address</Label>
                  <Textarea
                    id="fromAddress"
                    placeholder="Your business address"
                    value={invoice.fromAddress}
                    onChange={(e) =>
                      setInvoice({ ...invoice, fromAddress: e.target.value })
                    }
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* To Details */}
            <Card className="border-border/50 shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-bold text-slate-600">3</span>
                  To (Client Details)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="toName" className="text-xs font-medium text-muted-foreground uppercase">Client Name</Label>
                  <Input
                    id="toName"
                    placeholder="Client's name or company"
                    value={invoice.toName}
                    onChange={(e) =>
                      setInvoice({ ...invoice, toName: e.target.value })
                    }
                    className="h-10"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="toEmail" className="text-xs font-medium text-muted-foreground uppercase">Client Email</Label>
                    <Input
                      id="toEmail"
                      type="email"
                      placeholder="client@email.com"
                      value={invoice.toEmail}
                      onChange={(e) =>
                        setInvoice({ ...invoice, toEmail: e.target.value })
                      }
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="toPhone" className="text-xs font-medium text-muted-foreground uppercase">Phone (Optional)</Label>
                    <Input
                      id="toPhone"
                      placeholder="+1 (555) 000-0000"
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toAddress" className="text-xs font-medium text-muted-foreground uppercase">Client Address</Label>
                  <Textarea
                    id="toAddress"
                    placeholder="Client's address"
                    value={invoice.toAddress}
                    onChange={(e) =>
                      setInvoice({ ...invoice, toAddress: e.target.value })
                    }
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card className="border-border/50 shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-bold text-slate-600">4</span>
                  Line Items
                </CardTitle>
                <CardDescription>Add services or products to invoice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {invoice.items?.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-3 p-4 bg-muted/30 rounded-xl border border-border/30"
                  >
                    <div className="flex-1 space-y-2">
                      <Label className="text-xs text-muted-foreground">Description</Label>
                      <Input
                        placeholder="Service or product description"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, "description", e.target.value)
                        }
                        className="h-10"
                      />
                    </div>
                    <div className="w-full sm:w-24 space-y-2">
                      <Label className="text-xs text-muted-foreground">Qty</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(item.id, "quantity", parseInt(e.target.value) || 0)
                        }
                        className="h-10"
                      />
                    </div>
                    <div className="w-full sm:w-32 space-y-2">
                      <Label className="text-xs text-muted-foreground">Price ($)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(item.id, "price", parseFloat(e.target.value) || 0)
                        }
                        className="h-10"
                      />
                    </div>
                    <div className="w-full sm:w-28 space-y-2">
                      <Label className="text-xs text-muted-foreground">Amount</Label>
                      <div className="h-10 px-3 flex items-center rounded-md bg-white border border-border text-sm font-semibold">
                        ${(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={(invoice.items?.length || 0) <= 1}
                        className="h-10 w-10 rounded-lg hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addItem} className="w-full rounded-lg border-dashed h-12">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Line Item
                </Button>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border-border/50 shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-bold text-slate-600">5</span>
                  Notes & Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Additional notes, payment terms, or thank you message..."
                  value={invoice.notes}
                  onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Invoice Preview */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              {/* Summary Card */}
              <Card className="border-border/50 shadow-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold">Invoice Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold">${total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card className="border-border/50 shadow-elevated overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-border/50 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Live Preview</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-600 font-medium">Updating</span>
                  </div>
                </div>
                <CardContent className="p-6 sm:p-8 print:p-0">
                  <div className="space-y-6 print:space-y-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 mb-3">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">INVOICE</h2>
                        <p className="text-sm text-muted-foreground">#{invoice.invoiceNumber}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <h3 className="font-semibold text-foreground">
                          {invoice.fromName || "Your Company"}
                        </h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {invoice.fromAddress}
                        </p>
                        <p className="text-sm text-muted-foreground">{invoice.fromEmail}</p>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-muted/30 rounded-xl">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Invoice Date</p>
                        <p className="font-medium text-foreground">{invoice.date}</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Due Date</p>
                        <p className="font-medium text-foreground">{invoice.dueDate}</p>
                      </div>
                    </div>

                    {/* Bill To */}
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Bill To</p>
                      <h3 className="font-semibold text-foreground">
                        {invoice.toName || "Client Name"}
                      </h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {invoice.toAddress}
                      </p>
                      <p className="text-sm text-muted-foreground">{invoice.toEmail}</p>
                    </div>

                    {/* Items Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
                            <th className="text-center py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Qty</th>
                            <th className="text-right py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                            <th className="text-right py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoice.items?.map((item) => (
                            <tr key={item.id} className="border-b border-border/30">
                              <td className="py-3 text-sm text-foreground">{item.description || "—"}</td>
                              <td className="text-center py-3 text-sm text-foreground">{item.quantity}</td>
                              <td className="text-right py-3 text-sm text-foreground">${item.price.toFixed(2)}</td>
                              <td className="text-right py-3 text-sm font-medium text-foreground">
                                ${(item.quantity * item.price).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Totals */}
                    <div className="space-y-2 pt-4 border-t border-border/50">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (10%)</span>
                        <span className="text-foreground">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-border/50">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {invoice.notes && (
                      <div className="pt-4 border-t border-border/50">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Notes</p>
                        <p className="text-sm text-muted-foreground">{invoice.notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
