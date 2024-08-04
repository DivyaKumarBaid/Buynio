import { SECTION_TYPE } from "@/types/mapper.types";

export const getBackground = (section : Record<string,any>, defaultBackground: string) => {
    switch (section.type){
        case SECTION_TYPE.CAROUSEL:
            return section.config?.background || defaultBackground;
        case SECTION_TYPE.PRODUCT:
            return section.config?.background || defaultBackground;
        default:
            return defaultBackground;
    }
}