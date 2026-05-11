import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MOTION | The Future of Interactive Animation",
  description: "A showcase and learning platform for modern web animations, particle systems, and interactive JavaScript experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased`}>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
