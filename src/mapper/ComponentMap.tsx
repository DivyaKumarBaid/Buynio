import { CarouselV1, CarouselV2 } from "@/components/mapper/carousel/Carousel";
import { LanderProps } from "@/components/mapper/lander/Lander.types";
import Lander_V1 from "@/components/mapper/lander/Lander_V1";
import {
  NavbarV1,
  NavbarV2,
  NavbarV3,
} from "@/components/mapper/navbar/Navbar";
import { ProductProps } from "@/components/mapper/product/Product.types";
import Product_V1 from "@/components/mapper/product/Product_V1";
import { UpdateConfigFuncs } from "@/components/mapper/types";
import {
  CAROUSEL_TYPE,
  LANDER_TYPE,
  NAV_TYPE,
  PRODUCT_TYPE,
  SECTION_TYPE,
} from "@/types/mapper.types";

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

export const switchProduct = (
  type: string,
  props: ProductProps,
  updateFuncs: UpdateConfigFuncs
) => {
  switch (type) {
    case PRODUCT_TYPE.PRODUCT_V1:
      return <Product_V1 {...props} updateFunc={updateFuncs} />;
    default:
      return null;
  }
};

export const switchLander = (
  type: string,
  props: LanderProps,
  updateFuncs: UpdateConfigFuncs
) => {
  switch (type) {
    case LANDER_TYPE.LANDER_V1:
      return <Lander_V1 {...props} updateFuncs={updateFuncs}/>;
    default:
      return null;
  }
};

export const switchSection = (
  type: string,
  props: Record<string, any>,
  updateFuncs: UpdateConfigFuncs
) => {
  switch (type) {
    case SECTION_TYPE.CAROUSEL:
      return switchCarousel(props.subType, props);
    case SECTION_TYPE.PRODUCT:
      return switchProduct(props.subType, props as ProductProps, updateFuncs);
    case SECTION_TYPE.LANDER:
      return switchLander(props.subType, props as LanderProps, updateFuncs);
    default:
      return null;
  }
};
