import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrolling } from "@/components/smooth-scrolling";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Surf & Sage",
  description: "Premium surf forecasts and lifestyle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased bg-black text-white", inter.variable)}>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
