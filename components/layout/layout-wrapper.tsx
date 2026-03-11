"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MainNav } from "@/components/layout/main-nav";
import { Footer } from "@/components/layout/footer";
import { AuthProvider, useAuth } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const isAuthPage = pathname?.startsWith("/auth");
  const isDashboardPage = pathname?.startsWith("/dashboard") || 
                          pathname?.startsWith("/invoices") ||
                          pathname?.startsWith("/expenses") ||
                          pathname?.startsWith("/customers") ||
                          pathname?.startsWith("/income") ||
                          pathname?.startsWith("/contracts") ||
                          pathname?.startsWith("/payments") ||
                          pathname?.startsWith("/reports") ||
                          pathname?.startsWith("/settings");
  
  // Show navbar and footer only for unauthenticated public pages
  const showNavFoot = !isAuthPage && !loading && !user;
  
  return (
    <>
      {showNavFoot && <MainNav />}
      <main className="flex-1 w-full mx-auto">
        {children}
      </main>
      {showNavFoot && <Footer />}
    </>
  );
}

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LayoutContent>{children}</LayoutContent>
      </AuthProvider>
    </ThemeProvider>
  );
}
