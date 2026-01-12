import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EmpirePilot from "@/components/EmpirePilot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Empire Contractors Ltd | Master Builders Portsmouth",
  description: "Portsmouth's premier construction company specializing in HMO conversions, extensions, and quality residential projects. ISO 9001/45001 Ready. FMB Member.",
  keywords: "construction Portsmouth, HMO conversion, extensions, building contractors, Southsea builders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <EmpirePilot />
      </body>
    </html>
  );
}
