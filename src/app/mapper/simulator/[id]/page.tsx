"use client";
import Loader from "@/components/general/Loader";
import { SelectedElem } from "@/components/mapper/hooks/selectedElemContext";
import { navBarTopPosition } from "@/mapper/ComponentConstants";
import { switchNav, switchSection } from "@/mapper/ComponentMap";
import { web as outline } from "@/utils/defaultWeb";
import socket from "@/utils/socket";
import React, { useEffect } from "react";
import styled from "styled-components";

const Main = styled.div<{ $bgColor: string }>`
  background: ${(props) => props.$bgColor};
`;

const SectionContainer = styled.div<{ $paddingTop: string; $bgColor: string }>`
  padding-top: ${(props) => props.$paddingTop};
  background: ${(props) => props.$bgColor};
`;

const Simulator = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    if (params.id) {
      socket.emit("joinRoom", params.id);

      socket.on("joinedRoom", (room: string) => {
        setLoading(false);
        console.log(`Simulator Joined room: ${room}`);
      });

      socket.on("messageToClient", (data: string) => {
        console.log(`Simulator ${params.id} received message:`, data);
      });

      socket.on("elemSelectedToClient", (data: SelectedElem) => {
        console.log(
          `Simulator ${params.id} received message on element selection:`,
          data
        );
      });

      return () => {
        socket.off("joinedRoom");
        socket.off("messageToClient");
      };
    }
  }, [params.id]);

  const handleElemSelection = (name: SelectedElem | null) => {
    socket.emit("elemSelectedToRoom", { room: params.id, message: name });
  };

  if (loading) return <Loader />;

  return (
    <Main
      $bgColor={outline.backgroud}
      className={`w-full min-h-[100vh] relative`}
    >
      {switchNav(outline.nav?.type, {
        ...outline.nav,
        isSelectMode: true,
        setSelectedElement: handleElemSelection,
      })}
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
    </Main>
  );
};

export default Simulator;
