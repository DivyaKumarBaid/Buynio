export enum NAV_TYPE {
    NAV_V1 = "NAV_V1",
    NAV_V2 = "NAV_V2",
    NAV_V3 = "NAV_V3"
}

export enum SECTION_TYPE {
    NAV_BAR = "NAVBAR",
    CAROUSEL = "CAROUSEL",
    GENERAL = "GENERAL",
    PRODUCT = "PRODUCT"
}

export enum CAROUSEL_TYPE {
    CAROUSEL_V1 = "CAROUSEL_V1",
    CAROUSEL_V2 = "CAROUSEL_V2",
    CAROUSEL_V3 = "CAROUSEL_V3"
}

export enum PRODUCT_TYPE {
    PRODUCT_V1 = "PRODUCT_V1",
}

export enum JSONHeaders {
    GENERAL = "GENERAL",
    NAVBAR = "NAV",
    SECTIONS = "SECTIONS"
}

export type SectionSubType = CAROUSEL_TYPE | NAV_TYPE | SECTION_TYPE.GENERAL

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
