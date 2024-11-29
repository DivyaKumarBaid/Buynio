import { LANDER_TYPE } from "@/types/mapper.types";
import { landerCommonSettings } from "./Common";

export const landerTypeSettings = {
  [LANDER_TYPE.LANDER_V1]: {
    ...landerCommonSettings,
    inputs: [...landerCommonSettings.inputs],
  }
};
