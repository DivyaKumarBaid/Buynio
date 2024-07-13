import { CarouselV1, CarouselV2 } from "@/components/mapper/carousel/Carousel";
import {
  NavbarV1,
  NavbarV2,
  NavbarV3,
} from "@/components/mapper/navbar/Navbar";
import { CAROUSEL_TYPE, NAV_TYPE, SECTION_TYPE } from "@/types/mapper.types";

export const switchNav = (type: string, props: any) => {
  switch (type) {
    case NAV_TYPE.NAV_V1:
      return <NavbarV1 {...props} />;
    case NAV_TYPE.NAV_V2:
      return <NavbarV2 {...props} />;
    case NAV_TYPE.NAV_V3:
      return <NavbarV3 {...props} />;
    default:
      return null;
  }
};

export const switchCarousel = (type: string, props: any) => {
  switch (type) {
    case CAROUSEL_TYPE.CAROUSEL_V1:
      return <CarouselV1 {...props} />;
    case CAROUSEL_TYPE.CAROUSEL_V2:
      return <CarouselV2 {...props} />;
    default:
      return null;
  }
};

export const switchSection = (type: string, props: any) => {
  switch (type) {
    case SECTION_TYPE.CAROUSEL:
      return switchCarousel(props.subType, props);
    default:
      return null;
  }
};
