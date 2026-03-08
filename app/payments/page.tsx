"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link as LinkIcon, Copy, Check, ExternalLink, Trash2, Wallet, CreditCard, Building2, DollarSign, Link2 } from "lucide-react";

interface PaymentLink {
  id: string;
  name: string;
  type: string;
  amount: string;
  description: string;
  link: string;
  createdAt: string;
}

const paymentTypes = [
  { id: "paypal", name: "PayPal", icon: Wallet, color: "bg-blue-50 text-blue-600", placeholder: "yourusername" },
  { id: "stripe", name: "Stripe", icon: CreditCard, color: "bg-purple-50 text-purple-600", placeholder: "test_xxx" },
  { id: "venmo", name: "Venmo", icon: DollarSign, color: "bg-sky-50 text-sky-600", placeholder: "your-username" },
  { id: "cashapp", name: "Cash App", icon: DollarSign, color: "bg-emerald-50 text-emerald-600", placeholder: "yourname" },
  { id: "bank", name: "Bank Transfer", icon: Building2, color: "bg-amber-50 text-amber-600", placeholder: "https://yourbank.com/transfer" },
  { id: "custom", name: "Custom URL", icon: Link2, color: "bg-slate-50 text-slate-600", placeholder: "https://payment.com/link" },
];

export default function PaymentsPage() {
  const [links, setLinks] = useState<PaymentLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newLink, setNewLink] = useState({
    name: "",
    type: "paypal",
    amount: "",
    description: "",
    customUrl: "",
  });

  const generateLink = () => {
    let paymentUrl = "";

    switch (newLink.type) {
      case "paypal":
        paymentUrl = newLink.amount
          ? `https://paypal.me/${newLink.customUrl || "[username]"}/${newLink.amount}`
          : `https://paypal.me/${newLink.customUrl || "[username]"}`;
        break;
      case "stripe":
        paymentUrl = `https://buy.stripe.com/${newLink.customUrl || "[test]"}`;
        break;
      case "venmo":
        paymentUrl = `https://venmo.com/${newLink.customUrl || "[username]"}?txn=pay&amount=${newLink.amount || "0"}`;
        break;
      case "cashapp":
        paymentUrl = `https://cash.app/$${newLink.customUrl || "[username]"}/${newLink.amount || "0"}`;
        break;
      case "bank":
        paymentUrl = newLink.customUrl || "[Bank transfer link]";
        break;
      case "custom":
        paymentUrl = newLink.customUrl || "[Your payment URL]";
        break;
    }

    const link: PaymentLink = {
      id: Date.now().toString(),
      name: newLink.name || "Payment Link",
      type: newLink.type,
      amount: newLink.amount,
      description: newLink.description,
      link: paymentUrl,
      createdAt: new Date().toISOString(),
    };

    setLinks([link, ...links]);
    setNewLink({
      name: "",
      type: "paypal",
      amount: "",
      description: "",
      customUrl: "",
    });
  };

  const copyToClipboard = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
  };

  const selectedType = paymentTypes.find(t => t.id === newLink.type);
  const SelectedIcon = selectedType?.icon || Wallet;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-white">
        <div className="container py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50">
                  <LinkIcon className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Payment Links</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Generate Links</h1>
              <p className="text-muted-foreground mt-1">Create payment links for your clients</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Generate Form */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 shadow-card sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  Create Payment Link
                </CardTitle>
                <CardDescription>Generate a shareable payment link</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase">Link Name</Label>
                  <Input
                    placeholder="e.g., Invoice #123 Payment"
                    value={newLink.name}
                    onChange={(e) =>
                      setNewLink({ ...newLink, name: e.target.value })
                    }
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase">Payment Type</Label>
                  <Select
                    value={newLink.type}
                    onValueChange={(value) =>
                      setNewLink({ ...newLink, type: value || "paypal" })
                    }
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {type.name}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase">
                    {selectedType?.name} Identifier
                  </Label>
                  <Input
                    placeholder={selectedType?.placeholder}
                    value={newLink.customUrl}
                    onChange={(e) =>
                      setNewLink({ ...newLink, customUrl: e.target.value })
                    }
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground">
                    {newLink.type === "paypal" && "Your PayPal.me username"}
                    {newLink.type === "venmo" && "Your Venmo username"}
                    {newLink.type === "cashapp" && "Your $Cashtag without the $"}
                    {newLink.type === "stripe" && "Your Stripe payment link code"}
                    {newLink.type === "bank" && "Direct link to your bank transfer page"}
                    {newLink.type === "custom" && "Any payment URL you want to share"}
                  </p>
                </div>

                {(newLink.type === "paypal" ||
                  newLink.type === "venmo" ||
                  newLink.type === "cashapp") && (
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase">Amount (Optional)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newLink.amount}
                      onChange={(e) =>
                        setNewLink({ ...newLink, amount: e.target.value })
                      }
                      className="h-10"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase">Description (Optional)</Label>
                  <Textarea
                    placeholder="What is this payment for?"
                    value={newLink.description}
                    onChange={(e) =>
                      setNewLink({ ...newLink, description: e.target.value })
                    }
                    rows={2}
                  />
                </div>

                <Button onClick={generateLink} className="w-full rounded-lg bg-slate-900 hover:bg-slate-800">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Generate Link
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Links List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">Your Payment Links</CardTitle>
                <CardDescription>Manage and share your generated links</CardDescription>
              </CardHeader>
              <CardContent>
                {links.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                      <LinkIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No payment links yet.</p>
                    <p className="text-sm text-muted-foreground">Create your first payment link to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {links.map((link) => {
                      const typeInfo = paymentTypes.find(t => t.id === link.type);
                      const TypeIcon = typeInfo?.icon || Wallet;
                      return (
                        <div
                          key={link.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/30 gap-4"
                        >
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${typeInfo?.color || "bg-slate-50"}`}>
                              <TypeIcon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-semibold text-foreground truncate">{link.name}</p>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-border/50 capitalize font-medium text-muted-foreground">
                                  {link.type}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate font-mono mt-0.5">
                                {link.link}
                              </p>
                              {link.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {link.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(link.link, link.id)}
                              className="flex-1 sm:flex-initial rounded-lg"
                            >
                              {copiedId === link.id ? (
                                <Check className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                              <span className="ml-2">{copiedId === link.id ? "Copied" : "Copy"}</span>
                            </Button>
                            <a
                              href={link.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-muted hover:text-foreground h-9 px-3 border border-input bg-background shadow-sm"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteLink(link.id)}
                              className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-border/50 shadow-card bg-gradient-to-br from-slate-50 to-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">Payment Link Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-border/50">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs">PP</div>
                    <div>
                      <p className="font-medium text-sm">PayPal</p>
                      <p className="text-xs text-muted-foreground">Use paypal.me/username format</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-border/50">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 font-bold text-xs">CA</div>
                    <div>
                      <p className="font-medium text-sm">Cash App</p>
                      <p className="text-xs text-muted-foreground">Use $yourname format</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-border/50">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 text-purple-600 font-bold text-xs">ST</div>
                    <div>
                      <p className="font-medium text-sm">Stripe</p>
                      <p className="text-xs text-muted-foreground">Create links from Stripe dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-border/50">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-50 text-sky-600 font-bold text-xs">VN</div>
                    <div>
                      <p className="font-medium text-sm">Venmo</p>
                      <p className="text-xs text-muted-foreground">Use your Venmo username</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
