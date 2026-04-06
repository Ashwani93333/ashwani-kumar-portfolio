
"use client";

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { LayoutDashboard, FolderKanban, FileText, MessageSquare, Quote, UserCircle, LogOut, ExternalLink, Rocket } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: FolderKanban, label: "Projects", href: "/admin/projects" },
  { icon: FileText, label: "Blogs", href: "/admin/blogs" },
  { icon: Quote, label: "Testimonials", href: "/admin/testimonials" },
  { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
  { icon: UserCircle, label: "Profile", href: "/admin/profile" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-white/5 bg-card">
        <SidebarHeader className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 font-headline font-bold text-xl">
            <Rocket className="w-6 h-6 text-primary" />
            <span className="text-gradient">PortfoForge</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.href}
                  className="hover:bg-primary/10 hover:text-primary transition-all p-4 h-12"
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-white/5 space-y-2">
          <SidebarMenuButton asChild className="p-4 h-12 text-muted-foreground hover:text-foreground">
            <Link href="/" target="_blank" className="flex items-center gap-3">
              <ExternalLink className="w-5 h-5" />
              <span>View Public Site</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton 
            onClick={handleLogout}
            className="p-4 h-12 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <div className="flex items-center gap-3 w-full">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </div>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="h-16 border-b border-white/5 flex items-center px-8 justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-lg font-headline font-semibold">
              {menuItems.find(i => i.href === pathname)?.label || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">PortfoForge Admin</p>
              <p className="text-xs text-muted-foreground">Admin Access</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">
              A
            </div>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
