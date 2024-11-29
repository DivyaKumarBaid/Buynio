import { JSONHeaders } from "@/types/mapper.types";

export const landerCommonSettings = {
  heading: "Hero Page",
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
    // {
    //     type: InputTypeEnum.IMAGE_UPLOADER,
    //     name: "src",
    //     required: true,
    //     error: "",
    //     tag: "General",
    //   }
  ]
};
