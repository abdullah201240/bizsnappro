"use client";

import Link from "next/link";
import { Zap, Github, Twitter, Heart, Shield, Lock } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Invoices", href: "/invoices" },
    { label: "Expenses", href: "/expenses" },
    { label: "Contracts", href: "/contracts" },
    { label: "Payments", href: "/payments" },
    { label: "QR Codes", href: "/qrcode" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
 return (
    <footer className="relative bg-[#05050a] border-t border-white/10 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.08),transparent_70%)] pointer-events-none" />

      <div className="mx-auto  relative z-10 p-8">
        {/* Trust Badge */}
        <div className="flex items-center gap-6 p-5 bg-white/[0.02] border border-white/10 rounded-2xl mb-10 flex-wrap">
          <div className="flex items-center gap-2.5 text-gray-300 text-sm">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
              <Lock className="w-4 h-4" style={{ color: "#818cf8" }} />
            </div>
            <span>Your data never leaves your device</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-300 text-sm">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
              <Shield className="w-4 h-4" style={{ color: "#34d399" }} />
            </div>
            <span>100% free, no credit card required</span>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 no-underline">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-[footer-gradient_4s_ease_infinite] flex items-center justify-center relative overflow-hidden shadow-[0_4px_20px_rgba(99,102,241,0.4)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.2] to-transparent" />
                <Zap className="w-5 h-5 text-white relative z-10" />
              </div>
              <span className="font-syne text-xl font-extrabold text-white tracking-tight">BizSnapPro</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              All-in-one business toolkit for freelancers and small businesses. 
              Create invoices, track expenses, and manage contracts — all for free.
            </p>
            <div className="flex gap-3 mt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/[0.1] hover:border-white/20 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-white tracking-widest uppercase">Product</h4>
            <div className="flex flex-col gap-3">
              {footerLinks.product.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-400 no-underline hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-white tracking-widest uppercase">Company</h4>
            <div className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-400 no-underline hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-white tracking-widest uppercase">Legal</h4>
            <div className="flex flex-col gap-3">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-400 no-underline hover:text-white hover:translate-x-1 transition-all duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between pt-8 border-t border-white/10 flex-col md:flex-row gap-4">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            © {new Date().getFullYear()} BizSnapPro. Made with
            <Heart className="w-3.5 h-3.5 text-pink-500 animate-[footer-pulse_1.5s_ease-in-out_infinite] fill-current" />
            for freelancers
          </p>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/[0.1] border border-emerald-500/20 rounded-full text-xs font-medium text-emerald-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            All data stored locally
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes footer-gradient {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes footer-pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </footer>
  );
}
