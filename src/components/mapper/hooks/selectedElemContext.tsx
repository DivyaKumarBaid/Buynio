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
  const [view,setView] = React.useState<View>(View.WEB)

  return (
    <MapperContext.Provider value={{ selectedElement, setSelectedElement, view, setView }}>
      {children}
    </MapperContext.Provider>
  );
};
