import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ToasterProvider from "@/providers/toast-provider";

const font = Urbanist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ingestio",
  description: "GitHub Repository to Prompt-Friendly Text Digests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <ToasterProvider />
        <div className="inset-0 -z-10 w-full min-h-screen bg-white bg-[radial-gradient(#e5e7eb_0.8px,transparent_0.8px)] [background-size:20px_20px]">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
