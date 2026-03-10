"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Zap, FileText, Receipt, FileSignature, Link as LinkIcon, QrCode } from "lucide-react";

const features = [
  {
    title: "Invoices",
    description: "Create professional invoices with custom details and line items",
    icon: FileText,
    href: "/invoices",
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    glowColor: "rgba(99,102,241,0.4)",
  },
  {
    title: "Expenses",
    description: "Track business expenses and generate reports for tax season",
    icon: Receipt,
    href: "/expenses",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    glowColor: "rgba(16,185,129,0.4)",
  },
  {
    title: "Contracts",
    description: "Generate professional contract templates in minutes",
    icon: FileSignature,
    href: "/contracts",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    glowColor: "rgba(139,92,246,0.4)",
  },
  {
    title: "Payments",
    description: "Create payment links for PayPal, Stripe, Venmo and more",
    icon: LinkIcon,
    href: "/payments",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    glowColor: "rgba(245,158,11,0.4)",
  },
  {
    title: "QR Codes",
    description: "Generate QR codes for invoices and instant payments",
    icon: QrCode,
    href: "/qrcode",
    gradient: "from-rose-500 via-pink-500 to-purple-500",
    glowColor: "rgba(244,63,94,0.4)",
  },
];

export function FeaturesGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .fg-root {
          font-family: 'DM Sans', sans-serif;
          padding: 100px 24px;
          background: #05050a;
          position: relative;
          overflow: hidden;
        }

        /* Background grid */
        .fg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
        }

        /* Floating orbs */
        .fg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .fg-orb-1 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%);
          top: -100px; left: 10%;
          animation: fg-float 12s ease-in-out infinite alternate;
        }
        .fg-orb-2 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(236,72,153,0.12), transparent 70%);
          bottom: -80px; right: 10%;
          animation: fg-float 14s ease-in-out infinite alternate-reverse;
        }
        @keyframes fg-float {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(30px, -30px) scale(1.1); }
        }

        /* Container */
        .fg-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .fg-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .fg-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 18px;
          border-radius: 999px;
          border: 1px solid rgba(99,102,241,0.35);
          background: rgba(99,102,241,0.1);
          color: #a5b4fc;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          margin-bottom: 24px;
          backdrop-filter: blur(10px);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fg-badge.in { opacity: 1; transform: translateY(0); }
        .fg-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #818cf8;
          box-shadow: 0 0 8px #818cf8;
          animation: fg-pulse 2s ease-in-out infinite;
        }
        @keyframes fg-pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .fg-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.1;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
        }
        .fg-title.in { opacity: 1; transform: translateY(0); }
        .fg-title span {
          background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .fg-subtitle {
          font-size: 17px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
        }
        .fg-subtitle.in { opacity: 1; transform: translateY(0); }

        /* Grid */
        .fg-grid-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        /* Card */
        .fg-card {
          position: relative;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 28px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.3s ease;
          overflow: hidden;
          opacity: 0;
          transform: translateY(24px);
        }
        .fg-card.in { opacity: 1; transform: translateY(0); }
        .fg-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), var(--glow, rgba(99,102,241,0.15)), transparent 40%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .fg-card:hover::before {
          opacity: 1;
        }
        .fg-card:hover {
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-4px);
        }

        .fg-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, var(--grad-from), var(--grad-to));
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          box-shadow: 0 8px 32px var(--glow);
        }
        .fg-icon {
          color: #fff;
        }
        .fg-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          position: relative;
          z-index: 1;
        }
        .fg-card-desc {
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
          margin: 0;
          position: relative;
          z-index: 1;
          flex-grow: 1;
        }
        .fg-card-action {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          position: relative;
          z-index: 1;
          margin-top: 8px;
          transition: color 0.2s ease;
        }
        .fg-card:hover .fg-card-action {
          color: #fff;
        }
        .fg-card-arrow {
          transition: transform 0.2s ease;
        }
        .fg-card:hover .fg-card-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 640px) {
          .fg-root { padding: 80px 20px; }
          .fg-grid-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      <section ref={sectionRef} className="fg-root">
        <div className="fg-grid" />
        <div className="fg-orb fg-orb-1" />
        <div className="fg-orb fg-orb-2" />

        <div className="fg-container">
          <div className="fg-header">
            <div className={`fg-badge ${isVisible ? 'in' : ''}`}>
              <span className="fg-badge-dot" />
              <Zap style={{ width: 14, height: 14 }} />
              Powerful Tools
            </div>
            <h2 className={`fg-title ${isVisible ? 'in' : ''}`}>
              Everything you need to <span>succeed</span>
            </h2>
            <p className={`fg-subtitle ${isVisible ? 'in' : ''}`}>
              Professional-grade tools designed to help you manage your business efficiently
            </p>
          </div>

          <div className="fg-grid-cards">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
              
              const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({
                  x: ((e.clientX - rect.left) / rect.width) * 100,
                  y: ((e.clientY - rect.top) / rect.height) * 100,
                });
              };

              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className={`fg-card ${isVisible ? 'in' : ''}`}
                  style={{
                    '--glow': feature.glowColor,
                    '--grad-from': feature.gradient.split(' ')[1],
                    '--grad-to': feature.gradient.split(' ')[3],
                    '--mx': `${mousePos.x}%`,
                    '--my': `${mousePos.y}%`,
                    transitionDelay: `${0.1 + i * 0.08}s`,
                  } as React.CSSProperties}
                  onMouseMove={handleMouseMove}
                >
                  <div className="fg-icon-wrap">
                    <Icon className="fg-icon" style={{ width: 24, height: 24 }} />
                  </div>
                  <h3 className="fg-card-title">{feature.title}</h3>
                  <p className="fg-card-desc">{feature.description}</p>
                  <div className="fg-card-action">
                    Get Started
                    <ArrowRight className="fg-card-arrow" style={{ width: 14, height: 14 }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
