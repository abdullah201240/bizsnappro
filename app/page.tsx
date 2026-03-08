import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Receipt,
  FileSignature,
  Link as LinkIcon,
  QrCode,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    title: "Invoice Generator",
    description: "Create professional invoices in minutes. Add company details, client info, line items, and generate downloadable PDFs.",
    icon: FileText,
    href: "/invoices",
    color: "bg-blue-500",
  },
  {
    title: "Expense Tracker",
    description: "Track your business expenses easily. Add, view, and generate expense reports for tax purposes.",
    icon: Receipt,
    href: "/expenses",
    color: "bg-green-500",
  },
  {
    title: "Contract Templates",
    description: "Use ready-made contract templates. Fill in your details and download professional contracts.",
    icon: FileSignature,
    href: "/contracts",
    color: "bg-purple-500",
  },
  {
    title: "Payment Links",
    description: "Generate payment links for PayPal, bank transfers, or other payment gateways. Share with clients instantly.",
    icon: LinkIcon,
    href: "/payments",
    color: "bg-orange-500",
  },
  {
    title: "QR Code Invoices",
    description: "Create QR codes for invoices. Clients can scan to view payment details or make payments.",
    icon: QrCode,
    href: "/qrcode",
    color: "bg-pink-500",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>All-in-one business tools</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Run Your Business with{" "}
              <span className="text-primary">BizSnapPro</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              The complete toolkit for freelancers and small businesses. 
              Create invoices, track expenses, generate contracts, and more — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/invoices">
                <Button size="lg">
                  Create Invoice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need
            </h2>
            <p className="mt-4 text-muted-foreground">
              Powerful tools to manage your business efficiently
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.href} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={feature.href} className="w-full">
                      <Button variant="secondary" className="w-full">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to streamline your business?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Start using BizSnapPro today. No signup required — everything is stored locally on your device.
            </p>
            <div className="mt-8">
              <Link href="/invoices">
                <Button size="lg">
                  Create Your First Invoice
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
