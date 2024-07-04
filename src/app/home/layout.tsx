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
    <div className="relative md:pl-[calc(max(6vw,100px))] w-full min-h-[100vh] bg-[var(--background-color)]">
      <Sidebar canHide={false} />
      {children}
    </div>
  );
}
