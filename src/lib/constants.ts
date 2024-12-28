import { OptionType } from "@/components/formComponents/types/input.types";
import { AddSectionType, SECTION_TYPE } from "@/types/mapper.types";

export const ACCESS_TOKEN_STALE_TIME = 1000 * 60 * 10; //this is in ms -> 10 mins
export const ACCESS_TOKEN_EXPIRY_LIMIT = 1000 * 60 * 12; //this is in ms -> 12 mins
export const GOOGLE_PROVIDER_ID = "google";
export const INSTAGRAM_PROVIDER_ID = "instagram";
export const CREDENTIAL_PROVIDER_ID = "credentials";
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
export const SiteName = "TheLocoop";

// url related stuff
export const unrestrictedPaths = [
  "/",
  "/home",
  "/home/login",
  "/home/signup",
  "/home/explore",
  "/home/categories",
  "/home/trending",
  "/home/brands",
  "/mapper",
];

export const restrictedPaths = [
  "/home/hop/create",
  "/home/hop",
  "/home/onboard"
]
export const restrictedPathsWithParams = [
  "/hops"
]

export const unrestrictedPathsWithParam = [
  "/home/signup/verify",
  "/hops/simulator",
];
export const loggedInRestrictedPaths = [
  "/home/login",
  "/home/signup",
  "/home/signup/verify",
];
export const hideSidebarPaths = ["/home/onboarding", "/hops/"];
export const hideSidebarPathsWithParam = ["/hops/simulator"];
export const autoHideSidebarPath = ["/home/mapper"];

export const fontFamilyOptions: OptionType[] = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Helvetica, sans-serif", label: "Helvetica" },
  { value: "Times New Roman, serif", label: "Times New Roman" },
  { value: "Verdana, sans-serif", label: "Verdana" },

  // Add more font family options as needed
];

export const addSectionOptions : AddSectionType = [
  {
    name: SECTION_TYPE.CAROUSEL,
    description: "Images you want your page to have",
  },
  {
    name: SECTION_TYPE.PRODUCT,
    description: "Add a product layout"
  },
  {
    name: SECTION_TYPE.LANDER,
    description: "Add a hero layout"
  }
];

export const sectionNameMapper = {
  [SECTION_TYPE.CAROUSEL]: "Carousel",
  [SECTION_TYPE.NAV_BAR]: "Navbar",
  [SECTION_TYPE.GENERAL]: "General",
  [SECTION_TYPE.PRODUCT]: "Product",
  [SECTION_TYPE.LANDER]: "Lander",
};
