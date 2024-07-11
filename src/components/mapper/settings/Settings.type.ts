import {
  GlobalInputIncomingType,
  InputTypeEnum,
} from "@/components/formComponents/types/input.types";
import { fontFamilyOptions } from "@/lib/constants";
import { CAROUSEL_TYPE, NAV_TYPE, SECTION_TYPE } from "@/types/mapper.types";

export type SettingsMapperSubType = {
  heading: string;
  patchJson: (
    originalJson: Record<string, any>,
    json: Record<string, any>
  ) => Record<string, any>;
  getJsonFromKey: (
    originalJson: Record<string, any>,
    index?: number
  ) => Record<string, any>;
  inputs: GlobalInputIncomingType[];
};

export const defaultSettings = {
  input: [],
};

export const generalSettings = {
  [SECTION_TYPE.GENERAL]: {
    heading: "General Settings",
    patchJson: (
      originalJson: Record<string, any>,
      json: Record<string, any>
    ) => {
      return { ...originalJson, ...json };
    },
    getJsonFromKey: (originalJson: Record<string, any>) => {
      return originalJson[SECTION_TYPE.GENERAL];
    },
    inputs: [
      {
        type: InputTypeEnum.COLOR_PICKET_INPUT,
        flexEnd: true,
        name: "backgroundColor",
        header: "Background Color",
        subHeading: "Choose the background color for the webpage",
        tag: "Appearance",
        required: true, // Adjust as necessary
      },
      {
        type: InputTypeEnum.COLOR_PICKET_INPUT,
        flexEnd: true,
        name: "headingFontColor",
        header: "Heading Font Color",
        subHeading: "Select the font color for headings",
        tag: "Appearance",
        required: true, // Adjust as necessary
      },
      {
        type: InputTypeEnum.COLOR_PICKET_INPUT,
        flexEnd: true,
        name: "paragraphFontColor",
        header: "Paragraph Font Color",
        subHeading: "Select the font color for paragraph text",
        tag: "Appearance",
        required: true, // Adjust as necessary
      },
      {
        type: InputTypeEnum.DROPDOWN_INPUT,
        name: "headingFontFamily",
        header: "Heading Font Family",
        preText: "",
        postText: "",
        subHeading: "Select the font family for headings",
        tag: "Typography",
        required: true, // Adjust as necessary
        multiSelect: false,
        options: fontFamilyOptions,
      },
      {
        type: InputTypeEnum.DROPDOWN_INPUT,
        name: "paragraphFontFamily",
        header: "Paragraph Font Family",
        preText: "",
        postText: "",
        subHeading: "Select the font family for paragraph text",
        tag: "Typography",
        required: true, // Adjust as necessary
        multiSelect: false,
        options: fontFamilyOptions,
      },
      {
        type: InputTypeEnum.NUMBER_INPUT,
        name: "baseFontSize",
        placeholder: "Base Font Size",
        preText: "",
        postText: "px",
        header: "Base Font Size",
        subHeading: "Specify the base font size for the webpage",
        tag: "Typography",
        valueTransformer: (value: string) => value,
        showError: false,
        errorTextForRegex: "",
        regexMatch: null,
        required: true, // Adjust as necessary
        maxLength: 3,
      },
      {
        type: InputTypeEnum.MULTI_TEXT_INPUT,
        name: "customCSSClasses",
        placeholder: "CSS Class",
        preText: "",
        postText: "",
        valueTransformer: (value: string) => value,
        showError: false,
        errorTextForRegex: "",
        regexMatch: null,
        required: false,
        maximunFields: 10,
        label: "Custom CSS Classes",
        subHeading: "Add custom CSS classes for additional styling",
        tag: "Advanced",
      },
      {
        type: InputTypeEnum.MULTI_TEXT_MULTI_INPUT,
        name: "metaTags",
        label: "Meta Tags",
        required: false,
        maximunFields: 5,
        structure: [
          {
            type: InputTypeEnum.TEXT_INPUT,
            name: "metaTagKey",
            placeholder: "Meta Tag Key",
            preText: "",
            postText: "",
            header: "Meta Tag Key",
            label: "",
            valueTransformer: (value: string) => value,
            showError: false,
            errorTextForRegex: "",
            regexMatch: null,
            required: true,
          },
          {
            type: InputTypeEnum.TEXT_INPUT,
            name: "metaTagValue",
            placeholder: "Meta Tag Value",
            preText: "",
            postText: "",
            header: "Meta Tag Value",
            label: "",
            valueTransformer: (value: string) => value,
            showError: false,
            errorTextForRegex: "",
            regexMatch: null,
            required: true,
          },
        ],
        subHeading: "Add custom meta tags for SEO purposes",
        tag: "SEO",
      },
    ],
  },
};

export const navCommonSettings = {
  heading: "Navbar Settings",
  patchJson: (originalJson: Record<string, any>, json: Record<string, any>) => {
    return {
      ...originalJson,
      [SECTION_TYPE.NAV_BAR]: {
        ...originalJson[SECTION_TYPE.NAV_BAR],
        ...json,
      },
    };
  },
  getJsonFromKey: (originalJson: Record<string, any>) => {
    return originalJson[SECTION_TYPE.NAV_BAR];
  },
  inputs: [
    {
      type: InputTypeEnum.TOGGLE_BUTTON_INPUT,
      flexEnd: true,
      name: "isSticky",
      header: "Is Sticky",
      subHeading: "Fix the navbar at the top",
      tag: "General",
    },
    {
      type: InputTypeEnum.COLOR_PICKET_INPUT,
      flexEnd: true,
      name: "background",
      header: "Background Color",
      subHeading: "Choose the navbar background color",
      tag: "Appearance",
    },
    {
      type: InputTypeEnum.COLOR_PICKET_INPUT,
      flexEnd: true,
      name: "headerFontColor",
      header: "Header Font Color",
      subHeading: "Select the font color for the header",
      tag: "Appearance",
    },
    {
      type: InputTypeEnum.COLOR_PICKET_INPUT,
      flexEnd: true,
      name: "linkFontColor",
      header: "Link Font Color",
      subHeading: "Pick the color for the links",
      tag: "Appearance",
    },
    {
      type: InputTypeEnum.TOGGLE_BUTTON_INPUT,
      flexEnd: true,
      name: "collapsable",
      header: "Collapsable",
      subHeading: "In Mobile view, use sidebar",
      tag: "General",
    },
    {
      type: InputTypeEnum.TEXT_INPUT,
      name: "logo",
      placeholder: "Logo URL",
      preText: "",
      postText: "",
      header: "Logo URL",
      subHeading: "Enter the URL for the logo",
      label: "",
      tag: "Logo",
      valueTransformer: (value: string) => value,
      showError: false,
      errorTextForRegex: "",
      regexMatch: null,
      required: false,
    },
    {
      type: InputTypeEnum.NUMBER_INPUT,
      name: "logoSize",
      placeholder: "Logo Size",
      preText: "",
      postText: "px",
      header: "Logo Size (px)",
      subHeading: "Specify the size of the logo in pixels",
      label: "",
      tag: "Logo",
      valueTransformer: (value: string) => value,
      showError: false,
      errorTextForRegex: "",
      regexMatch: null,
      required: false,
      maxLength: 3,
    },
    {
      type: InputTypeEnum.TOGGLE_BUTTON_INPUT,
      flexEnd: true,
      name: "logoVisibility",
      header: "Logo Visibility",
      subHeading: "Show or hide the logo",
      tag: "Logo",
    },
    {
      type: InputTypeEnum.TOGGLE_BUTTON_INPUT,
      flexEnd: true,
      name: "headerVisibility",
      header: "Header Visibility",
      subHeading: "Show or hide the header",
      tag: "General",
    },
    {
      type: InputTypeEnum.MULTI_TEXT_MULTI_INPUT,
      name: "navLinks",
      label: "Navigation Links",
      required: true,
      maximunFields: 10,
      structure: [
        {
          type: InputTypeEnum.TEXT_INPUT,
          name: "linkText",
          placeholder: "Link Text",
          preText: "",
          postText: "",
          header: "Link Text",
          label: "",
          valueTransformer: (value: string) => value,
          showError: false,
          errorTextForRegex: "",
          regexMatch: null,
          required: true,
        },
        {
          type: InputTypeEnum.TEXT_INPUT,
          name: "linkURL",
          placeholder: "Link URL",
          preText: "",
          postText: "",
          header: "Link URL",
          label: "",
          valueTransformer: (value: string) => value,
          showError: false,
          errorTextForRegex: "",
          regexMatch: null,
          required: true,
        },
      ],
      subHeading: "Add navigation links and their URLs",
      tag: "Links",
    },
    {
      type: InputTypeEnum.COLOR_PICKET_INPUT,
      flexEnd: true,
      name: "hoverLinkColor",
      header: "Hover Link Color",
      subHeading: "Pick the color for the links when hovered over",
      tag: "Appearance",
    },
  ],
};

export const carouselCommonSettings = {
  heading: "Carousel Settings",
  patchJson: (originalJson: Record<string, any>, json: Record<string, any>) => {
    return {
      ...originalJson,
      [SECTION_TYPE.CAROUSEL]: {
        ...originalJson[SECTION_TYPE.NAV_BAR],
        ...json,
      },
    };
  },
  getJsonFromKey: (originalJson: Record<string, any>, index: number) => {
    return originalJson.sections[index];
  },
  inputs: [
  
    {
      type: InputTypeEnum.TOGGLE_BUTTON_INPUT,
      flexEnd: true,
      name: "autoplay",
      header: "Autoplay",
      subHeading: "Enable automatic sliding",
      tag: "General",
      value: true, // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.NUMBER_INPUT,
      name: "autoplaySpeed",
      placeholder: "Autoplay Speed",
      preText: "",
      postText: "ms",
      header: "Autoplay Speed",
      subHeading: "Specify the speed of automatic sliding in milliseconds",
      label: "",
      tag: "General",
      valueTransformer: (value: string) => value,
      showError: false,
      errorTextForRegex: "",
      regexMatch: null,
      required: false,
      value: "3000", // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.TOGGLE_BUTTON_INPUT,
      flexEnd: true,
      name: "navigation",
      header: "Navigation Controls",
      subHeading: "Show navigation controls (dots or arrows)",
      tag: "General",
      value: true, // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.TOGGLE_BUTTON_INPUT,
      flexEnd: true,
      name: "infiniteLoop",
      header: "Infinite Loop",
      subHeading: "Enable infinite loop (loop back to start after the last slide)",
      tag: "General",
      value: true, // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.MULTI_TEXT_INPUT,
      name: "slideImages",
      placeholder: "Slide Images URLs",
      preText: "",
      postText: "",
      label: "Slide Images",
      tag: "Slides",
      valueTransformer: (value: string) => value,
      showError: false,
      errorTextForRegex: "",
      regexMatch: null,
      required: true,
      maximunFields: 10, // Maximum number of slide images allowed
    },
    {
      type: InputTypeEnum.TEXT_INPUT,
      name: "slideTitle",
      placeholder: "Slide Title",
      preText: "",
      postText: "",
      header: "Slide Title",
      subHeading: "Enter the title for the slide",
      label: "",
      tag: "Slides",
      valueTransformer: (value: string) => value,
      showError: false,
      errorTextForRegex: "",
      regexMatch: null,
      required: false,
      value: "", // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.TEXT_AREA_INPUT,
      name: "slideDescription",
      placeholder: "Slide Description",
      header: "Slide Description",
      label: "",
      tag: "Slides",
      valueTransformer: (value: string) => value,
      showError: false,
      errorTextForRegex: "",
      regexMatch: null,
      required: false,
      rows: 3, // Number of rows for the text area
      value: "", // Default value, adjust as necessary
    },
  ],
};

export const carouselTypeSettings = {
  [CAROUSEL_TYPE.CAROUSEL_V1]: {},
  [CAROUSEL_TYPE.CAROUSEL_V2]: {},
  [CAROUSEL_TYPE.CAROUSEL_V3]: {},
};

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

export interface SettingsMapperType {
  [SECTION_TYPE.GENERAL]: Record<string, any>;
  [SECTION_TYPE.NAV_BAR]: Record<string, any>;
  [SECTION_TYPE.CAROUSEL]: Record<string, any>;
}

export const settingsMapper: SettingsMapperType = {
  [SECTION_TYPE.GENERAL]: generalSettings,
  [SECTION_TYPE.NAV_BAR]: navBarTypeSettings,
  [SECTION_TYPE.CAROUSEL]: carouselTypeSettings,
};
