"use client";

import { usePathname } from "next/navigation";
import { MainNav } from "@/components/layout/main-nav";
import { Footer } from "@/components/layout/footer";
import { AuthProvider, useAuth } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const isAuthPage = pathname?.startsWith("/auth");
  // Show navbar and footer for unauthenticated pages and home page
  const isHomePage = pathname === "/";
  const showNavFoot = !isAuthPage && !loading && (!user || isHomePage);
  
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
