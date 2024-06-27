"use client";
import { navBarTopPosition } from "@/mapper/ComponentConstants";
import { switchNav, switchSection } from "@/mapper/ComponentMap";
import { SECTION_TYPE } from "@/types/mapper.types";
import { web as outline } from "@/utils/defaultWeb";
import styled from "styled-components";

const Main = styled.div<{ $bgColor: string }>`
  background: ${(props) => props.$bgColor};
`;

const SectionContainer = styled.div<{ $paddingTop: string; $bgColor: string }>`
  padding-top: ${(props) => props.$paddingTop};
  background: ${(props) => props.$bgColor};
`;
const Mapper = () => {
  // const useMapper = useMapperContext();
  return (
    <Main
      $bgColor={outline[SECTION_TYPE.GENERAL].backgroud}
      className={`w-full min-h-[100vh] relative`}
    >
      {switchNav(outline[SECTION_TYPE.NAV_BAR]?.type, {
        ...outline[SECTION_TYPE.NAV_BAR]
      })}
      {outline.sections?.map((section, index) => {
        return (
          <SectionContainer
            $bgColor={section.backgroud}
            $paddingTop={
              outline[SECTION_TYPE.NAV_BAR] && index === 0
                ? navBarTopPosition[outline[SECTION_TYPE.NAV_BAR].type]
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

export default Mapper;
