"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, Shield, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // stagger-in on mount
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        /* ─── Reset & root ─── */
        .hero-root {
          font-family: 'DM Sans', sans-serif;
          background: #05050a;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 24px 60px;
        }

        /* ─── Deep space background ─── */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        /* Grid */
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 85% 70% at 50% 40%, black 40%, transparent 100%);
        }

        /* Orbs */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }
        .hero-orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.28), transparent 70%);
          top: -180px; left: 50%;
          transform: translateX(-50%);
          animation: orb-breathe 10s ease-in-out infinite alternate;
        }
        .hero-orb-2 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(236,72,153,0.22), transparent 70%);
          bottom: -60px; left: -100px;
          animation: orb-drift-l 14s ease-in-out infinite alternate;
        }
        .hero-orb-3 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(245,158,11,0.18), transparent 70%);
          bottom: 0; right: -80px;
          animation: orb-drift-r 12s ease-in-out infinite alternate;
        }
        @keyframes orb-breathe {
          from { opacity: 0.7; transform: translateX(-50%) scale(1); }
          to   { opacity: 1;   transform: translateX(-50%) scale(1.15); }
        }
        @keyframes orb-drift-l {
          from { transform: translate(0, 0); }
          to   { transform: translate(50px, -60px); }
        }
        @keyframes orb-drift-r {
          from { transform: translate(0, 0); }
          to   { transform: translate(-40px, -50px); }
        }

        /* Noise */
        .hero-noise {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px;
        }

        /* Mouse spotlight */
        .hero-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          transition: background 0.08s linear;
        }

        /* ─── Floating particles ─── */
        .hero-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }
        .hparticle {
          position: absolute;
          border-radius: 50%;
          background: white;
          opacity: 0;
          animation: hpart-float var(--dur) ease-in var(--delay) infinite;
          width: var(--sz); height: var(--sz);
          left: var(--lx);
          bottom: -8px;
        }
        @keyframes hpart-float {
          0%   { opacity: 0;   transform: translateY(0) scale(0); }
          8%   { opacity: 0.5; transform: translateY(-15px) scale(1); }
          90%  { opacity: 0.15; }
          100% { opacity: 0;   transform: translateY(-420px) scale(0.2); }
        }

        /* ─── Horizontal scan line ─── */
        .hero-scanline {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(236,72,153,0.4), transparent);
          top: 0;
          animation: scan-down 8s linear infinite;
          pointer-events: none;
          z-index: 2;
        }
        @keyframes scan-down {
          0%   { top: 0%;    opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.3; }
          100% { top: 100%;  opacity: 0; }
        }

        /* ─── Content ─── */
        .hero-content {
          position: relative;
          z-index: 3;
          text-align: center;
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
        }

        /* Badge */
        .hero-badge {
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
          margin-bottom: 36px;
          backdrop-filter: blur(10px);

          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.55s ease 0.05s, transform 0.55s ease 0.05s;
        }
        .hero-badge.in { opacity: 1; transform: translateY(0); }
        .badge-pulse {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #818cf8;
          box-shadow: 0 0 10px #818cf8;
          animation: badge-blink 2s ease-in-out infinite;
        }
        @keyframes badge-blink {
          0%,100% { opacity: 1; box-shadow: 0 0 10px #818cf8; }
          50%      { opacity: 0.3; box-shadow: none; }
        }

        /* Eyebrow line */
        .hero-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.55s ease 0.18s, transform 0.55s ease 0.18s;
        }
        .hero-eyebrow.in { opacity: 1; transform: translateY(0); }
        .eyebrow-line {
          height: 1px;
          width: 40px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.6));
        }
        .eyebrow-line.right {
          background: linear-gradient(90deg, rgba(99,102,241,0.6), transparent);
        }
        .eyebrow-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(165,180,252,0.7);
        }

        /* Main heading */
        .hero-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(44px, 7vw, 86px);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0 0 28px;

          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s ease 0.3s, transform 0.65s ease 0.3s;
        }
        .hero-h1.in { opacity: 1; transform: translateY(0); }
        .hero-h1 .line2 {
          display: block;
          background: linear-gradient(130deg, #818cf8 0%, #c084fc 35%, #f472b6 65%, #fb923c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: grad-shift 6s ease infinite;
        }
        @keyframes grad-shift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        /* Sub paragraph */
        .hero-sub {
          font-size: clamp(16px, 2vw, 19px);
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          line-height: 1.75;
          max-width: 560px;
          margin: 0 auto 44px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s;
        }
        .hero-sub.in { opacity: 1; transform: translateY(0); }
        .hero-sub strong {
          color: rgba(255,255,255,0.75);
          font-weight: 500;
        }

        /* Buttons */
        .hero-buttons {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 52px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.58s, transform 0.6s ease 0.58s;
        }
        .hero-buttons.in { opacity: 1; transform: translateY(0); }

        .hbtn-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          height: 54px;
          padding: 0 34px;
          border-radius: 999px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          animation: grad-shift 5s ease infinite;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          border: none;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 0 35px rgba(99,102,241,0.45), 0 4px 20px rgba(0,0,0,0.5);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hbtn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18), transparent 60%);
          border-radius: inherit;
        }
        .hbtn-primary:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 0 60px rgba(99,102,241,0.65), 0 8px 30px rgba(0,0,0,0.4);
        }
        .hbtn-primary:active { transform: scale(0.97); }

        .hbtn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          height: 54px;
          padding: 0 34px;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.75);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 400;
          text-decoration: none;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
        }
        .hbtn-secondary:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.28);
          color: #fff;
          transform: translateY(-2px);
        }
        .btn-icon {
          display: inline-flex;
          transition: transform 0.2s ease;
        }
        .hbtn-primary:hover .btn-icon,
        .hbtn-secondary:hover .btn-icon { transform: translateX(5px); }

        /* ─── Trust badges ─── */
        .hero-trust {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 10px 28px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease 0.72s, transform 0.6s ease 0.72s;
        }
        .hero-trust.in { opacity: 1; transform: translateY(0); }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          color: rgba(255,255,255,0.38);
          font-weight: 400;
          letter-spacing: 0.02em;
        }
        .trust-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px; height: 24px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
        }
        .trust-sep {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
        }

        /* ─── Floating cards (social proof) ─── */
        .hero-float-cards {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }
        .fcard {
          position: absolute;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          font-weight: 400;
          white-space: nowrap;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        }
        .fcard-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .fcard-1 {
          top: 18%;
          left: 4%;
          animation: float-card-l 8s ease-in-out infinite alternate;
          opacity: 0;
          transition: opacity 0.8s ease 1.1s;
        }
        .fcard-2 {
          top: 30%;
          right: 4%;
          animation: float-card-r 9s ease-in-out infinite alternate;
          opacity: 0;
          transition: opacity 0.8s ease 1.3s;
        }
        .fcard-3 {
          bottom: 22%;
          left: 6%;
          animation: float-card-l 11s ease-in-out infinite alternate;
          opacity: 0;
          transition: opacity 0.8s ease 1.5s;
        }
        .fcard-1.in, .fcard-2.in, .fcard-3.in { opacity: 1; }
        @keyframes float-card-l {
          from { transform: translateY(0px) rotate(-1deg); }
          to   { transform: translateY(-18px) rotate(1deg); }
        }
        @keyframes float-card-r {
          from { transform: translateY(0px) rotate(1deg); }
          to   { transform: translateY(-22px) rotate(-1deg); }
        }

        @media (max-width: 768px) {
          .hero-root { padding: 100px 20px 80px; }
          .fcard { display: none; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="hero-root"
        onMouseMove={handleMouseMove}
      >
        {/* ── Background layer ── */}
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <div className="hero-noise" />
          <div className="hero-scanline" />
        </div>

        {/* Spotlight */}
        <div
          className="hero-spotlight"
          style={{
            background: `radial-gradient(700px circle at ${mousePos.x}% ${mousePos.y}%, rgba(99,102,241,0.1), transparent 55%)`,
          }}
        />

        {/* Particles */}
        <div className="hero-particles">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="hparticle"
              style={{
                "--lx": `${3 + i * 5.5}%`,
                "--sz": `${1.5 + (i % 3) * 0.8}px`,
                "--dur": `${6 + (i % 6)}s`,
                "--delay": `${i * 0.55}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Floating cards */}
        <div className="hero-float-cards">
          <div className={`fcard fcard-1 ${mounted ? "in" : ""}`}>
            <div className="fcard-dot" style={{ background: "#34d399", boxShadow: "0 0 8px #34d399" }} />
            <span>Invoice #1042 — Paid ✓</span>
          </div>
          <div className={`fcard fcard-2 ${mounted ? "in" : ""}`}>
            <div className="fcard-dot" style={{ background: "#818cf8", boxShadow: "0 0 8px #818cf8" }} />
            <span>Contract signed · 2 min ago</span>
          </div>
          <div className={`fcard fcard-3 ${mounted ? "in" : ""}`}>
            <div className="fcard-dot" style={{ background: "#fb923c", boxShadow: "0 0 8px #fb923c" }} />
            <span>$3,200 tracked this week</span>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="hero-content">
          

          {/* Eyebrow */}
          <div className={`hero-eyebrow ${mounted ? "in" : ""}`}>
            <span className="eyebrow-line" />
            <span className="eyebrow-text">All-in-one business toolkit</span>
            <span className="eyebrow-line right" />
          </div>

          {/* Headline */}
          <h1 className={`hero-h1 ${mounted ? "in" : ""}`}>
            Run your business
            <span className="line2">like a pro.</span>
          </h1>

          {/* Sub */}
          <p className={`hero-sub ${mounted ? "in" : ""}`}>
            Create <strong>invoices</strong>, track <strong>expenses</strong>, and manage{" "}
            <strong>contracts</strong> — all in one place. Built for freelancers
            who mean business.
          </p>

          {/* Buttons */}
          <div className={`hero-buttons ${mounted ? "in" : ""}`}>
            <Link href="/invoices" className="hbtn-primary">
              <Zap style={{ width: 16, height: 16 }} />
              Start Creating
              <span className="btn-icon">
                <ArrowRight style={{ width: 16, height: 16 }} />
              </span>
            </Link>
            <Link href="/expenses" className="hbtn-secondary">
              Explore Tools
              <span className="btn-icon">
                <ArrowRight style={{ width: 16, height: 16 }} />
              </span>
            </Link>
          </div>

          {/* Trust */}
          <div className={`hero-trust ${mounted ? "in" : ""}`}>
            <div className="trust-item">
              <div className="trust-icon-wrap">
                <CheckCircle2 style={{ width: 13, height: 13, color: "#34d399" }} />
              </div>
              100% Free
            </div>
            <div className="trust-sep" />
            <div className="trust-item">
              <div className="trust-icon-wrap">
                <Shield style={{ width: 13, height: 13, color: "#818cf8" }} />
              </div>
              Private &amp; Secure
            </div>
            <div className="trust-sep" />
            <div className="trust-item">
              <div className="trust-icon-wrap">
                <Zap style={{ width: 13, height: 13, color: "#fb923c" }} />
              </div>
              Instant Setup
            </div>
          </div>
        </div>
      </section>
    </>
  );
}