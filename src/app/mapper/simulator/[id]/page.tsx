
"use client"
import { useMapperContext } from "@/components/mapper/hooks/selectedElemContext";
import socket from "@/utils/socket";
import React, { useEffect } from "react";
import styled from "styled-components";
import { web as outline } from "@/utils/defaultWeb";
import { navBarTopPosition } from "@/mapper/ComponentConstants";
import { switchNav, switchSection } from "@/mapper/ComponentMap";

const Main = styled.div<{ $bgColor: string }>`
  background: ${(props) => props.$bgColor};
  `;

  const SectionContainer = styled.div<{ $paddingTop: string; $bgColor: string }>`
  padding-top: ${(props) => props.$paddingTop};
  background: ${(props) => props.$bgColor};
`;

const Simulator = ({ params }: { params: { id: string } }) => {
  useEffect(() => {
    if (params.id) {
      socket.emit("joinRoom", params.id);

      socket.on("joinedRoom", (room: string) => {
        console.log(`Joined room: ${room}`);
      });

      socket.on("messageToClient", (data: string) => {
        console.log(`Simulator ${params.id} received message:`, data);
      });

      return () => {
        socket.off("joinedRoom");
        socket.off("messageToClient");
      };
    }
  }, [params.id]);

  const useMapper = useMapperContext();

  return (
      <Main
        $bgColor={outline.backgroud}
        className={`w-full min-h-[100vh] relative`}
        >
        {switchNav(outline.nav?.type, {...outline.nav, isSelectMode: true, setSelectedElement: useMapper?.setSelectedElement})}
        {outline.sections?.map((section, index) => {
          return (
            <SectionContainer
              $bgColor={section.backgroud}
              $paddingTop={
                outline.nav && index === 0
                  ? navBarTopPosition[outline.nav.type]
                  : "0"
              }
              key={`${section.type}${section.subType}${index}`}
              className="w-full h-max"
            >
              {switchSection(section.type, section)}
            </SectionContainer>
          );
        })}
        <div className="md:text-[#fff] text-[red]"> Testing </div>
      </Main>
    );
};

export default Simulator;
