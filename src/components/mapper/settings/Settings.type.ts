import {
  GlobalInputIncomingType
} from "@/components/formComponents/types/input.types";
import { SECTION_TYPE } from "@/types/mapper.types";
import { carouselTypeSettings } from "./Carousel";
import { generalSettings } from "./General/GeneralSettings";
import { navBarTypeSettings } from "./Navbar";
import { productTypeSettings } from "./Product";

export type SettingsMapperSubType = {
  heading: string;
  patchJson: (
    originalJson: Record<string, any>,
    json: Record<string, any>,
    index?:number
  ) => Record<string, any>;
  getJsonFromKey: (
    originalJson: Record<string, any>,
    index?: number
  ) => Record<string, any>;
  onRemove?: (
    originalJson: Record<string, any>,
    index?: number
  ) => Record<string, any>;
  inputs: GlobalInputIncomingType[];
};

export interface SettingsMapperType {
  [SECTION_TYPE.GENERAL]: Record<string, any>;
  [SECTION_TYPE.NAV_BAR]: Record<string, any>;
  [SECTION_TYPE.CAROUSEL]: Record<string, any>;
  [SECTION_TYPE.PRODUCT]: Record<string, any>;
}

export const settingsMapper: SettingsMapperType = {
  [SECTION_TYPE.GENERAL]: generalSettings,
  [SECTION_TYPE.NAV_BAR]: navBarTypeSettings,
  [SECTION_TYPE.CAROUSEL]: carouselTypeSettings,
  [SECTION_TYPE.PRODUCT]: productTypeSettings,
};
