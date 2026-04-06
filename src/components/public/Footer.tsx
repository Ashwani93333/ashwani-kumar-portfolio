
import Link from "next/link";
import { Rocket } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-background">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 font-headline font-bold text-xl">
          <Rocket className="w-6 h-6 text-primary" />
          <span className="text-gradient">PortfoForge</span>
        </div>
        
        <p className="text-sm text-muted-foreground order-last md:order-none">
          © {new Date().getFullYear()} PortfoForge. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</Link>
          <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
