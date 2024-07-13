import { InputTypeEnum } from "@/components/formComponents/types/input.types";
import { fontFamilyOptions } from "@/lib/constants";
import { SECTION_TYPE } from "@/types/mapper.types";

export const generalSettings = {
  [SECTION_TYPE.GENERAL]: {
    heading: "General Settings",
    patchJson: (
      originalJson: Record<string, any>,
      json: Record<string, any>
    ) => {
      return {
        ...originalJson,
        [SECTION_TYPE.GENERAL]: {
          ...originalJson[SECTION_TYPE.GENERAL],
          ...json,
        },
      };
    },
    getJsonFromKey: (originalJson: Record<string, any>) => {
      return originalJson[SECTION_TYPE.GENERAL];
    },
    inputs: [
      {
        type: InputTypeEnum.COLOR_PICKET_INPUT,
        flexEnd: true,
        name: "background",
        header: "Background Color",
        subHeading: "Choose the background color for the webpage",
        tag: "Appearance",
        required: true, // Adjust as necessary
      },
      {
        type: InputTypeEnum.TOGGLE_BUTTON_INPUT,
        flexEnd: true,
        name: "isNavVisible",
        header: "Show Navbar",
        subHeading: "Have a navbar on your page",
        tag: "General",
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
        flexEnd: true,
        type: InputTypeEnum.COLOR_PICKET_INPUT,
        name: "scrollbarColor",
        header: "Scrollbar Color",
        subHeading: "Choose the color for the scrollbar",
        tag: "Appearance",
        required: false,
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
        name: "baseFontSize",
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
        maximunFields: 1, // Increased limit for more flexibility
        structure: [
          {
            type: InputTypeEnum.TEXT_INPUT,
            name: "title",
            placeholder: "Meta Tag for title",
            preText: "",
            postText: "",
            header: "",
            label: "Title Meta",
            valueTransformer: (value: string) => value,
            showError: false,
            errorTextForRegex: "",
            regexMatch: null,
            required: false,
          },
          {
            type: InputTypeEnum.TEXT_INPUT,
            name: "description",
            placeholder: "Meta Tag for description",
            preText: "",
            postText: "",
            header: "",
            label: "Description Meta",
            valueTransformer: (value: string) => value,
            showError: false,
            errorTextForRegex: "",
            regexMatch: null,
            required: false,
          }
        ],
        subHeading: "Add custom meta tags for SEO purposes",
        tag: "Advance SEO",
      },
    ],
  },
};
