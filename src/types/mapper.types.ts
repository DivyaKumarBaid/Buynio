export enum NAV_TYPE {
    NAV_V1 = "NAV_V1",
    NAV_V2 = "NAV_V2",
    NAV_V3 = "NAV_V3"
}

export enum SECTION_TYPE {
    NAV_BAR = "NAVBAR",
    CAROUSEL = "CAROUSEL"
}

export enum CAROUSEL_TYPE {
    CAROUSEL_V1 = "CAROUSEL_V1",
    CAROUSEL_V2 = "CAROUSEL_V2",
    CAROUSEL_V3 = "CAROUSEL_V3"
}

export enum JSONHeaders {
    OUTER = "outer",
    NAV = "nav",
    SECTION = "sections",
    HEADER_CONFIG = "headerConfig",
    TEXT_CONFIG = "textConfig"
}

export type SectionSubType = CAROUSEL_TYPE | NAV_TYPE

export type SectionType = {
    type: SECTION_TYPE,
    subType: SectionSubType,
    background: string,
    config: SectionConfigs
}

export type CarouselconfigsType = {
    images: string[]
}

export type SectionConfigs = CAROUSEL_TYPE
