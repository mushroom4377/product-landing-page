import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Himalayan Fresh Eggs",
  description: "Farm fresh eggs delivered with Cash On Delivery.",
  icons: {
    icon: "/images/favicon-eggs-large.png",
    shortcut: "/images/favicon-eggs-large.png",
    apple: "/images/favicon-eggs-large.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
