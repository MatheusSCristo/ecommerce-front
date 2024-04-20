import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crie sue conta",
  description: "Crie sua conta para aproveitar por completo nossa loja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
