"use client";

import { usePathname } from "next/navigation";
import { MainNav } from "@/components/layout/main-nav";
import { Footer } from "@/components/layout/footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");
  
  return (
    <>
      {!isAuthPage && <MainNav />}
      <main className="flex-1 w-full mx-auto">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}
