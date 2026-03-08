"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Download, Copy, Check, Trash2, Link2, ScanLine, Image, Maximize2 } from "lucide-react";

interface QRCodeItem {
  id: string;
  name: string;
  content: string;
  description: string;
  size: number;
  createdAt: string;
}

export default function QRCodePage() {
  const [items, setItems] = useState<QRCodeItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    content: "",
    description: "",
    size: 256,
  });
  const qrRef = useRef<HTMLDivElement>(null);

  const generateQRCode = () => {
    if (!newItem.content) return;

    const item: QRCodeItem = {
      id: Date.now().toString(),
      name: newItem.name || `QR Code ${items.length + 1}`,
      content: newItem.content,
      description: newItem.description,
      size: newItem.size,
      createdAt: new Date().toISOString(),
    };

    setItems([item, ...items]);
    setNewItem({
      name: "",
      content: "",
      description: "",
      size: 256,
    });
  };

  const copyToClipboard = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const downloadQRCode = (item: QRCodeItem) => {
    const svg = document.getElementById(`qr-${item.id}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");

    canvas.width = item.size;
    canvas.height = item.size;

    img.onload = () => {
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `${item.name.replace(/\s+/g, "-").toLowerCase()}-qrcode.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const sizeOptions = [
    { label: "Small", value: 128, desc: "Business cards" },
    { label: "Medium", value: 256, desc: "Web & print" },
    { label: "Large", value: 512, desc: "Posters & signs" },
    { label: "Extra Large", value: 1024, desc: "Billboards" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-white">
        <div className="container py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-rose-50">
                  <QrCode className="h-4 w-4 text-rose-600" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">QR Code Generator</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Generate QR Codes</h1>
              <p className="text-muted-foreground mt-1">Create scannable codes for payments and links</p>
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
                  <ScanLine className="h-4 w-4" />
                  Create QR Code
                </CardTitle>
                <CardDescription>Generate a scannable QR code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase">Name</Label>
                  <Input
                    placeholder="e.g., Invoice #123 Payment"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1.5">
                    <Link2 className="h-3 w-3" />
                    Content / URL
                  </Label>
                  <Textarea
                    placeholder="https://paypal.me/yourname or any URL..."
                    value={newItem.content}
                    onChange={(e) =>
                      setNewItem({ ...newItem, content: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase">Description (Optional)</Label>
                  <Textarea
                    placeholder="What is this QR code for?"
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    rows={2}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1.5">
                    <Maximize2 className="h-3 w-3" />
                    Size
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {sizeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setNewItem({ ...newItem, size: option.value })}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          newItem.size === option.value
                            ? "border-slate-900 bg-slate-50"
                            : "border-border/50 hover:border-border hover:bg-muted/30"
                        }`}
                      >
                        <p className={`font-medium text-sm ${newItem.size === option.value ? "text-slate-900" : "text-foreground"}`}>
                          {option.label}
                        </p>
                        <p className="text-xs text-muted-foreground">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={generateQRCode}
                  className="w-full rounded-lg bg-slate-900 hover:bg-slate-800"
                  disabled={!newItem.content}
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* QR Codes List */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <Card className="border-border/50 shadow-card">
                <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-muted mb-6">
                    <QrCode className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No QR codes yet</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Create your first QR code by entering a URL or text on the left. 
                    Perfect for payment links, invoices, or business cards.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((item) => (
                  <Card key={item.id} className="border-border/50 shadow-card overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base font-semibold truncate">{item.name}</CardTitle>
                          {item.description && (
                            <CardDescription className="text-xs mt-0.5 line-clamp-1">{item.description}</CardDescription>
                          )}
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyToClipboard(item.content, item.id)}
                            className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                          >
                            {copiedId === item.id ? (
                              <Check className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => downloadQRCode(item)}
                            className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteItem(item.id)}
                            className="h-8 w-8 rounded-lg hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div
                        ref={qrRef}
                        className="flex justify-center p-6 bg-white rounded-xl border border-border/50 mb-3"
                      >
                        <QRCodeSVG
                          id={`qr-${item.id}`}
                          value={item.content}
                          size={160}
                          level={"H"}
                          includeMargin={true}
                          bgColor="#ffffff"
                          fgColor="#0f172a"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate flex-1 font-mono">
                          {item.content}
                        </p>
                        <span className="text-xs text-muted-foreground ml-2">
                          {item.size}px
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
