import Sidebar from "@/components/general/Sidebar";
import { MapperProvider } from "@/components/mapper/hooks/useEditor";
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
    <MapperProvider>
      <div className="flex relative w-full overflow-auto">
        <Sidebar canHide={true} isAbsolute={true}/>
        {children}
      </div>
    </MapperProvider>
  );
}
