"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .nav-root {
          font-family: 'DM Sans', sans-serif;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          transition: all 0.3s ease;
        }
        .nav-root.scrolled {
          background: rgba(5,5,10,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .nav-logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          animation: nav-gradient 4s ease infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(99,102,241,0.4);
        }
        .nav-logo-icon::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
        }
        .nav-logo-text {
          display: flex;
          flex-direction: column;
        }
        .nav-logo-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .nav-logo-subtitle {
          font-size: 9px;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-top: 2px;
        }
        @keyframes nav-gradient {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Desktop Nav */
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 999px;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
        }
        .nav-link:hover {
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.05);
        }
        .nav-link.active {
          color: #fff;
          background: rgba(99,102,241,0.2);
          border: 1px solid rgba(99,102,241,0.3);
        }
        .nav-link.active::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(99,102,241,0.5), rgba(139,92,246,0.3));
          z-index: -1;
          opacity: 0.5;
        }

        /* CTA Button */
        .nav-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 24px;
          height: 44px;
          border-radius: 999px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          animation: nav-gradient 4s ease infinite;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.2s ease;
          box-shadow: 0 4px 20px rgba(99,102,241,0.4);
        }
        .nav-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
        }
        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(99,102,241,0.5);
        }
        .nav-cta-arrow {
          transition: transform 0.2s ease;
        }
        .nav-cta:hover .nav-cta-arrow {
          transform: translateX(4px);
        }

        /* Mobile Menu Button */
        .nav-mobile-btn {
          display: none;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          transition: all 0.2s ease;
        }
        .nav-mobile-btn:hover {
          background: rgba(255,255,255,0.1);
        }

        /* Mobile Menu */
        .nav-mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(5,5,10,0.95);
          backdrop-filter: blur(20px);
          z-index: 100;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        .nav-mobile-overlay.open {
          opacity: 1;
          visibility: visible;
        }
        .nav-mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 360px;
          background: #0a0a12;
          border-left: 1px solid rgba(255,255,255,0.06);
          z-index: 101;
          padding: 24px;
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }
        .nav-mobile-overlay.open .nav-mobile-menu {
          transform: translateX(0);
        }
        .nav-mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nav-mobile-close {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          transition: all 0.2s ease;
        }
        .nav-mobile-close:hover {
          background: rgba(255,255,255,0.1);
        }
        .nav-mobile-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .nav-mobile-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .nav-mobile-link:hover {
          background: rgba(255,255,255,0.05);
          color: #fff;
        }
        .nav-mobile-link.active {
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          color: #fff;
        }
        .nav-mobile-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-mobile-link.active .nav-mobile-icon {
          background: rgba(99,102,241,0.2);
          color: #818cf8;
        }
        .nav-mobile-cta {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        @media (max-width: 900px) {
          .nav-desktop { display: none; }
          .nav-cta { display: none; }
          .nav-mobile-btn { display: flex; }
        }
      `}</style>

      <header className={cn("nav-root", scrolled && "scrolled")}>
        <div className="nav-container">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <div className="nav-logo-icon">
              <Zap style={{ width: 20, height: 20, color: "#fff" }} />
            </div>
            <div className="nav-logo-text">
              <span className="nav-logo-title">BizSnapPro</span>
              <span className="nav-logo-subtitle">Business Tools</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("nav-link", isActive && "active")}
                >
                  <Icon style={{ width: 16, height: 16 }} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/invoices" className="nav-cta">
              Get Started
              <ArrowRight className="nav-cta-arrow" style={{ width: 16, height: 16 }} />
            </Link>

            <button
              className="nav-mobile-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu style={{ width: 20, height: 20 }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn("nav-mobile-overlay", mobileMenuOpen && "open")}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="nav-mobile-menu" onClick={(e) => e.stopPropagation()}>
          <div className="nav-mobile-header">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div className="nav-logo-icon" style={{ width: 36, height: 36 }}>
                <Zap style={{ width: 18, height: 18, color: "#fff" }} />
              </div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#fff" }}>
                BizSnapPro
              </span>
            </div>
            <button
              className="nav-mobile-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X style={{ width: 20, height: 20 }} />
            </button>
          </div>

          <nav className="nav-mobile-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn("nav-mobile-link", isActive && "active")}
                >
                  <span className="nav-mobile-icon">
                    <Icon style={{ width: 18, height: 18 }} />
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="nav-mobile-cta">
            <Link
              href="/invoices"
              onClick={() => setMobileMenuOpen(false)}
              className="nav-cta"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Get Started Free
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
