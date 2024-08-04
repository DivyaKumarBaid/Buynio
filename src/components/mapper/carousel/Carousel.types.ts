import { CAROUSEL_TYPE, SECTION_TYPE } from "@/types/mapper.types";
import { SelectedElem } from "../hooks/selectedElemContext";

export type CarouselProps = {
  type: SECTION_TYPE.CAROUSEL;
  subType: CAROUSEL_TYPE;
  config: {
    background: string;
    autoplay: boolean;
    autoplaySpeed: number;
    interval: number;
    slideImages: {
      title: string;
      redirection: string;
      src: string;
    }[];
    sliderBtnColor: string;
  };
  isSelectMode?: boolean;
  setSelectedElement?: React.Dispatch<
    React.SetStateAction<SelectedElem | null>
  >;
  selected?: boolean;
};
