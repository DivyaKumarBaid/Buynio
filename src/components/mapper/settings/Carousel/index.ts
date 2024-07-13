import { CAROUSEL_TYPE } from "@/types/mapper.types";
import { carouselCommonSettings } from "./Common";

export const carouselTypeSettings = {
  [CAROUSEL_TYPE.CAROUSEL_V1]: {
    ...carouselCommonSettings,
    inputs: [...carouselCommonSettings.inputs],
  },
  [CAROUSEL_TYPE.CAROUSEL_V2]: {
    ...carouselCommonSettings,
    inputs: [...carouselCommonSettings.inputs],
  },
  [CAROUSEL_TYPE.CAROUSEL_V3]: {
    ...carouselCommonSettings,
    inputs: [...carouselCommonSettings.inputs],
  },
};
