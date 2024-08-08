import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import Analytics from "@/components/Analytics";
import { Suspense } from "react";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Bell with Next.js + Supabase",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <UserProvider>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <Toaster />
      </body>
      </UserProvider>
      {/* <Suspense fallback={<div>Loading...</div>}>
        <Analytics />
      </Suspense> */}
    </html>
  );
}
