import GlobalWrapper from "@/wrappers/GlobalWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buynio",
  description: "Build. Publish. Grow, All Without Code.Turn your ideas into live landing pages — no coding, no waiting. Our builder is made for smalltimers who want to move fast and look pro. Choose, customize, and launch in minutes. Your hustle deserves a home — start now.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalWrapper>
      <Analytics />
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="bottom-center" toastOptions={{ duration: 5000 }} />
          <div className="w-full min-h-[100vh]">{children}</div>
        </body>
      </html>
    </GlobalWrapper>
  );
}
