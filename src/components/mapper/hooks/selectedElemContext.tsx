"use client"
import { SECTION_TYPE, SectionSubType } from "@/types/mapper.types";
import React, { ReactNode } from "react";
import { web as outline } from "@/utils/defaultWeb";

export enum View{
  WEB="web",
  MOBILE="mobile"
}

const webOutlint = outline;

type MapperContextType = {
  selectedElement: SelectedElem | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElem | null>>;
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
  roomId?: string | null;
  setRoomId?: React.Dispatch<React.SetStateAction<string | null>>;
  webJson?: Record<string,any>;
  setWebJson?: React.Dispatch<React.SetStateAction<Record<string, any>>>
};

export type SelectedElem = {
  type: SECTION_TYPE,
  subType: SectionSubType
}

export const MapperContext = React.createContext<MapperContextType | null>(
  null
);

export const useMapperContext = () => React.useContext(MapperContext);

export const MapperProvider = ({ children }: { children: ReactNode }) => {
  const [selectedElement, setSelectedElement] = React.useState<SelectedElem | null>(
    null
  );
  const [view,setView] = React.useState<View>(View.WEB);
  const [roomId,setRoomId] = React.useState<string | null>(null);
  const [webJson, setWebJson] = React.useState<Record<string,any>>(webOutlint);

  // console.log("Mapper", { selectedElement, setSelectedElement, view, setView, roomId, setRoomId, webJson, setWebJson});

  return (
    <MapperContext.Provider value={{ selectedElement, setSelectedElement, view, setView, roomId, setRoomId, webJson, setWebJson}}>
      {children}
    </MapperContext.Provider>
  );
};
