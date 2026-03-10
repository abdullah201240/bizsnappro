"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Clock, Users, TrendingUp } from "lucide-react";

const stats = [
  { label: "Invoices Created", value: "10K+", icon: FileText, color: "#818cf8" },
  { label: "Active Users", value: "5K+", icon: Users, color: "#34d399" },
  { label: "Time Saved", value: "1000h", icon: Clock, color: "#fb923c" },
];

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasAnimated.current) {
            hasAnimated.current = true;
            // Animate numbers
            stats.forEach((stat, i) => {
              const target = parseInt(stat.value.replace(/[^0-9]/g, ''));
              const suffix = stat.value.replace(/[0-9]/g, '');
              const duration = 1500;
              const steps = 60;
              const increment = target / steps;
              let current = 0;
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                setCounts(prev => {
                  const next = [...prev];
                  next[i] = Math.floor(current);
                  return next;
                });
              }, duration / steps);
            });
          }
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .ss-root {
          font-family: 'DM Sans', sans-serif;
          padding: 60px 24px;
          background: linear-gradient(180deg, #05050a 0%, #0a0a12 50%, #05050a 100%);
          position: relative;
          overflow: hidden;
        }

        /* Subtle grid */
        .ss-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .ss-container {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .ss-grid-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .ss-stat {
          text-align: center;
          padding: 32px 24px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }
        .ss-stat.in { 
          opacity: 1; 
          transform: translateY(0); 
        }
        .ss-stat::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0.5;
        }
        .ss-stat:hover {
          border-color: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }

        .ss-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          position: relative;
        }
        .ss-icon-wrap::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--accent), transparent);
          opacity: 0.3;
          z-index: -1;
        }
        .ss-icon {
          color: var(--accent);
        }

        .ss-value {
          font-family: 'Syne', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 8px;
          line-height: 1;
        }
        .ss-label {
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.02em;
        }

        /* Trend indicator */
        .ss-trend {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 500;
          color: #34d399;
          margin-top: 8px;
          padding: 4px 8px;
          background: rgba(52,211,153,0.1);
          border-radius: 999px;
        }

        @media (max-width: 640px) {
          .ss-root { padding: 40px 20px; }
          .ss-grid-stats { grid-template-columns: 1fr; gap: 16px; }
          .ss-value { font-size: 28px; }
        }
      `}</style>

      <section ref={sectionRef} className="ss-root">
        <div className="ss-grid" />
        <div className="ss-container">
          <div className="ss-grid-stats">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              const suffix = stat.value.replace(/[0-9]/g, '');
              return (
                <div
                  key={stat.label}
                  className={`ss-stat ${isVisible ? 'in' : ''}`}
                  style={{
                    '--accent': stat.color,
                    transitionDelay: `${i * 0.1}s`,
                  } as React.CSSProperties}
                >
                  <div className="ss-icon-wrap">
                    <Icon className="ss-icon" style={{ width: 22, height: 22 }} />
                  </div>
                  <div className="ss-value">
                    {counts[i]}{suffix}
                  </div>
                  <div className="ss-label">{stat.label}</div>
                  {i === 0 && (
                    <div className="ss-trend">
                      <TrendingUp style={{ width: 10, height: 10 }} />
                      +23% this month
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
