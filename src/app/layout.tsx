import Provider from "@/context/Provider";
import type { Metadata } from "next";
import { Tilt_Neon } from "next/font/google";
import "./globals.css";

const tilt = Tilt_Neon({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={`${tilt.className} bg-gray-200 flex flex-col h-screen`}>
          <main className="flex-1"> {children}</main>
        </body>
      </Provider>
    </html>
  );
}
