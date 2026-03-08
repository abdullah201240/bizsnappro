import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/layout/main-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BizSnapPro - Business Tools for Freelancers",
  description: "All-in-one business toolkit for freelancers and small businesses. Create invoices, track expenses, generate contracts, and more—all for free.",
  keywords: ["invoices", "expenses", "contracts", "freelancer tools", "small business", "QR codes", "payment links"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background`}
      >
        <MainNav />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6">
          {children}
        </main>
        <footer className="border-t border-border/50 py-10 bg-white mt-auto">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="font-semibold text-foreground">BizSnapPro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} BizSnapPro. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
                All data stored locally on your device
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
