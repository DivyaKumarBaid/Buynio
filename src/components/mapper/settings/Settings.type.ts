import {
  GlobalInputIncomingType,
  InputTypeEnum,
} from "@/components/formComponents/types/input.types";
import { CAROUSEL_TYPE, NAV_TYPE, SECTION_TYPE } from "@/types/mapper.types";

// This file stores all the settings that can be mapped using JSON with keys as type and subtype.
// _CommonSettings -> Stores common values such as heading, description, etc.
// _TypeSettings -> Stores subtype-based settings.

export type SettingsMapperSubType = {
  heading: string;
  patchJson: (originalJson: Record<string,any>, json: Record<string, any>) => Record<string, any>;
  getJsonFromKey: (originalJson: Record<string,any>, index?:number) => Record<string,any>;
  inputs: GlobalInputIncomingType[];
};

export const defaultSettings = {
  input: [],
};

// General Settings
export const generalSettings = {
  [SECTION_TYPE.GENERAL]: {
    heading: "General Settings",
    patchJson: (originalJson:Record<string,any>, json: Record<string, any>) => {
      return {...originalJson,...json};
    },
    getJsonFromKey: (originalJson: Record<string,any>) => { return originalJson[SECTION_TYPE.GENERAL] },
    inputs: [
      {
        type: InputTypeEnum.TEXT_INPUT,
        placeholder: "Company's public name",
        regexMatch: /^[a-zA-Z0-9\s]{3,20}$/,
        name: "companyName",
        preText: "",
        postText: "",
        header: "Company Name",
        label: "",
        valueTransformer: (value: string) => value,
        showError: false,
        errorTextForRegex:
          "The name must contain at least 3 characters and at most 15 and must not include any special characters",
        maxLength: 20,
        required: true,
      },
    ],
  },
};

// Nav Common Settings
export const navCommonSettings = {
  heading: "Navbar Settings",
  patchJson: (originalJson: Record<string,any>, json: Record<string, any>) => {
    return { ...originalJson, [SECTION_TYPE.NAV_BAR]: {...originalJson[SECTION_TYPE.NAV_BAR],...json} };
  },
  getJsonFromKey: (originalJson: Record<string,any>) => { return originalJson[SECTION_TYPE.NAV_BAR] },
  inputs: [
    {
      type: InputTypeEnum.TOGGLE_BUTTON_INPUT,
      name: "isSticky",
      header: "Is Sticky",
      value: false, // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.COLOR_PICKET_INPUT,
      name: "background",
      header: "Background Color",
      value: "#FFFFFF", // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.COLOR_PICKET_INPUT,
      name: "headerFontColor",
      header: "Header Font Color",
      value: "#000000", // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.COLOR_PICKET_INPUT,
      name: "linkFontColor",
      header: "Link Font Color",
      value: "#000000", // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.TOGGLE_BUTTON_INPUT,
      name: "collapsable",
      header: "Collapsable",
      value: false, // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.TEXT_INPUT,
      name: "logo",
      placeholder: "Logo URL",
      preText: "",
      postText: "",
      header: "Logo URL",
      label: "",
      valueTransformer: (value: string) => value,
      showError: false,
      errorTextForRegex: "",
      regexMatch: null,
      required: false,
      value: "", // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.NUMBER_INPUT,
      name: "logoSize",
      placeholder: "Logo Size",
      preText: "",
      postText: "px",
      header: "Logo Size (px)",
      label: "",
      valueTransformer: (value: string) => value,
      showError: false,
      errorTextForRegex: "",
      regexMatch: null,
      required: false,
      maxLength: 3,
      value: "100", // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.TOGGLE_BUTTON_INPUT,
      name: "logoVisibility",
      header: "Logo Visibility",
      value: true, // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.TOGGLE_BUTTON_INPUT,
      name: "headerVisibility",
      header: "Header Visibility",
      value: true, // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.TEXT_INPUT,
      name: "brandName",
      placeholder: "Brand Name",
      preText: "",
      postText: "",
      header: "Brand Name",
      label: "",
      valueTransformer: (value: string) => value,
      showError: false,
      errorTextForRegex: "",
      regexMatch: null,
      required: true,
      value: "", // Default value, adjust as necessary
    },
  ],
};

// Carousel Common Settings
export const carouselCommonSettings = {
  heading: "Carousel Settings",
  patchJson: (originalJson: Record<string,any>, json: Record<string, any>) => {
    return { ...originalJson, [SECTION_TYPE.CAROUSEL]: {...originalJson[SECTION_TYPE.NAV_BAR],...json} };
  },
  getJsonFromKey: (originalJson: Record<string,any>, index: number) => { return originalJson.sections[index] },
  inputs: [
    {
      type: InputTypeEnum.TEXT_INPUT,
      placeholder: "Company's public name",
      regexMatch: /^[a-zA-Z0-9\s]{3,20}$/,
      name: "companyName",
      preText: "",
      postText: "",
      header: "Company Name",
      label: "",
      valueTransformer: (value: string) => value,
      showError: false,
      errorTextForRegex:
        "The name must contain at least 3 characters and at most 15 and must not include any special characters",
      maxLength: 20,
      required: true,
    },
  ],
};

// Carousel Type Settings
export const carouselTypeSettings = {
  [CAROUSEL_TYPE.CAROUSEL_V1]: {},
  [CAROUSEL_TYPE.CAROUSEL_V2]: {},
  [CAROUSEL_TYPE.CAROUSEL_V3]: {},
};

// NavBar Type Settings
export const navBarTypeSettings = {
  [NAV_TYPE.NAV_V1]: {
    ...navCommonSettings,
    inputs: [...navCommonSettings.inputs],
  },
  [NAV_TYPE.NAV_V2]: {
    ...navCommonSettings,
    inputs: [...navCommonSettings.inputs],
  },
  [NAV_TYPE.NAV_V3]: {
    ...navCommonSettings,
    inputs: [...navCommonSettings.inputs],
  },
};

// Settings Mapper Type
export interface SettingsMapperType {
  [SECTION_TYPE.GENERAL]: Record<string, any>;
  [SECTION_TYPE.NAV_BAR]: Record<string, any>;
  [SECTION_TYPE.CAROUSEL]: Record<string, any>;
}

// Settings Mapper
export const settingsMapper: SettingsMapperType = {
  [SECTION_TYPE.GENERAL]: generalSettings,
  [SECTION_TYPE.NAV_BAR]: navBarTypeSettings,
  [SECTION_TYPE.CAROUSEL]: carouselTypeSettings,
};
