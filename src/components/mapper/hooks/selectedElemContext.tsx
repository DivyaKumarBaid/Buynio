"use client"
import React, { ReactNode } from "react";

type MapperContextType = {
  selectedElement: SelectedElem | null;
  setSelectedElement: React.Dispatch<React.SetStateAction<SelectedElem | null>>;
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

  return (
    <MapperContext.Provider value={{ selectedElement, setSelectedElement }}>
      {children}
    </MapperContext.Provider>
  );
};
