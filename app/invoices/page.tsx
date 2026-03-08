"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Download } from "lucide-react";

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

  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Invoice Generator</h1>
        <p className="text-muted-foreground mt-1">
          Create professional invoices and download as PDF
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Invoice Form */}
        <div className="space-y-6">
          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    value={invoice.invoiceNumber}
                    onChange={(e) =>
                      setInvoice({ ...invoice, invoiceNumber: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Invoice Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={invoice.date}
                    onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={invoice.dueDate}
                    onChange={(e) =>
                      setInvoice({ ...invoice, dueDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* From Details */}
          <Card>
            <CardHeader>
              <CardTitle>From (Your Details)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fromName">Company/Your Name</Label>
                <Input
                  id="fromName"
                  placeholder="Your Business Name"
                  value={invoice.fromName}
                  onChange={(e) =>
                    setInvoice({ ...invoice, fromName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromEmail">Email</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={invoice.fromEmail}
                  onChange={(e) =>
                    setInvoice({ ...invoice, fromEmail: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromAddress">Address</Label>
                <Textarea
                  id="fromAddress"
                  placeholder="Your business address"
                  value={invoice.fromAddress}
                  onChange={(e) =>
                    setInvoice({ ...invoice, fromAddress: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* To Details */}
          <Card>
            <CardHeader>
              <CardTitle>To (Client Details)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="toName">Client Name</Label>
                <Input
                  id="toName"
                  placeholder="Client's name or company"
                  value={invoice.toName}
                  onChange={(e) =>
                    setInvoice({ ...invoice, toName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toEmail">Client Email</Label>
                <Input
                  id="toEmail"
                  type="email"
                  placeholder="client@email.com"
                  value={invoice.toEmail}
                  onChange={(e) =>
                    setInvoice({ ...invoice, toEmail: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toAddress">Client Address</Label>
                <Textarea
                  id="toAddress"
                  placeholder="Client's address"
                  value={invoice.toAddress}
                  onChange={(e) =>
                    setInvoice({ ...invoice, toAddress: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle>Line Items</CardTitle>
              <CardDescription>Add the services or products</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {invoice.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-end p-4 border rounded-lg"
                >
                  <div className="flex-1 w-full space-y-2">
                    <Label>Description</Label>
                    <Input
                      placeholder="Service or product"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(item.id, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-full sm:w-20 space-y-2">
                    <Label>Qty</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, "quantity", parseInt(e.target.value) || 0)
                      }
                    />
                  </div>
                  <div className="w-full sm:w-28 space-y-2">
                    <Label>Price ($)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(item.id, "price", parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>
                  <div className="w-full sm:w-24 space-y-2">
                    <Label>Total</Label>
                    <div className="h-9 sm:h-10 px-3 flex items-center border rounded-md bg-muted text-sm font-medium">
                      ${(item.quantity * item.price).toFixed(2)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    disabled={(invoice.items?.length || 0) <= 1}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addItem} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Additional notes or terms"
                value={invoice.notes}
                onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
              />
            </CardContent>
          </Card>
        </div>

        {/* Invoice Preview */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={handlePrint} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>

          {/* Print Preview */}
          <div className="border rounded-lg bg-background p-6 sm:p-8 shadow-lg print:shadow-none print:border-0">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">INVOICE</h2>
                  <p className="text-muted-foreground">#{invoice.invoiceNumber}</p>
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
              <div className="flex flex-col sm:flex-row justify-between border-t pt-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Invoice Date:</p>
                  <p className="font-medium">{invoice.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date:</p>
                  <p className="font-medium">{invoice.dueDate}</p>
                </div>
              </div>

              {/* Bill To */}
              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-1">Bill To:</p>
                <h3 className="font-semibold text-foreground">
                  {invoice.toName || "Client Name"}
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {invoice.toAddress}
                </p>
                <p className="text-sm text-muted-foreground">{invoice.toEmail}</p>
              </div>

              {/* Items Table */}
              <div className="border-t pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-sm text-muted-foreground">Description</th>
                        <th className="text-center py-2 text-sm text-muted-foreground">Qty</th>
                        <th className="text-right py-2 text-sm text-muted-foreground">Price</th>
                        <th className="text-right py-2 text-sm text-muted-foreground">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items?.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2 text-foreground">{item.description || "—"}</td>
                          <td className="text-center py-2 text-foreground">{item.quantity}</td>
                          <td className="text-right py-2 text-foreground">${item.price.toFixed(2)}</td>
                          <td className="text-right py-2 text-foreground">
                            ${(item.quantity * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="border-t pt-4">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-t font-bold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Notes */}
              {invoice.notes && (
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground font-medium">Notes:</p>
                  <p className="text-sm text-muted-foreground">{invoice.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
