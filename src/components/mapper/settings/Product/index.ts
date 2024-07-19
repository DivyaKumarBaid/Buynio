import { PRODUCT_TYPE } from "@/types/mapper.types";
import { productCommonSettings } from "./Common";

export const productTypeSettings = {
  [PRODUCT_TYPE.PRODUCT_V1]: {
    ...productCommonSettings,
    inputs: [...productCommonSettings.inputs],
  }
};
