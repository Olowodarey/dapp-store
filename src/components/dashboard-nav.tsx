"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  Tags,
  BarChart3,
  LogOut,
  ShoppingBag,
} from "lucide-react";

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const navItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Discounts",
      href: "/dashboard/discounts",
      icon: Tags,
    },
    {
      title: "Inventory",
      href: "/dashboard/inventory",
      icon: BarChart3,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 py-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold mb-10 pl-2"
        >
          <ShoppingBag className="h-6 w-6" />
          <span>Store Admin</span>
        </Link>
        <nav className="grid gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary ${
                pathname === item.href
                  ? "bg-muted font-medium text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
}
