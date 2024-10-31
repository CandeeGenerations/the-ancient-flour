"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { usePathname } from "next/navigation";

export function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <div className="relative flex min-h-screen flex-col">
      {!isAdmin && <SiteHeader />}
      <main className="flex-1">
        {children}
      </main>
      {!isAdmin && <SiteFooter />}
    </div>
  );
}