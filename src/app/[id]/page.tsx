"use client";
import Loader from "@/components/general/Loader";
import { getBackground } from "@/components/mapper/settings/settingUtils";
import { fetchPublishedHopsFromLink } from "@/lib/keys";
import { navBarTopPosition } from "@/mapper/ComponentConstants";
import { switchNav, switchSection } from "@/mapper/ComponentMap";
import { getHopFromLink } from "@/service/hop";
import { JSONHeaders, SECTION_TYPE } from "@/types/mapper.types";
import { dummyUpdateConfigFuncs } from "@/utils/utility";
import { useQuery } from "@tanstack/react-query";
import React from "react";
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

  const { data: webJson_, isLoading } = useQuery({
    queryKey: [fetchPublishedHopsFromLink],
    queryFn: () => getHopFromLink(params.id),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const [webJson, setWebJson] = React.useState<Record<string, any> | null>(
    null
  );

  React.useEffect(() => {
    if (webJson_) setWebJson(JSON.parse(webJson_.blueprint));
  }, [isLoading]);

  if (isLoading || webJson == null) return <Loader />;
  const generalSettings = webJson[SECTION_TYPE.GENERAL];

  return (
    <Main
      $bgColor={generalSettings.background}
      $fontFamily={generalSettings.headingFontFamily}
      $baseFontSize={generalSettings.baseFontSize}
      className="w-full min-h-[100vh] relative"
    >
      {switchNav(webJson[SECTION_TYPE.NAV_BAR]?.type, {
        ...webJson?.[SECTION_TYPE.NAV_BAR],
        isSelectMode: false,
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
                  isSelectMode: false,
                },
                dummyUpdateConfigFuncs()
              )}
            </SectionContainer>
          );
        }
      )}
    </Main>
  );
};

export default Simulator;
