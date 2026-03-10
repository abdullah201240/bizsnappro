"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, FileText, Receipt, TrendingUp, Sparkles } from "lucide-react";

export function FeatureShowcase() {
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

        .fs-root {
          font-family: 'DM Sans', sans-serif;
          padding: 120px 24px;
          background: #05050a;
          position: relative;
          overflow: hidden;
        }

        /* Background effects */
        .fs-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent);
        }
        .fs-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }
        .fs-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%);
          top: 10%; left: -10%;
          animation: fs-float 15s ease-in-out infinite alternate;
        }
        .fs-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(236,72,153,0.1), transparent 70%);
          bottom: 20%; right: -5%;
          animation: fs-float 12s ease-in-out infinite alternate-reverse;
        }
        @keyframes fs-float {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(40px, -40px) scale(1.1); }
        }

        .fs-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .fs-header {
          text-align: center;
          margin-bottom: 80px;
        }
        .fs-badge {
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
        .fs-badge.in { opacity: 1; transform: translateY(0); }
        .fs-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.1;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
        }
        .fs-title.in { opacity: 1; transform: translateY(0); }
        .fs-title span {
          background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .fs-subtitle {
          font-size: 18px;
          font-weight: 300;
          color: rgba(255,255,255,0.45);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
        }
        .fs-subtitle.in { opacity: 1; transform: translateY(0); }

        /* Feature sections */
        .fs-features {
          display: flex;
          flex-direction: column;
          gap: 120px;
        }

        .fs-feature {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }
        .fs-feature.in { 
          opacity: 1; 
          transform: translateY(0); 
        }
        .fs-feature.reverse {
          direction: rtl;
        }
        .fs-feature.reverse > * {
          direction: ltr;
        }

        /* Copy */
        .fs-copy-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .fs-copy-badge.invoice {
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.25);
          color: #818cf8;
        }
        .fs-copy-badge.expense {
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.25);
          color: #34d399;
        }
        .fs-copy-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 800;
          color: #fff;
          margin: 0 0 20px;
          line-height: 1.15;
        }
        .fs-copy-title em {
          font-style: normal;
        }
        .fs-copy-title em.invoice {
          background: linear-gradient(135deg, #818cf8, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .fs-copy-title em.expense {
          background: linear-gradient(135deg, #34d399, #2dd4bf);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .fs-copy-desc {
          font-size: 16px;
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          margin: 0 0 28px;
        }
        .fs-copy-list {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .fs-copy-list li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: rgba(255,255,255,0.7);
        }
        .fs-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .fs-check.invoice { color: #818cf8; }
        .fs-check.expense { color: #34d399; }

        .fs-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 28px;
          height: 48px;
          border-radius: 999px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .fs-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }
        .fs-btn-arrow {
          transition: transform 0.2s ease;
        }
        .fs-btn:hover .fs-btn-arrow {
          transform: translateX(4px);
        }

        /* Cards */
        .fs-card-wrap {
          position: relative;
        }
        .fs-card-glow {
          position: absolute;
          inset: -20px;
          border-radius: 32px;
          filter: blur(40px);
          opacity: 0.3;
        }
        .fs-card-glow.invoice {
          background: linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.2));
        }
        .fs-card-glow.expense {
          background: linear-gradient(135deg, rgba(16,185,129,0.4), rgba(45,212,191,0.2));
        }
        .fs-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          overflow: hidden;
          position: relative;
        }
        .fs-card-bar {
          height: 3px;
          width: 100%;
        }
        .fs-card-bar.invoice {
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
        }
        .fs-card-bar.expense {
          background: linear-gradient(90deg, #10b981, #14b8a6, #06b6d4);
        }
        .fs-card-content {
          padding: 28px;
        }

        /* Invoice card content */
        .fs-invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .fs-invoice-label {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 4px;
        }
        .fs-invoice-num {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #fff;
        }
        .fs-invoice-date {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          margin-top: 4px;
        }
        .fs-invoice-brand {
          text-align: right;
        }
        .fs-invoice-logo {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: #fff;
          margin: 0 0 8px auto;
        }
        .fs-invoice-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }
        .fs-invoice-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .fs-invoice-item:last-child {
          border-bottom: none;
        }
        .fs-invoice-item-name {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
        }
        .fs-invoice-item-price {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }
        .fs-invoice-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .fs-invoice-total-label {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
        }
        .fs-invoice-total-value {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #fff;
        }
        .fs-invoice-total-value span {
          font-size: 16px;
          color: rgba(255,255,255,0.4);
        }

        /* Expense card content */
        .fs-expense-header {
          margin-bottom: 24px;
        }
        .fs-expense-label {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .fs-expense-amount-wrap {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        .fs-expense-amount {
          font-family: 'Syne', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #fff;
        }
        .fs-expense-amount span {
          font-size: 20px;
          color: rgba(255,255,255,0.4);
        }
        .fs-expense-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          color: #34d399;
          padding: 6px 12px;
          background: rgba(52,211,153,0.1);
          border-radius: 999px;
        }
        .fs-expense-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .fs-expense-cat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 16px;
        }
        .fs-expense-cat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .fs-expense-cat-name {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }
        .fs-expense-cat-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .fs-expense-cat-amount {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 10px;
        }
        .fs-expense-cat-bar {
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
          overflow: hidden;
        }
        .fs-expense-cat-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 1s ease;
        }

        @media (max-width: 900px) {
          .fs-root { padding: 80px 20px; }
          .fs-feature {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .fs-feature.reverse {
            direction: ltr;
          }
          .fs-features { gap: 80px; }
        }
      `}</style>

      <section ref={sectionRef} className="fs-root">
        <div className="fs-grid" />
        <div className="fs-orb fs-orb-1" />
        <div className="fs-orb fs-orb-2" />

        <div className="fs-container">
          <div className="fs-header">
            <div className={`fs-badge ${isVisible ? 'in' : ''}`}>
              <Sparkles style={{ width: 14, height: 14 }} />
              Features
            </div>
            <h2 className={`fs-title ${isVisible ? 'in' : ''}`}>
              See it in <span>action</span>
            </h2>
            <p className={`fs-subtitle ${isVisible ? 'in' : ''}`}>
              Elegant interfaces that turn complex business tasks into effortless workflows.
            </p>
          </div>

          <div className="fs-features">
            {/* Invoice Feature */}
            <div className={`fs-feature ${isVisible ? 'in' : ''}`} style={{ transitionDelay: '0.2s' }}>
              <div className="fs-copy">
                <div className="fs-copy-badge invoice">
                  <FileText style={{ width: 12, height: 12 }} />
                  Invoices
                </div>
                <h3 className="fs-copy-title">
                  Professional Invoices,{" "}
                  <em className="invoice">in seconds.</em>
                </h3>
                <p className="fs-copy-desc">
                  Generate beautiful, on-brand invoices with custom details, line items, and automatic calculations — then export as a polished PDF instantly.
                </p>
                <ul className="fs-copy-list">
                  {["Custom invoice numbering", "Automatic tax calculation", "Professional PDF export", "Payment tracking"].map((item) => (
                    <li key={item}>
                      <span className="fs-check invoice">
                        <CheckCircle2 style={{ width: 12, height: 12 }} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/invoices" className="fs-btn">
                  Create Invoice
                  <ArrowRight className="fs-btn-arrow" style={{ width: 16, height: 16 }} />
                </Link>
              </div>

              <div className="fs-card-wrap">
                <div className="fs-card-glow invoice" />
                <div className="fs-card">
                  <div className="fs-card-bar invoice" />
                  <div className="fs-card-content">
                    <div className="fs-invoice-header">
                      <div>
                        <div className="fs-invoice-label">Invoice</div>
                        <div className="fs-invoice-num">#INV-2024-0001</div>
                        <div className="fs-invoice-date">Due Nov 30, 2024</div>
                      </div>
                      <div className="fs-invoice-brand">
                        <div className="fs-invoice-logo">A</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Acme Corp</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>hello@acme.com</div>
                      </div>
                    </div>
                    <div className="fs-invoice-items">
                      {[
                        { name: "Website Design", price: "$2,500.00" },
                        { name: "Development", price: "$4,000.00" },
                        { name: "Hosting (1 year)", price: "$240.00" },
                      ].map((item) => (
                        <div key={item.name} className="fs-invoice-item">
                          <span className="fs-invoice-item-name">{item.name}</span>
                          <span className="fs-invoice-item-price">{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="fs-invoice-total">
                      <span className="fs-invoice-total-label">Total Due</span>
                      <span className="fs-invoice-total-value">$6,740<span>.00</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expense Feature */}
            <div className={`fs-feature reverse ${isVisible ? 'in' : ''}`} style={{ transitionDelay: '0.4s' }}>
              <div className="fs-card-wrap">
                <div className="fs-card-glow expense" />
                <div className="fs-card">
                  <div className="fs-card-bar expense" />
                  <div className="fs-card-content">
                    <div className="fs-expense-header">
                      <div className="fs-expense-label">Total Expenses</div>
                      <div className="fs-expense-amount-wrap">
                        <div className="fs-expense-amount">$12,450<span>.00</span></div>
                        <div className="fs-expense-trend">
                          <TrendingUp style={{ width: 14, height: 14 }} />
                          +12%
                        </div>
                      </div>
                    </div>
                    <div className="fs-expense-grid">
                      {[
                        { label: "Software", amount: "$4,560", pct: 37, color: "#6366f1" },
                        { label: "Office", amount: "$2,340", pct: 19, color: "#8b5cf6" },
                        { label: "Travel", amount: "$1,890", pct: 15, color: "#f59e0b" },
                        { label: "Marketing", amount: "$3,660", pct: 29, color: "#ec4899" },
                      ].map((cat) => (
                        <div key={cat.label} className="fs-expense-cat">
                          <div className="fs-expense-cat-header">
                            <span className="fs-expense-cat-name">{cat.label}</span>
                            <div className="fs-expense-cat-dot" style={{ background: cat.color }} />
                          </div>
                          <div className="fs-expense-cat-amount">{cat.amount}</div>
                          <div className="fs-expense-cat-bar">
                            <div 
                              className="fs-expense-cat-fill" 
                              style={{ 
                                width: isVisible ? `${cat.pct}%` : '0%',
                                background: cat.color,
                                transitionDelay: '0.6s'
                              }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="fs-copy">
                <div className="fs-copy-badge expense">
                  <Receipt style={{ width: 12, height: 12 }} />
                  Expenses
                </div>
                <h3 className="fs-copy-title">
                  Track Every Penny,{" "}
                  <em className="expense">effortlessly.</em>
                </h3>
                <p className="fs-copy-desc">
                  Categorize your business spending, visualize trends, and arrive at tax season with perfectly organized records — no accountant required.
                </p>
                <ul className="fs-copy-list">
                  {["10+ expense categories", "Visual breakdown charts", "Export to PDF/CSV", "Tax-ready reports"].map((item) => (
                    <li key={item}>
                      <span className="fs-check expense">
                        <CheckCircle2 style={{ width: 12, height: 12 }} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/expenses" className="fs-btn">
                  Track Expenses
                  <ArrowRight className="fs-btn-arrow" style={{ width: 16, height: 16 }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
