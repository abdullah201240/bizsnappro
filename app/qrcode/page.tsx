"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Download, Copy, Check } from "lucide-react";

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
    size: 200,
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
      size: 200,
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
    const img = new Image();

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
    <div className="container py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">QR Code Generator</h1>
        <p className="text-muted-foreground mt-1">
          Generate QR codes for invoices and payments
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Generate Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Create QR Code</CardTitle>
              <CardDescription>Generate a new QR code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="e.g., Invoice #123 Payment"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Content / URL</Label>
                <Textarea
                  placeholder="https://paypal.me/yourname or https://yourinvoice.com/123"
                  value={newItem.content}
                  onChange={(e) =>
                    setNewItem({ ...newItem, content: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <Textarea
                  placeholder="What is this QR code for?"
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Size: {newItem.size}px</Label>
                <Input
                  type="range"
                  min="100"
                  max="400"
                  step="50"
                  value={newItem.size}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      size: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <Button
                onClick={generateQRCode}
                className="w-full"
                disabled={!newItem.content}
              >
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Code
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* QR Codes List */}
        <div className="lg:col-span-2 space-y-4">
          {items.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <QrCode className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No QR codes yet. Create your first one!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-lg truncate">{item.name}</CardTitle>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            copyToClipboard(item.content, item.id)
                          }
                        >
                          {copiedId === item.id ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => downloadQRCode(item)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteItem(item.id)}
                        >
                          <QrCode className="h-4 w-4 rotate-45" />
                        </Button>
                      </div>
                    </div>
                    {item.description && (
                      <CardDescription>{item.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div
                      ref={qrRef}
                      className="flex justify-center p-4 bg-background rounded-lg border"
                    >
                      <QRCodeSVG
                        id={`qr-${item.id}`}
                        value={item.content}
                        size={Math.min(item.size, 200)}
                        level={"H"}
                        includeMargin={true}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center truncate">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
