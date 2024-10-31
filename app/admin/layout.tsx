"use client";

import { SideNav } from "@/components/admin/side-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SideNav className="w-64 border-r" />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}