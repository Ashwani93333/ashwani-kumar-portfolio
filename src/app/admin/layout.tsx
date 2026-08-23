
// "use client";

// import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
// import { 
//   LayoutDashboard, 
//   FolderKanban, 
//   FileText, 
//   MessageSquare, 
//   Award, 
//   UserCircle, 
//   LogOut, 
//   ExternalLink, 
//   Rocket, 
//   Briefcase, 
//   GraduationCap, 
//   Code2, 
//   Binary 
// } from "lucide-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";

// const menuItems = [
//   { icon: LayoutDashboard, label: "Overview", href: "/admin" },
//   { icon: UserCircle, label: "Profile", href: "/admin/profile" },
//   { icon: FolderKanban, label: "Projects", href: "/admin/projects" },
//   { icon: Briefcase, label: "Experience", href: "/admin/experience" },
//   { icon: GraduationCap, label: "Education", href: "/admin/education" },
//   { icon: Award, label: "Track Record", href: "/admin/track-record" },
//   { icon: Code2, label: "Tech Stack", href: "/admin/tech-stack" },
//   { icon: Binary, label: "Coding Profiles", href: "/admin/coding-profiles" },
//   { icon: FileText, label: "Blogs", href: "/admin/blogs" },
//   { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
// ];

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const handleLogout = () => {
//     router.push("/login");
//   };

//   return (
//     <SidebarProvider>
//       <Sidebar className="border-r border-white/5 bg-card">
//         <SidebarHeader className="p-6 border-b border-white/5">
//           <Link href="/" className="flex items-center gap-2 font-headline font-bold text-xl">
//             <Rocket className="w-6 h-6 text-primary" />
//             <span className="text-gradient">PortfoForge</span>
//           </Link>
//         </SidebarHeader>
//         <SidebarContent className="p-4">
//           <SidebarMenu>
//             {menuItems.map((item) => (
//               <SidebarMenuItem key={item.href}>
//                 <SidebarMenuButton 
//                   asChild 
//                   isActive={pathname === item.href}
//                   className="hover:bg-primary/10 hover:text-primary transition-all p-4 h-12"
//                 >
//                   <Link href={item.href} className="flex items-center gap-3">
//                     <item.icon className="w-5 h-5" />
//                     <span className="font-medium text-xs">{item.label}</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             ))}
//           </SidebarMenu>
//         </SidebarContent>
//         <SidebarFooter className="p-4 border-t border-white/5 space-y-2">
//           <SidebarMenuButton asChild className="p-4 h-12 text-muted-foreground hover:text-foreground">
//             <Link href="/" target="_blank" className="flex items-center gap-3">
//               <ExternalLink className="w-5 h-5" />
//               <span className="text-xs">View Public Site</span>
//             </Link>
//           </SidebarMenuButton>
//           <SidebarMenuButton 
//             onClick={handleLogout}
//             className="p-4 h-12 text-destructive hover:bg-destructive/10 hover:text-destructive"
//           >
//             <div className="flex items-center gap-3 w-full">
//               <LogOut className="w-5 h-5" />
//               <span className="text-xs">Logout</span>
//             </div>
//           </SidebarMenuButton>
//         </SidebarFooter>
//       </Sidebar>
//       <SidebarInset>
//         <header className="h-16 border-b border-white/5 flex items-center px-8 justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-10">
//           <div className="flex items-center gap-4">
//             <SidebarTrigger className="md:hidden" />
//             <h1 className="text-sm font-headline font-semibold">
//               {menuItems.find(i => i.href === pathname)?.label || "Dashboard"}
//             </h1>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="text-right hidden sm:block">
//               <p className="text-xs font-medium">PortfoForge Admin</p>
//               <p className="text-[10px] text-muted-foreground">Authenticated Session</p>
//             </div>
//             <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-xs">
//               P
//             </div>
//           </div>
//         </header>
//         <div className="p-8 max-w-7xl mx-auto w-full">
//           {children}
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }


//verify

"use client";

import { useEffect, useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  Award,
  UserCircle,
  LogOut,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code2,
  Binary,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CoderLogo } from "@/components/public/CoderLogo";
import { Skeleton } from "@/components/public/Skeleton";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: UserCircle, label: "Profile", href: "/admin/profile" },
  { icon: FolderKanban, label: "Projects", href: "/admin/projects" },
  { icon: Briefcase, label: "Experience", href: "/admin/experience" },
  { icon: GraduationCap, label: "Education", href: "/admin/education" },
  { icon: Award, label: "Track Record", href: "/admin/track-record" },
  { icon: Code2, label: "Tech Stack", href: "/admin/tech-stack" },
  { icon: Binary, label: "Coding Profiles", href: "/admin/coding-profiles" },
  { icon: FileText, label: "Blogs", href: "/admin/blogs" },
  { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Protect admin routes
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.replace("/login");
  };

  // Prevent unauthorized content flash
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <CoderLogo className="scale-110 animate-pulse" />
        <div className="w-64 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        <p className="text-xs font-code text-muted-foreground">
          <span className="syntax-comment"># </span>
          verifying session token...
        </p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-white/5 bg-card">
        <SidebarHeader className="p-4 border-b border-white/5">
          <Link
            href="/"
            className="flex items-center gap-2 font-code text-[13px]"
          >
            <CoderLogo />
            <span>
              <span className="syntax-constant select-none">ashwani</span>
              <span className="text-muted-foreground select-none">@</span>
              <span className="syntax-property select-none">admin</span>
              <span className="text-muted-foreground select-none">:~$</span>
            </span>
          </Link>
          <p className="mt-2 ml-1 text-[10px] font-code text-muted-foreground">
            <span className="syntax-comment"># </span>portfolio control panel
          </p>
        </SidebarHeader>

        <SidebarContent className="p-4">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className="font-code text-[12px] hover:bg-primary/10 hover:text-primary transition-all p-4 h-11"
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span className="text-[12px]">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-white/5 space-y-2">
          <SidebarMenuButton
            asChild
            className="p-4 h-11 font-code text-[12px] text-muted-foreground hover:text-foreground"
          >
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-[12px]">View Public Site</span>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton
            onClick={handleLogout}
            className="p-4 h-11 font-code text-[12px] text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <div className="flex items-center gap-3 w-full">
              <LogOut className="w-4 h-4" />
              <span className="text-[12px]">logout</span>
            </div>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="h-14 border-b border-white/5 flex items-center px-8 justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            <div className="flex items-center gap-2 font-code text-[12px]">
              <span className="syntax-comment select-none">$</span>
              <span className="syntax-keyword select-none">cd</span>
              <span className="text-muted-foreground">/admin</span>
              <span className="text-white/20 select-none">·</span>
              <span className="text-foreground">
                {menuItems.find((i) => i.href === pathname)?.label || "Overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded border border-white/10 bg-white/[0.02]">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-success" />
              <span className="font-code text-[10px] uppercase tracking-widest text-muted-foreground">
                authenticated
              </span>
            </div>

            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-code font-bold text-xs">
              &lt;/&gt;
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}