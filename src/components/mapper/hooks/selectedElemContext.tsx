"use client";
import { fetchSingleSavedHop } from "@/lib/keys";
import { getSingleSavedHop } from "@/service/hop";
import { SECTION_TYPE, SectionSubType } from "@/types/mapper.types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";

export enum View {
  WEB = "web",
  MOBILE = "mobile",
}

type MapperContextType = {
  selectedElement: SelectedElem | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElem | null>>;
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
  roomId?: string | null;
  setRoomId?: React.Dispatch<React.SetStateAction<string | null>>;
  webJson?: Record<string, any> | null;
  setWebJson?: React.Dispatch<React.SetStateAction<Record<string, any> | null>>;
};

export type SelectedElem = {
  type: SECTION_TYPE;
  subType: SectionSubType;
  index?: number
};

export const MapperContext = React.createContext<MapperContextType | null>(
  null
);

export const useMapperContext = () => React.useContext(MapperContext);

export const MapperProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  const [selectedElement, setSelectedElement] =
    React.useState<SelectedElem | null>(null);
  const [view, setView] = React.useState<View>(View.WEB);
  const [roomId, setRoomId] = React.useState<string | null>(null);
  const [webJson, setWebJson] = React.useState<Record<string, any> | null>(null);

  console.log({webJson})

  const { data: savedHop, isLoading } = useQuery({
    queryKey: [fetchSingleSavedHop],
    queryFn: () => getSingleSavedHop(session, roomId!),
    enabled:
      status != "loading" && !!session?.user?.refresh_token && roomId != null,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (!isLoading && savedHop) {
      setWebJson(JSON.parse(savedHop.blueprint));
    }
  }, [savedHop]);

  // useEffect(() => {
  //   if (!isLoading && error) {
  //     toast.error(error.message);
  //   }
  // }, [error]);

  // console.log("Mapper", { selectedElement, setSelectedElement, view, setView, roomId, setRoomId, webJson, setWebJson});

  return (
    <MapperContext.Provider
      value={{
        selectedElement,
        setSelectedElement,
        view,
        setView,
        roomId,
        setRoomId,
        webJson,
        setWebJson,
      }}
    >
      {children}
    </MapperContext.Provider>
  );
};
