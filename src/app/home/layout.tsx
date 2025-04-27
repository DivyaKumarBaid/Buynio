import Sidebar from "@/components/general/Sidebar";
import type { Metadata } from "next";
import "../globals.css";

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
    <div className="flex w-full min-h-screen bg-[var(--background-color)] justify-between items-start gradientBackground">
      <Sidebar canHide={false} />
      <div className="w-full px-4 min-h-screen overflow-auto backdrop-blur-xl">{children}</div>
    </div>
  );
}
