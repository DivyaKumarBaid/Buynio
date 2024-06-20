"use client";
import { useMapperContext } from "@/components/mapper/hooks/selectedElemContext";
import { navBarTopPosition } from "@/mapper/ComponentConstants";
import { switchNav, switchSection } from "@/mapper/ComponentMap";
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
      {/* {switchCarousel(outline.nav?.type, outline.nav)} */}
    </Main>
  );
};

export default Mapper;
