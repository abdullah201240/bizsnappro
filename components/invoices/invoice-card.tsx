"use client";

import React from "react";

interface InvoiceCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  isVisible: boolean;
  delay?: string;
}

export function InvoiceCard({ 
  id, 
  icon, 
  title, 
  subtitle, 
  children, 
  isVisible, 
  delay = "0s" 
}: InvoiceCardProps) {
  return (
    <div 
      id={id} 
      className={`inv-card ${isVisible ? "in" : ""}`} 
      style={{ transitionDelay: delay }}
    >
      <div className="inv-card-header">
        <div className="inv-card-icon">
          {icon}
        </div>
        <div>
          <h2 className="inv-card-title">{title}</h2>
          <p className="inv-card-subtitle">{subtitle}</p>
        </div>
      </div>
      <div className="inv-card-body">
        {children}
      </div>
    </div>
  );
}
