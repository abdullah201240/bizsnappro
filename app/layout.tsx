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
  description: "A collection of small business tools - Invoices, Expenses, Contracts, Payment Links, QR Codes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <MainNav />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t py-8 bg-muted/30">
          <div className="container">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} BizSnapPro. All rights reserved.</p>
              <p className="text-xs sm:text-sm">
                All data is stored locally on your device
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
