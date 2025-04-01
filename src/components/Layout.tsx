
import { ReactNode } from "react";
import { SidebarNav } from "@/components/SidebarNav";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
