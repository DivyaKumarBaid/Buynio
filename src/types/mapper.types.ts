export enum NAV_TYPE {
    NAV_V1 = "NAV_V1",
    NAV_V2 = "NAV_V2",
    NAV_V3 = "NAV_V3"
}

export enum SECTION_TYPE {
    CAROUSEL = "CAROUSEL"
}

export enum CAROUSEL_TYPE {
    CAROUSEL_V1 = "CAROUSEL_V1",
    CAROUSEL_V2 = "CAROUSEL_V2",
    CAROUSEL_V3 = "CAROUSEL_V3"
}

export type SectionType = {
    type: SECTION_TYPE,
    subType: CAROUSEL_TYPE,
    background: string,
    config: SectionConfigs
}

export type CarouselconfigsType = {
    images: string[]
}

export type SectionConfigs = CAROUSEL_TYPE
