"use client";
import Loader from "@/components/general/Loader";
import { SelectedElem } from "@/components/mapper/hooks/useEditor";
import AddSection from "@/components/mapper/modal/AddSection";
import {
  getBackground
} from "@/components/mapper/settings/settingUtils";
import { navBarTopPosition } from "@/mapper/ComponentConstants";
import { switchNav, switchSection } from "@/mapper/ComponentMap";
import {
  JSONHeaders,
  SECTION_TYPE
} from "@/types/mapper.types";
import socket from "@/utils/socket";
import { updateFuncProxy } from "@/utils/utility";
import React, { useEffect } from "react";
import styled from "styled-components";

const Main = styled.div<{
  $bgColor: string;
  $fontFamily: string;
  $baseFontSize: string;
}>`
  background: ${(props) => props.$bgColor};
  font-family: ${(props) => props.$fontFamily};
  font-size: ${(props) => props.$baseFontSize}px;
`;

const SectionContainer = styled.div<{ $paddingTop: string; $bgColor: string }>`
  padding-top: ${(props) => props.$paddingTop};
  background: ${(props) => props.$bgColor};
`;

const Simulator = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedElem, setSelectedElem] = React.useState<SelectedElem | null>(
    null
  );
  const [webJson, setJson] = React.useState<Record<string, any> | null>(null);

  useEffect(() => {
    if (params.id) {
      socket.emit("joinRoom", params.id);

      socket.on("updateJsonToClient", (data: Record<string, any>) => {
        setJson(data);
        document.body.style.backgroundColor =
          data?.[SECTION_TYPE.GENERAL]?.background;
        if (loading) setLoading(false);
      });

      return () => {
        socket.off("updateJsonToClient");
      };
    }
  }, [params.id, loading]);

  const handleElemSelection = (name: SelectedElem | null) => {
    socket.emit("elemSelectedToRoom", { room: params.id, message: name });
    setSelectedElem(name);
  };

  const updateJson = (newJson: Record<string, any>) => {
    socket.emit("addSectionToRoom", { room: params.id, message: newJson });
  };

  const updateFuncs = updateFuncProxy(webJson, updateJson, selectedElem);

  if (loading || webJson == null) return <Loader />;
  const generalSettings = webJson[SECTION_TYPE.GENERAL];

  return (
    <Main
      $bgColor={generalSettings.background}
      $fontFamily={generalSettings.headingFontFamily}
      $baseFontSize={generalSettings.baseFontSize}
      className="w-full min-h-[100vh] relative"
      onClick={() => handleElemSelection(null)}
    >
      {switchNav(webJson[SECTION_TYPE.NAV_BAR]?.type, {
        ...webJson?.[SECTION_TYPE.NAV_BAR],
        isSelectMode: true,
        setSelectedElement: handleElemSelection,
        selected: selectedElem?.type === SECTION_TYPE.NAV_BAR,
      })}
      {webJson[JSONHeaders.SECTIONS]?.map(
        (section: Record<string, any>, index: number) => {
          return (
            <SectionContainer
              $bgColor={getBackground(section, generalSettings.background)}
              $paddingTop={
                webJson[SECTION_TYPE.NAV_BAR] && index === 0
                  ? navBarTopPosition[webJson[SECTION_TYPE.NAV_BAR].type]
                  : "0"
              }
              key={`${section.type}${section.subType}${index}`}
              className="w-full h-max"
            >
              {switchSection(
                section.type,
                {
                  ...section,
                  isSelectMode: true,
                  setSelectedElement: (name: SelectedElem) =>
                    handleElemSelection({ ...name, index }),
                  selected: selectedElem?.type === section.type,
                },
                updateFuncs
              )}
            </SectionContainer>
          );
        }
      )}
      <div style={{ color: generalSettings.background }} className="invert">
        <AddSection handleAddSection={updateFuncs.handleAddSection} />
      </div>
    </Main>
  );
};

export default Simulator;
