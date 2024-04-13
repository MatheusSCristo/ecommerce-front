import type { Metadata } from "next";
import { Tilt_Neon } from "next/font/google";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const tilt = Tilt_Neon({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Página inicial do e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tilt.className} bg-gray-200`}>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
