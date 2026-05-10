
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "𝑨𝒔𝒉𝒘𝒂𝒏𝒊 𝑲𝒖𝒎𝒂𝒓 | 𝑩𝒂𝒄𝒌𝒆𝒏𝒅 𝑫𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒓",
  description: "𝑳𝒆𝒕’𝒔 𝒄𝒐𝒏𝒏𝒆𝒄𝒕 𝒂𝒏𝒅 𝒄𝒓𝒆𝒂𝒕𝒆 𝒊𝒎𝒑𝒂𝒄𝒕𝒇𝒖𝒍 𝒕𝒆𝒄𝒉𝒏𝒐𝒍𝒐𝒈𝒚",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
