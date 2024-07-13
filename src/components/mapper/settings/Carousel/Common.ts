import { InputTypeEnum } from "@/components/formComponents/types/input.types";
import { SECTION_TYPE } from "@/types/mapper.types";

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
        subHeading:
          "Enable infinite loop (loop back to start after the last slide)",
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