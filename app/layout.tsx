import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sage",
  description: "UI workspace for Sage."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
