import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/layout/main-nav";
import { Footer } from "@/components/layout/footer";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#05050a]`}
      >
        <MainNav />
        <main className="flex-1 w-full mx-auto pt-[72px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
