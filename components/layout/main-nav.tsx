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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Glassmorphism Navbar - Transparent by default, solid on scroll */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
          scrolled 
            ? 'bg-[#05050a]/80 backdrop-blur-xl border-b border-white/10 shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-16 md:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 no-underline">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_200%] flex items-center justify-center relative overflow-hidden shadow-lg shadow-indigo-500/30">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="font-syne text-sm md:text-base font-extrabold text-white leading-none tracking-tight">BizSnapPro</span>
              <span className="text-[8px] md:text-[9px] font-semibold text-white/40 tracking-[0.15em] uppercase mt-0.5">Business Tools</span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile, visible on lg screens */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 bg-white/[0.03] border border-white/6 rounded-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium no-underline transition-all duration-200 ${
                    isActive 
                      ? 'text-white bg-indigo-500/20 border border-indigo-500/30' 
                      : 'text-gray-400 hover:text-gray-100 hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Desktop Login - Hidden on mobile */}
            <Link 
              href="/auth/login" 
              className="hidden md:flex items-center gap-2 px-4 h-10 md:h-11 rounded-full bg-white/5 border border-white/10 text-white text-xs md:text-sm font-medium no-underline transition-all duration-200 hover:bg-white/10"
            >
              Log In
            </Link>

            {/* Desktop CTA - Hidden on mobile */}
            <Link 
              href="/auth/signup" 
              className="hidden md:flex items-center gap-2 px-5 h-10 md:h-11 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_200%] text-white text-xs md:text-sm font-medium no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </Link>

            {/* Mobile Menu Button - Visible on mobile, hidden on lg */}
            <button
              className="flex lg:hidden w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center cursor-pointer text-white transition-all duration-200 hover:bg-white/[0.1]"
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
        className={`fixed inset-0 bg-[#05050a]/95 backdrop-blur-xl z-[100] transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className="fixed top-0 right-0 bottom-0 w-full sm:w-[360px] bg-[#0a0a12] border-l border-white/6 z-[101] p-4 md:p-6 transition-transform duration-300 flex flex-col"
          style={{ transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-syne text-lg font-extrabold text-white">BizSnapPro</span>
            </div>
            <button
              className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center cursor-pointer text-white transition-all duration-200 hover:bg-white/[0.1]"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium no-underline transition-all duration-200 ${
                    isActive 
                      ? 'text-white bg-indigo-500/15 border border-indigo-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile CTA */}
          <div className="mt-4 pt-4 border-t border-white/6 space-y-3">
            <Link
              href="/auth/login"
              className="flex items-center justify-center gap-2 w-full px-6 h-12 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium no-underline transition-all duration-200"
            >
              Log In
            </Link>
            <Link
              href="/auth/signup"
              className="flex items-center justify-center gap-2 w-full px-6 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white text-sm font-medium no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
