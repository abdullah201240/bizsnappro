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
import { Link as LinkIcon, Copy, Check, ExternalLink, QrCode } from "lucide-react";

interface PaymentLink {
  id: string;
  name: string;
  type: string;
  amount: string;
  description: string;
  link: string;
  createdAt: string;
}

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

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Payment Link Generator</h1>
        <p className="text-muted-foreground">
          Generate payment links for your clients
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Generate Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Create Payment Link</CardTitle>
              <CardDescription>Generate a new payment link</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Link Name</Label>
                <Input
                  placeholder="e.g., Invoice #123"
                  value={newLink.name}
                  onChange={(e) =>
                    setNewLink({ ...newLink, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Payment Type</Label>
                <Select
                  value={newLink.type}
                  onValueChange={(value) =>
                    setNewLink({ ...newLink, type: value || "paypal" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="venmo">Venmo</SelectItem>
                    <SelectItem value="cashapp">Cash App</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="custom">Custom URL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  {newLink.type === "paypal"
                    ? "PayPal Username"
                    : newLink.type === "venmo"
                    ? "Venmo Username"
                    : newLink.type === "cashapp"
                    ? "Cash App Username"
                    : newLink.type === "stripe"
                    ? "Stripe Link Code"
                    : newLink.type === "bank"
                    ? "Bank Transfer Link"
                    : "Payment URL"}
                </Label>
                <Input
                  placeholder={
                    newLink.type === "paypal"
                      ? "yourusername"
                      : newLink.type === "venmo"
                      ? "your-username"
                      : newLink.type === "cashapp"
                      ? "yourname"
                      : newLink.type === "stripe"
                      ? "test_xxx"
                      : newLink.type === "bank"
                      ? "https://yourbank.com/transfer"
                      : "https://payment.com/link"
                  }
                  value={newLink.customUrl}
                  onChange={(e) =>
                    setNewLink({ ...newLink, customUrl: e.target.value })
                  }
                />
              </div>

              {(newLink.type === "paypal" ||
                newLink.type === "venmo" ||
                newLink.type === "cashapp") && (
                <div className="space-y-2">
                  <Label>Amount (Optional)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={newLink.amount}
                    onChange={(e) =>
                      setNewLink({ ...newLink, amount: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <Textarea
                  placeholder="What is this payment for?"
                  value={newLink.description}
                  onChange={(e) =>
                    setNewLink({ ...newLink, description: e.target.value })
                  }
                />
              </div>

              <Button onClick={generateLink} className="w-full">
                <LinkIcon className="h-4 w-4 mr-2" />
                Generate Link
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Links List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Payment Links</CardTitle>
              <CardDescription>
                Manage and share your payment links
              </CardDescription>
            </CardHeader>
            <CardContent>
              {links.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No payment links yet. Create your first one!
                </div>
              ) : (
                <div className="space-y-4">
                  {links.map((link) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{link.name}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                            {link.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {link.link}
                        </p>
                        {link.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {link.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(link.link, link.id)}
                        >
                          {copiedId === link.id ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <a
                          href={link.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-foreground h-9 px-3 border border-input bg-background shadow-sm"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteLink(link.id)}
                        >
                          <LinkIcon className="h-4 w-4 rotate-45" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Link Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong>PayPal:</strong> Use paypal.me/username for personalized links</p>
              <p>• <strong>Cash App:</strong> Use $yourname format for your username</p>
              <p>• <strong>Stripe:</strong> Create payment links from your Stripe dashboard</p>
              <p>• <strong>Bank Transfer:</strong> Include your account details securely</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
