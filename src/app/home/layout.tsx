import Sidebar from "@/components/general/Sidebar";
import type { Metadata } from "next";
import "../globals.css";

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
    <div className="flex w-full min-h-screen bg-[var(--background-color)] justify-between items-start gradientBackground">
      <Sidebar canHide={false} />
      <div className="w-full px-4 min-h-screen overflow-auto backdrop-blur-xl">{children}</div>
    </div>
  );
}
