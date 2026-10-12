import type { Metadata } from "next";
import { Encode_Sans_Expanded, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const Encode = Encode_Sans_Expanded({
  subsets: ["latin"],
  weight: ['300', '400']
});

export const metadata: Metadata = {
  title: "FreshCart App",
  description: "E-commerce platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", Encode.className, "font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col pt-20">
        <Navbar />
        <main className="container mx-auto px-4 grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}