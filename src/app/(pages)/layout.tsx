import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";

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
    <>
      <Navbar />
      <main className="flex-1"> {children}</main>
      <Footer />
    </>
  );
}
