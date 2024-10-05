import { InputTypeEnum } from "@/components/formComponents/types/input.types";
import { JSONHeaders } from "@/types/mapper.types";

export const carouselCommonSettings = {
  heading: "Carousel Settings",
  patchJson: (
    originalJson: Record<string, any>,
    json: Record<string, any>,
    index: number
  ) => {
    return {
      ...originalJson,
      [JSONHeaders.SECTIONS]: originalJson[JSONHeaders.SECTIONS].map(
        (sect: Record<string, any>, i: number) =>
          i !== index ? sect : { ...sect, config: json }
      ),
    };
  },
  getJsonFromKey: (originalJson: Record<string, any>, index: number) => {
    return originalJson[JSONHeaders.SECTIONS][index].config;
  },
  onRemove: (originalJson: Record<string, any>, index: number) => {
    return {
      ...originalJson,
      [JSONHeaders.SECTIONS]: originalJson[JSONHeaders.SECTIONS].filter(
        (_: any, i: number) => i !== index
      ),
    };
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
      value: "5000", // Default value, adjust as necessary
    },
    {
      type: InputTypeEnum.MULTI_TEXT_MULTI_INPUT,
      name: "slideImages",
      placeholder: "Slide Images",
      header: "Slide Images",
      subHeading: "Enter the details for each slide image",
      tag: "Slides",
      valueTransformer: (value: string) => value,
      showError: false,
      errorTextForRegex: "",
      regexMatch: null,
      required: true,
      maximunFields: 10,
      structure: [
        {
          type: InputTypeEnum.TEXT_INPUT,
          name: "title",
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
          type: InputTypeEnum.TEXT_INPUT,
          name: "redirection",
          placeholder: "Redirection URL",
          preText: "",
          postText: "",
          header: "Redirection URL",
          subHeading: "Enter the URL to redirect to when the slide is clicked",
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
          type: InputTypeEnum.TEXT_INPUT,
          name: "src",
          placeholder: "Image Source URL",
          preText: "",
          postText: "",
          header: "Image Source URL",
          subHeading: "Enter the source URL for the slide image",
          label: "",
          tag: "Slides",
          valueTransformer: (value: string) => value,
          showError: false,
          errorTextForRegex: "",
          regexMatch: null,
          required: false,
          value: "", // Default value, adjust as necessary
        },
      ],
    },
    {
      type: InputTypeEnum.COLOR_PICKER_INPUT,
      name: "sliderBtnColor",
      header: "Slider Button Color",
      subHeading: "Set the color of the slider buttons",
      tag: "General",
      value: "#fff", // Default value, adjust as necessary
      flexEnd: true,
    },
    {
      type: InputTypeEnum.COLOR_PICKER_INPUT,
      name: "background",
      header: "Background",
      subHeading: "Section background",
      tag: "General",
      value: "#000", // Default value, adjust as necessary
      flexEnd: true,
    },
  ],
};
