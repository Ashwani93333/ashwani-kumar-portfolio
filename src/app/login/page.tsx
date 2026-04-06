
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate successful login
    setTimeout(() => {
      router.push("/admin");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 font-headline font-bold text-xl">
          <Rocket className="w-6 h-6 text-primary" />
          <span className="text-gradient">PortfoForge</span>
        </Link>
      </div>

      <Card className="w-full max-w-md glass-card border-white/10">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline font-bold">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input required type="email" placeholder="admin@portfoforge.com" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input required type="password" placeholder="••••••••" className="bg-white/5 border-white/10" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button disabled={loading} className="w-full bg-primary hover:bg-primary/90">
              {loading ? "Authenticating..." : "Login to Dashboard"}
            </Button>
            <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Return to public site
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
