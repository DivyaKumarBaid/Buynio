import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalWrapper from "@/wrappers/GlobalWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "Public",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalWrapper>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </GlobalWrapper>
  );
}
