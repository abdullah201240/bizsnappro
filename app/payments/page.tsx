"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Link as LinkIcon, 
  Copy, 
  Check, 
  ExternalLink, 
  Trash2, 
  Wallet, 
  CreditCard, 
  Building2, 
  DollarSign, 
  Link2,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

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
  { id: "paypal", name: "PayPal", icon: Wallet, gradient: "from-blue-500/20 to-blue-600/20", border: "border-blue-500/30", text: "text-blue-400", placeholder: "yourusername" },
  { id: "stripe", name: "Stripe", icon: CreditCard, gradient: "from-purple-500/20 to-purple-600/20", border: "border-purple-500/30", text: "text-purple-400", placeholder: "test_xxx" },
  { id: "venmo", name: "Venmo", icon: DollarSign, gradient: "from-sky-500/20 to-sky-600/20", border: "border-sky-500/30", text: "text-sky-400", placeholder: "your-username" },
  { id: "cashapp", name: "Cash App", icon: DollarSign, gradient: "from-emerald-500/20 to-emerald-600/20", border: "border-emerald-500/30", text: "text-emerald-400", placeholder: "yourname" },
  { id: "bank", name: "Bank Transfer", icon: Building2, gradient: "from-amber-500/20 to-amber-600/20", border: "border-amber-500/30", text: "text-amber-400", placeholder: "https://yourbank.com/transfer" },
  { id: "custom", name: "Custom URL", icon: Link2, gradient: "from-slate-500/20 to-slate-600/20", border: "border-slate-500/30", text: "text-slate-400", placeholder: "https://payment.com/link" },
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
    <div className="min-h-screen bg-[#05050a] text-white font-sans">
      {/* Header */}
      <header className="bg-gradient-to-b from-amber-500/8 to-transparent border-b border-white/6 relative overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-10 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Payment Links</span>
              </div>
              <h1 className="font-syne text-2xl md:text-3xl font-extrabold text-white mb-2">Generate Links</h1>
              <p className="text-sm text-white/50">Create payment links for your clients</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-5 md:px-10 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Generate Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/[0.02] border border-white/6 rounded-2xl sticky top-6">
              <div className="px-6 py-5 border-b border-white/6">
                <h2 className="font-syne text-base font-bold text-white flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  Create Payment Link
                </h2>
                <p className="text-xs text-white/40 mt-1">Generate a shareable payment link</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Link Name</Label>
                  <Input
                    placeholder="e.g., Invoice #123 Payment"
                    value={newLink.name}
                    onChange={(e) =>
                      setNewLink({ ...newLink, name: e.target.value })
                    }
                    className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Payment Type</Label>
                  <Select
                    value={newLink.type}
                    onValueChange={(value) =>
                      setNewLink({ ...newLink, type: value || "paypal" })
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white">
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#05050a] border-white/10">
                      {paymentTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <SelectItem key={type.id} value={type.id} className="text-white focus:bg-white/10">
                            <div className="flex items-center gap-2">
                              <Icon className={`h-4 w-4 ${type.text}`} />
                              {type.name}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                    {selectedType?.name} Identifier
                  </Label>
                  <Input
                    placeholder={selectedType?.placeholder}
                    value={newLink.customUrl}
                    onChange={(e) =>
                      setNewLink({ ...newLink, customUrl: e.target.value })
                    }
                    className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30"
                  />
                  <p className="text-xs text-white/30">
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
                    <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Amount (Optional)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newLink.amount}
                      onChange={(e) =>
                        setNewLink({ ...newLink, amount: e.target.value })
                      }
                      className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Description (Optional)</Label>
                  <Textarea
                    placeholder="What is this payment for?"
                    value={newLink.description}
                    onChange={(e) =>
                      setNewLink({ ...newLink, description: e.target.value })
                    }
                    className="bg-white/5 border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 min-h-[60px] resize-none"
                  />
                </div>

                <button 
                  onClick={generateLink}
                  className="w-full h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/30 transition-all"
                >
                  <LinkIcon className="w-4 h-4" />
                  Generate Link
                </button>
              </div>
            </div>
          </div>

          {/* Links List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/6">
                <h2 className="font-syne text-base font-bold text-white">Your Payment Links</h2>
                <p className="text-xs text-white/40 mt-1">Manage and share your generated links</p>
              </div>
              <div className="p-6">
                {links.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center mx-auto mb-4">
                      <LinkIcon className="w-8 h-8 text-white/30" />
                    </div>
                    <p className="text-white/50">No payment links yet.</p>
                    <p className="text-sm text-white/30 mt-1">Create your first payment link to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {links.map((link) => {
                      const typeInfo = paymentTypes.find(t => t.id === link.type);
                      const TypeIcon = typeInfo?.icon || Wallet;
                      return (
                        <div
                          key={link.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/6 gap-4 hover:border-white/10 transition-colors"
                        >
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${typeInfo?.gradient || "from-slate-500/20 to-slate-600/20"} border ${typeInfo?.border || "border-slate-500/30"}`}>
                              <TypeIcon className={`h-5 w-5 ${typeInfo?.text || "text-slate-400"}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-semibold text-white truncate">{link.name}</p>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 capitalize font-medium text-white/50">
                                  {link.type}
                                </span>
                              </div>
                              <p className="text-sm text-white/40 truncate font-mono mt-0.5">
                                {link.link}
                              </p>
                              {link.description && (
                                <p className="text-xs text-white/30 mt-1">
                                  {link.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                              onClick={() => copyToClipboard(link.link, link.id)}
                              className="flex-1 sm:flex-initial h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-colors"
                            >
                              {copiedId === link.id ? (
                                <Check className="h-4 w-4 text-emerald-400" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                              <span className="hidden sm:inline">{copiedId === link.id ? "Copied" : "Copy"}</span>
                            </button>
                            <a
                              href={link.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-lg text-sm font-medium h-9 px-3 bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                            <button
                              onClick={() => deleteLink(link.id)}
                              className="h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/30 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/6">
                <h2 className="font-syne text-base font-bold text-white">Payment Link Tips</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/6">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-xs border border-blue-500/30">PP</div>
                    <div>
                      <p className="font-medium text-sm text-white">PayPal</p>
                      <p className="text-xs text-white/40">Use paypal.me/username format</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/6">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30">CA</div>
                    <div>
                      <p className="font-medium text-sm text-white">Cash App</p>
                      <p className="text-xs text-white/40">Use $yourname format</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/6">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 font-bold text-xs border border-purple-500/30">ST</div>
                    <div>
                      <p className="font-medium text-sm text-white">Stripe</p>
                      <p className="text-xs text-white/40">Create links from Stripe dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/6">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 font-bold text-xs border border-sky-500/30">VN</div>
                    <div>
                      <p className="font-medium text-sm text-white">Venmo</p>
                      <p className="text-xs text-white/40">Use your Venmo username</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
