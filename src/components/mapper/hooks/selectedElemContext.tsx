"use client"
import React, { ReactNode } from "react";

export enum View{
  WEB="web",
  MOBILE="mobile"
}

type MapperContextType = {
  selectedElement: SelectedElem | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElem | null>>;
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
  roomId?: string | null;
  setRoomId?: React.Dispatch<React.SetStateAction<string | null>>;
};

export type SelectedElem = {
  type: string,
  subType: string
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

  return (
    <MapperContext.Provider value={{ selectedElement, setSelectedElement, view, setView, roomId, setRoomId}}>
      {children}
    </MapperContext.Provider>
  );
};
