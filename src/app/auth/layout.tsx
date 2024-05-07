import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entre na sua conta",
  description: "Entre na sua conta para aproveitar por completo nossa loja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
