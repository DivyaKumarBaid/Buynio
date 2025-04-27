import Sidebar from "@/components/general/Sidebar";
import { MapperProvider } from "@/components/mapper/hooks/useEditor";
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
    <MapperProvider>
      <div className="flex relative w-full overflow-auto">
        <Sidebar canHide={true} isAbsolute={true}/>
        {children}
      </div>
    </MapperProvider>
  );
}
