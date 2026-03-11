"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QRCodeSVG } from "qrcode.react";
import { 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  Trash2, 
  Link2, 
  ScanLine, 
  Maximize2,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

interface QRCodeItem {
  id: string;
  name: string;
  content: string;
  description: string;
  size: number;
  createdAt: string;
}

const sizeOptions = [
  { label: "Small", value: 128, desc: "Business cards" },
  { label: "Medium", value: 256, desc: "Web & print" },
  { label: "Large", value: 512, desc: "Posters & signs" },
  { label: "Extra Large", value: 1024, desc: "Billboards" },
];

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

  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans">
      {/* Header */}
      <header className="bg-gradient-to-b from-rose-500/8 to-transparent border-b border-white/6 relative overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(rgba(244,63,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(244,63,94,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-10 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-600/20 flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-rose-400" />
                </div>
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">QR Code Generator</span>
              </div>
              <h1 className="font-syne text-2xl md:text-3xl font-extrabold text-white mb-2">Generate QR Codes</h1>
              <p className="text-sm text-white/50">Create scannable codes for payments and links</p>
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
                  <ScanLine className="w-4 h-4" />
                  Create QR Code
                </h2>
                <p className="text-xs text-white/40 mt-1">Generate a scannable QR code</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Name</Label>
                  <Input
                    placeholder="e.g., Invoice #123 Payment"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                    <Link2 className="h-3 w-3" />
                    Content / URL
                  </Label>
                  <Textarea
                    placeholder="https://paypal.me/yourname or any URL..."
                    value={newItem.content}
                    onChange={(e) =>
                      setNewItem({ ...newItem, content: e.target.value })
                    }
                    className="bg-white/5 border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 min-h-[80px] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Description (Optional)</Label>
                  <Textarea
                    placeholder="What is this QR code for?"
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    className="bg-white/5 border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 min-h-[60px] resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                    <Maximize2 className="h-3 w-3" />
                    Size
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {sizeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setNewItem({ ...newItem, size: option.value })}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          newItem.size === option.value
                            ? "border-rose-500/50 bg-rose-500/10"
                            : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                        }`}
                      >
                        <p className={`font-medium text-sm ${newItem.size === option.value ? "text-white" : "text-white/80"}`}>
                          {option.label}
                        </p>
                        <p className="text-xs text-white/40">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateQRCode}
                  disabled={!newItem.content}
                  className="w-full h-11 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-rose-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <QrCode className="w-4 h-4" />
                  Generate QR Code
                </button>
              </div>
            </div>
          </div>

          {/* QR Codes List */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <div className="bg-white/[0.02] border border-white/6 rounded-2xl">
                <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/[0.05] flex items-center justify-center mb-6">
                    <QrCode className="h-10 w-10 text-white/30" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No QR codes yet</h3>
                  <p className="text-white/40 max-w-sm">
                    Create your first QR code by entering a URL or text on the left. 
                    Perfect for payment links, invoices, or business cards.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((item) => (
                  <div key={item.id} className="bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-white truncate">{item.name}</h3>
                          {item.description && (
                            <p className="text-xs text-white/40 mt-0.5 line-clamp-1">{item.description}</p>
                          )}
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <button
                            onClick={() => copyToClipboard(item.content, item.id)}
                            className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-white/70 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
                          >
                            {copiedId === item.id ? (
                              <Check className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => downloadQRCode(item)}
                            className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-white/70 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/30 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 pt-4">
                      <div
                        ref={qrRef}
                        className="flex justify-center p-5 bg-white rounded-xl border border-white/10 mb-3"
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
                        <p className="text-xs text-white/40 truncate flex-1 font-mono">
                          {item.content}
                        </p>
                        <span className="text-xs text-white/30 ml-2">
                          {item.size}px
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
