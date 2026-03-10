"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Zap, CheckCircle2, Shield, Lock } from "lucide-react";

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .cta-root {
          font-family: 'DM Sans', sans-serif;
          padding: 100px 24px;
          background: #05050a;
          position: relative;
          overflow: hidden;
        }

        /* Background grid */
        .cta-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
        }

        .cta-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Card wrapper with glow */
        .cta-card-wrap {
          position: relative;
        }

        /* Animated gradient border */
        .cta-glow-ring {
          position: absolute;
          inset: -2px;
          border-radius: 32px;
          background: conic-gradient(
            from 0deg,
            #6366f1, #8b5cf6, #ec4899, #f59e0b, #10b981, #6366f1
          );
          animation: cta-spin 8s linear infinite;
          z-index: 0;
          opacity: 0.8;
        }
        .cta-glow-ring::before {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 30px;
          background: #05050a;
          z-index: 1;
        }
        @keyframes cta-spin {
          to { transform: rotate(360deg); }
        }

        /* Card */
        .cta-card {
          position: relative;
          z-index: 2;
          border-radius: 30px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
          padding: 72px 56px;
          text-align: center;
        }

        /* Mouse spotlight */
        .cta-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          transition: background 0.15s ease;
          border-radius: 30px;
        }

        /* Grid lines */
        .cta-grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
        }

        /* Floating orbs */
        .cta-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .cta-orb-1 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%);
          top: -150px; right: -100px;
          animation: cta-drift1 12s ease-in-out infinite alternate;
        }
        .cta-orb-2 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(236,72,153,0.15), transparent 70%);
          bottom: -120px; left: -80px;
          animation: cta-drift2 10s ease-in-out infinite alternate;
        }
        .cta-orb-3 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(245,158,11,0.12), transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: cta-pulse 6s ease-in-out infinite;
        }
        @keyframes cta-drift1 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-50px, 40px) scale(1.1); }
        }
        @keyframes cta-drift2 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(40px, -50px) scale(1.15); }
        }
        @keyframes cta-pulse {
          0%, 100% { opacity: 0.3; transform: translate(-50%,-50%) scale(0.9); }
          50% { opacity: 0.5; transform: translate(-50%,-50%) scale(1.2); }
        }

        /* Noise overlay */
        .cta-noise {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.025;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px;
          border-radius: 30px;
        }

        /* Content */
        .cta-content {
          position: relative;
          z-index: 2;
        }

        /* Badge */
        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid rgba(99,102,241,0.35);
          background: rgba(99,102,241,0.1);
          color: #a5b4fc;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.03em;
          margin-bottom: 32px;
          backdrop-filter: blur(8px);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .cta-badge.in { opacity: 1; transform: translateY(0); }
        .cta-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #6366f1;
          box-shadow: 0 0 8px #6366f1;
          animation: cta-blink 2s ease-in-out infinite;
        }
        @keyframes cta-blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Heading */
        .cta-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 800;
          line-height: 1.05;
          color: #fff;
          margin: 0 0 24px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .cta-heading.in { opacity: 1; transform: translateY(0); }
        .cta-heading span {
          background: linear-gradient(135deg, #818cf8 0%, #c084fc 40%, #f472b6 70%, #fb923c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Subtitle */
        .cta-sub {
          font-size: 18px;
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          max-width: 520px;
          margin: 0 auto 40px;
          line-height: 1.7;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
        }
        .cta-sub.in { opacity: 1; transform: translateY(0); }

        /* Trust badges */
        .cta-trust {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-bottom: 48px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
        }
        .cta-trust.in { opacity: 1; transform: translateY(0); }
        .cta-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }
        .cta-trust-icon {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Buttons */
        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s;
        }
        .cta-buttons.in { opacity: 1; transform: translateY(0); }

        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 32px;
          height: 54px;
          border-radius: 999px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
          background-size: 200% 200%;
          animation: cta-gradient 4s ease infinite;
          color: #fff;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 24px rgba(99,102,241,0.4);
        }
        @keyframes cta-gradient {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .cta-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
        }
        .cta-btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 32px rgba(99,102,241,0.5);
        }

        .cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 32px;
          height: 54px;
          border-radius: 999px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
          font-size: 15px;
          font-weight: 400;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }
        .cta-btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          color: #fff;
          transform: translateY(-2px);
        }

        .cta-btn-arrow {
          transition: transform 0.2s ease;
        }
        .cta-btn-primary:hover .cta-btn-arrow,
        .cta-btn-secondary:hover .cta-btn-arrow {
          transform: translateX(4px);
        }

        /* Footer note */
        .cta-note {
          margin-top: 32px;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          opacity: 0;
          transition: opacity 0.7s ease 0.6s;
        }
        .cta-note.in { opacity: 1; }

        /* Floating particles */
        .cta-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: 30px;
          z-index: 1;
        }
        .cta-particle {
          position: absolute;
          border-radius: 50%;
          background: white;
          opacity: 0;
          animation: cta-float-up var(--dur) ease-in var(--delay) infinite;
          width: var(--size); height: var(--size);
          left: var(--x);
          bottom: -10px;
        }
        @keyframes cta-float-up {
          0% { opacity: 0; transform: translateY(0) scale(0); }
          10% { opacity: 0.5; transform: translateY(-20px) scale(1); }
          90% { opacity: 0.15; }
          100% { opacity: 0; transform: translateY(-350px) scale(0.3); }
        }

        @media (max-width: 640px) {
          .cta-root { padding: 60px 20px; }
          .cta-card { padding: 48px 28px; }
          .cta-trust { gap: 20px; }
          .cta-buttons { flex-direction: column; align-items: center; }
          .cta-btn-primary, .cta-btn-secondary { width: 100%; max-width: 280px; justify-content: center; }
        }
      `}</style>

      <section className="cta-root" ref={containerRef} onMouseMove={handleMouseMove}>
        <div className="cta-bg-grid" />
        
        <div className="cta-container">
          <div className="cta-card-wrap">
            {/* Animated gradient border */}
            <div className="cta-glow-ring" />
            
            {/* Card */}
            <div className="cta-card">
              {/* Mouse spotlight */}
              <div
                className="cta-spotlight"
                style={{
                  background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(99,102,241,0.1), transparent 60%)`,
                }}
              />
              
              {/* Grid */}
              <div className="cta-grid" />
              
              {/* Orbs */}
              <div className="cta-orb cta-orb-1" />
              <div className="cta-orb cta-orb-2" />
              <div className="cta-orb cta-orb-3" />
              
              {/* Noise */}
              <div className="cta-noise" />
              
              {/* Particles */}
              <div className="cta-particles">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="cta-particle"
                    style={{
                      "--x": `${8 + i * 8}%`,
                      "--size": `${2 + (i % 3)}px`,
                      "--dur": `${5 + (i % 5)}s`,
                      "--delay": `${i * 0.6}s`,
                    } as React.CSSProperties}
                  />
                ))}
              </div>
              
              {/* Content */}
              <div className="cta-content">
                {/* Badge */}
                <div className={`cta-badge ${isVisible ? "in" : ""}`}>
                  <span className="cta-badge-dot" />
                  <Sparkles style={{ width: 14, height: 14 }} />
                  Free forever on core features
                </div>
                
                {/* Heading */}
                <h2 className={`cta-heading ${isVisible ? "in" : ""}`}>
                  Ready to run your business
                  <br />
                  <span>smarter, not harder?</span>
                </h2>
                
                {/* Subtitle */}
                <p className={`cta-sub ${isVisible ? "in" : ""}`}>
                  Join thousands of freelancers who use BizSnapPro to create invoices, 
                  track expenses, and manage contracts — all for free.
                </p>
                
                {/* Trust badges */}
                <div className={`cta-trust ${isVisible ? "in" : ""}`}>
                  <div className="cta-trust-item">
                    <span className="cta-trust-icon">
                      <CheckCircle2 style={{ width: 14, height: 14, color: "#34d399" }} />
                    </span>
                    No credit card required
                  </div>
                  <div className="cta-trust-item">
                    <span className="cta-trust-icon">
                      <Lock style={{ width: 14, height: 14, color: "#818cf8" }} />
                    </span>
                    Data stays on your device
                  </div>
                  <div className="cta-trust-item">
                    <span className="cta-trust-icon">
                      <Shield style={{ width: 14, height: 14, color: "#fb923c" }} />
                    </span>
                    100% free to use
                  </div>
                </div>
                
                {/* Buttons */}
                <div className={`cta-buttons ${isVisible ? "in" : ""}`}>
                  <Link href="/invoices" className="cta-btn-primary">
                    <Zap style={{ width: 18, height: 18 }} />
                    Get Started Free
                    <ArrowRight className="cta-btn-arrow" style={{ width: 18, height: 18 }} />
                  </Link>
                  <Link href="/contracts" className="cta-btn-secondary">
                    Browse Templates
                    <ArrowRight className="cta-btn-arrow" style={{ width: 18, height: 18 }} />
                  </Link>
                </div>
                
                {/* Note */}
                <p className={`cta-note ${isVisible ? "in" : ""}`}>
                  No signup required · All data stored locally · Your privacy comes first
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}