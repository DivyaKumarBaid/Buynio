import GlobalWrapper from "@/wrappers/GlobalWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

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
        <body className={inter.className}>
            <Toaster
              position="bottom-center"
              toastOptions={{ duration: 5000 }}
              />
            <div className="w-full min-h-[100vh]">
              {children}
            </div>
        </body>
      </html>
    </GlobalWrapper>
  );
}
