import Sidebar from "@/components/general/Sidebar";
import type { Metadata } from "next";
import "../globals.css";
import { MapperProvider } from "@/components/mapper/hooks/selectedElemContext";
import Settings from "@/components/mapper/settings/Settings";

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
    <MapperProvider>
      <div className="relative w-full min-h-[100vh]">
        <Sidebar canHide={true} />
        {children}
        <Settings/>
      </div>
    </MapperProvider>
  );
}
