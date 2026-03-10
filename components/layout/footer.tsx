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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .footer-root {
          font-family: 'DM Sans', sans-serif;
          background: #05050a;
          border-top: 1px solid rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
        }

        /* Background effects */
        .footer-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent);
        }
        .footer-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(99,102,241,0.08), transparent 70%);
          pointer-events: none;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 24px 40px;
          position: relative;
          z-index: 1;
        }

        /* Top Section */
        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        /* Brand Column */
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .footer-logo-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          animation: footer-gradient 4s ease infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(99,102,241,0.4);
        }
        .footer-logo-icon::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
        }
        @keyframes footer-gradient {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .footer-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .footer-tagline {
          font-size: 15px;
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          max-width: 280px;
        }
        .footer-social {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }
        .footer-social-link {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.6);
          transition: all 0.2s ease;
        }
        .footer-social-link:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.15);
          color: #fff;
          transform: translateY(-2px);
        }

        /* Link Columns */
        .footer-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-column-title {
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-link {
          font-size: 14px;
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: all 0.2s ease;
          width: fit-content;
        }
        .footer-link:hover {
          color: #fff;
          transform: translateX(4px);
        }

        /* Trust Badge */
        .footer-trust {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 20px 24px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          margin-bottom: 40px;
        }
        .footer-trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
        }
        .footer-trust-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Bottom Section */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .footer-copyright {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .footer-copyright-heart {
          color: #ec4899;
          animation: footer-pulse 1.5s ease-in-out infinite;
        }
        @keyframes footer-pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .footer-local-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          color: #34d399;
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
          .footer-trust {
            flex-wrap: wrap;
            gap: 16px;
          }
        }

        @media (max-width: 640px) {
          .footer-container { padding: 60px 20px 32px; }
          .footer-top {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-grid" />
        <div className="footer-glow" />

        <div className="footer-container">
          {/* Trust Badge */}
          <div className="footer-trust">
            <div className="footer-trust-item">
              <div className="footer-trust-icon">
                <Lock style={{ width: 16, height: 16, color: "#818cf8" }} />
              </div>
              <span>Your data never leaves your device</span>
            </div>
            <div className="footer-trust-item">
              <div className="footer-trust-icon">
                <Shield style={{ width: 16, height: 16, color: "#34d399" }} />
              </div>
              <span>100% free, no credit card required</span>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="footer-top">
            {/* Brand */}
            <div className="footer-brand">
              <Link href="/" className="footer-logo">
                <div className="footer-logo-icon">
                  <Zap style={{ width: 22, height: 22, color: "#fff" }} />
                </div>
                <span className="footer-logo-text">BizSnapPro</span>
              </Link>
              <p className="footer-tagline">
                All-in-one business toolkit for freelancers and small businesses. 
                Create invoices, track expenses, and manage contracts — all for free.
              </p>
              <div className="footer-social">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="footer-social-link"
                      aria-label={social.label}
                    >
                      <Icon style={{ width: 18, height: 18 }} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Product Links */}
            <div className="footer-column">
              <h4 className="footer-column-title">Product</h4>
              <div className="footer-links">
                {footerLinks.product.map((link) => (
                  <Link key={link.label} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div className="footer-column">
              <h4 className="footer-column-title">Company</h4>
              <div className="footer-links">
                {footerLinks.company.map((link) => (
                  <Link key={link.label} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="footer-column">
              <h4 className="footer-column-title">Legal</h4>
              <div className="footer-links">
                {footerLinks.legal.map((link) => (
                  <Link key={link.label} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} BizSnapPro. Made with
              <Heart className="footer-copyright-heart" style={{ width: 14, height: 14, fill: "currentColor" }} />
              for freelancers
            </p>
            <div className="footer-local-badge">
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px #34d399" }} />
              All data stored locally
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
