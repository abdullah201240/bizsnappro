"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Receipt,
  FileSignature,
  Link as LinkIcon,
  QrCode,
  Home,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/expenses", label: "Expenses", icon: Receipt },
  { href: "/contracts", label: "Contracts", icon: FileSignature },
  { href: "/payments", label: "Payments", icon: LinkIcon },
  { href: "/qrcode", label: "QR Codes", icon: QrCode },
];

export function MainNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg shadow-slate-900/20 group-hover:shadow-slate-900/30 transition-shadow">
            <Sparkles className="h-4 w-4 text-white" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-lg font-bold tracking-tight text-foreground">BizSnapPro</span>
            <span className="text-[10px] text-muted-foreground -mt-1 tracking-wide">BUSINESS TOOLS</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-0.5 bg-muted/50 rounded-full p-1 border border-border/50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  isActive 
                    ? "bg-white text-foreground shadow-sm border border-border/50" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", isActive && "text-brand-600")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <Link href="/invoices">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Get Started
            </Button>
          </Link>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden h-9 w-9 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl animate-slide-up">
          <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all",
                    isActive 
                      ? "bg-slate-900 text-white shadow-md" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive && "text-blue-400")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
