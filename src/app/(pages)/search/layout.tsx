import Provider from "@/context/Provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Página inicial do e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider>{children}</Provider>;
}
