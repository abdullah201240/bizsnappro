"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FileText,
  Receipt,
  FileSignature,
  Link as LinkIcon,
  QrCode,
  Home,
  Menu,
  X,
  Zap,
  ArrowRight,
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
   const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 return (
    <>
      <header className={`relative top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${scrolled ? 'bg-[#05050a]/85 backdrop-blur-[20px] border-b border-white/10' : ''}`}>
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-[nav-gradient_4s_ease_infinite] flex items-center justify-center relative overflow-hidden shadow-[0_4px_20px_rgba(99,102,241,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.2] to-transparent" />
              <Zap className="w-5 h-5 text-white relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-syne text-base font-extrabold text-white leading-none tracking-tight">BizSnapPro</span>
              <span className="text-[9px] font-semibold text-white/40 tracking-[0.15em] uppercase mt-0.5">Business Tools</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-1 p-1.5 bg-white/[0.03] border border-white/6 rounded-full">
            {navItems.map((item) => {
             const Icon = item.icon;
             const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-[18px] py-2.5 rounded-full text-sm font-medium text-gray-400 no-underline transition-all duration-200 hover:text-gray-100 hover:bg-white/[0.05] relative ${isActive ? 'text-white bg-indigo-500/20 border border-indigo-500/30' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/invoices" className="flex items-center gap-2 px-6 h-11 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-[nav-gradient_4s_ease_infinite] text-white text-sm font-medium no-underline relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.5)] shadow-[0_4px_20px_rgba(99,102,241,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.2] to-transparent" />
              Get Started
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 hover:translate-x-1" />
            </Link>

            <button
              className="hidden w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center cursor-pointer text-white transition-all duration-200 hover:bg-white/[0.1] md:flex"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#05050a]/95 backdrop-blur-[20px] z-[100] transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className="fixed top-0 right-0 bottom-0 w-full max-w-[360px] bg-[#0a0a12] border-l border-white/6 z-[101] p-6 transition-transform duration-300"
          style={{ transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-[nav-gradient_4s_ease_infinite] flex items-center justify-center relative overflow-hidden shadow-[0_4px_20px_rgba(99,102,241,0.4)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.2] to-transparent" />
                <Zap className="w-[18px] h-[18px] text-white relative z-10" />
              </div>
              <span className="font-syne text-lg font-extrabold text-white">BizSnapPro</span>
            </div>
            <button
              className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center cursor-pointer text-white transition-all duration-200 hover:bg-white/[0.1]"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
             const Icon = item.icon;
             const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3.5 p-4 rounded-xl text-base font-medium text-gray-400 no-underline transition-all duration-200 hover:bg-white/[0.05] hover:text-white ${isActive ? 'bg-indigo-500/15 border border-indigo-500/30 text-white' : ''}`}
                >
                  <span className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center">
                    <Icon className="w-[18px] h-[18px]" />
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-white/6">
            <Link
              href="/invoices"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-6 h-11 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-[nav-gradient_4s_ease_infinite] text-white text-sm font-medium no-underline relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.5)] shadow-[0_4px_20px_rgba(99,102,241,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.2] to-transparent" />
              Get Started Free
              <ArrowRight className="w-4 h-4 relative z-10" />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes nav-gradient {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  );
}
