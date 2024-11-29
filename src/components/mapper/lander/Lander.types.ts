import { LANDER_TYPE, SECTION_TYPE } from "@/types/mapper.types";
import { SelectedElem } from "../hooks/useEditor";
import { UpdateConfigFuncs } from "../types";

export type LanderProps = {
    type: SECTION_TYPE.LANDER;
    subType: LANDER_TYPE;
    config: LanderConfig;
    isSelectMode?: boolean;
    setSelectedElement?: React.Dispatch<
      React.SetStateAction<SelectedElem | null>
    >;
    changeConfig?: (config:LanderConfig) => void
    selected?: boolean;
    updateFuncs : UpdateConfigFuncs;
}

export type LanderConfig = {
    src: string | File;
}