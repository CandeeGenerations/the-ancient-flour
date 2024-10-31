"use client";

import { cn } from "@/lib/utils";
import {
  CakeIcon,
  LayoutDashboardIcon,
  MenuIcon,
  PackageIcon,
  ShoppingCartIcon,
  TagIcon,
  TicketIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboardIcon },
  { name: "Products", href: "/admin/products", icon: CakeIcon },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCartIcon },
  { name: "Categories", href: "/admin/categories", icon: PackageIcon },
  { name: "Tags", href: "/admin/tags", icon: TagIcon },
  { name: "Promotions", href: "/admin/promotions", icon: TicketIcon },
];

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SideNav({ className }: SideNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed left-4 top-4 z-40"
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <Link href="/admin" className="flex items-center gap-2">
                <CakeIcon className="h-6 w-6" />
                <span className="font-semibold">Bakery Admin</span>
              </Link>
            </div>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-2 p-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                        isActive ? "bg-muted font-medium text-primary" : "text-muted-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
      <nav
        className={cn(
          "hidden lg:block border-r bg-background",
          className
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <CakeIcon className="h-6 w-6" />
            <span className="font-semibold">Bakery Admin</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <div className="flex flex-col gap-2 px-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                    isActive ? "bg-muted font-medium text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </nav>
    </>
  );
}