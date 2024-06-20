import { InputTypeEnum } from "@/components/formComponents/types/input.types";
import { CAROUSEL_TYPE, NAV_TYPE, SECTION_TYPE } from "@/types/mapper.types";

export const defaultSettings = {
  input: [],
};

export const navCommonSettings = {
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
        "The name must contain atleast 3 characters and atmax 15 and must not include any special characters",
      maxLength: 20,
      required: true,
    },
  ],
};
export const carouselCommonSettings = {
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
        "The name must contain atleast 3 characters and atmax 15 and must not include any special characters",
      maxLength: 20,
      required: true,
    },
  ],
};

// carousel
export const carouselTypeSettings = {
  [CAROUSEL_TYPE.CAROUSEL_V1]: [],
  [CAROUSEL_TYPE.CAROUSEL_V2]: [],
  [CAROUSEL_TYPE.CAROUSEL_V3]: [],
};

// input
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

// settingsMapper = {
//   type: {
//     subType:
//   }
// }

export const settingsMapper = {
  [SECTION_TYPE.NAV_BAR]: { ...navBarTypeSettings },
  [SECTION_TYPE.CAROUSEL]: { ...carouselTypeSettings },
};
