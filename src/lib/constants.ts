export const ACCESS_TOKEN_STALE_TIME = 1000 * 60 * 10; //this is in ms -> 10 mins
export const ACCESS_TOKEN_EXPIRY_LIMIT = 1000 * 60 * 12; //this is in ms -> 12 mins
export const GOOGLE_PROVIDER_ID = "google"
export const CREDENTIAL_PROVIDER_ID = "credentials"
export const PASSWORD_REGEX =
/^(?=.*[a-z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

// url related stuff
export const unrestrictedPaths = ['/','/home','/home/login','/home/signup','/home/explore','/home/categories','/home/trending','/home/brands', '/mapper'];
export const unrestrictedPathsWithParam = ['/home/signup/verify', '/mapper/editor', '/mapper/simulator'];
export const loggedInRestrictedPaths = ['/home/login','/home/signup','/home/signup/verify'];
export const hideSidebarPaths = ['/home/onboarding', '/mapper/']
export const hideSidebarPathsWithParam = ['/mapper/simulator']
export const autoHideSidebarPath = ['/home/mapper'];