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
      <div className="w-full m-4 ml-0 min-h-[calc(100vh-4vh)] overflow-auto rounded-3xl p-4 customShadowInset border-2 border-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.3)] backdrop-blur-xl">{children}</div>
    </div>
  );
}
