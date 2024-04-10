import type { Metadata } from "next";
import { Tilt_Neon } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

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
      <Navbar/>
      <body className={tilt.className}>{children}</body>
    </html>
  );
}
