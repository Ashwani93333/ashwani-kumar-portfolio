
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Rocket, ShieldCheck } from "lucide-react";
// import Link from "next/link";

// export default function LoginPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     // Simulate successful login
//     setTimeout(() => {
//       router.push("/admin");
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
//       <div className="absolute top-8 left-8">
//         <Link href="/" className="flex items-center gap-2 font-headline font-bold text-xl">
//           <Rocket className="w-6 h-6 text-primary" />
//           <span className="text-gradient">PortfoForge</span>
//         </Link>
//       </div>

//       <Card className="w-full max-w-md glass-card border-white/10">
//         <CardHeader className="space-y-1 text-center">
//           <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
//             <ShieldCheck className="w-6 h-6 text-primary" />
//           </div>
//           <CardTitle className="text-2xl font-headline font-bold">Admin Login</CardTitle>
//           <CardDescription>Enter your credentials to access the dashboard</CardDescription>
//         </CardHeader>
//         <form onSubmit={handleLogin}>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Email Address</label>
//               <Input required type="email" placeholder="admin@portfoforge.com" className="bg-white/5 border-white/10" />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Password</label>
//               <Input required type="password" placeholder="••••••••" className="bg-white/5 border-white/10" />
//             </div>
//           </CardContent>
//           <CardFooter className="flex flex-col gap-4">
//             <Button disabled={loading} className="w-full bg-primary hover:bg-primary/90">
//               {loading ? "Authenticating..." : "Login to Dashboard"}
//             </Button>
//             <Link href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
//               Return to public site
//             </Link>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CoderLogo } from "@/components/public/CoderLogo";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token in localStorage
      localStorage.setItem("accessToken", data.data.accessToken);
            const token = localStorage.getItem("accessToken");

      // document.cookie = `admin_token=${token}; path=/; max-age=86400; secure; samesite=strict`;
      

      // // Optional: save user info
      // localStorage.setItem("user", JSON.stringify(data.data.user));

      // Redirect to admin dashboard
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <div className="absolute top-8 left-8 flex items-center gap-2 font-code text-[13px]">
        <Link href="/" className="flex items-center gap-2 group">
          <CoderLogo className="transition-transform group-hover:scale-110" />
          <span>
            <span className="syntax-constant select-none">ashwani</span>
            <span className="text-muted-foreground select-none">@</span>
            <span className="syntax-property select-none">admin</span>
            <span className="text-muted-foreground select-none">:~$</span>
          </span>
        </Link>
      </div>

      <Card className="w-full max-w-md glass-card border-white/10 overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] font-code text-[10px] text-muted-foreground">
          <CoderLogo glow={false} />
          <span className="syntax-keyword select-none">auth</span>
          <span className="text-muted-foreground">--require</span>
          <span className="syntax-string">"admin"</span>
          <span className="ml-auto text-success">● secure</span>
        </div>

        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 font-code text-lg text-primary shadow-[0_0_14px_rgba(250,178,131,0.25)]">
            &lt;/&gt;
          </div>

          <CardTitle className="text-2xl font-headline font-bold font-code">
            admin.login<span className="text-primary">()</span>
          </CardTitle>

          <CardDescription className="font-code text-[12px]">
            <span className="syntax-comment"># </span>
            enter credentials to access the dashboard
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md p-3">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                required
                type="email"
                placeholder="admin@portfoforge.com"
                className="bg-white/5 border-white/10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                required
                type="password"
                placeholder="••••••••"
                className="bg-white/5 border-white/10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {loading ? "Authenticating..." : "Login to Dashboard"}
            </Button>

            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Return to public site
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}