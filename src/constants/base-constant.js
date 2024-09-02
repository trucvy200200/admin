import FlagVn from "@src/assets/images/icons/flag_vn.svg"
import FlagEn from "@src/assets/images/icons/flag_en.svg"

export const BASE_CONSTANT = {
  BASE_NAME: import.meta.env.VITE_APP_BASENAME,
  BASE_URL_USER: import.meta.env.VITE_APP_BASE_URL_USER,
  BASE_URL_PAYMENT: import.meta.env.VITE_APP_BASE_URL_PAYMENT,
  BASE_URL_SYSTEM: import.meta.env.VITE_APP_BASE_URL_SYSTEM,
  BASE_URL_SYSTEM_WOLTECH: import.meta.env.VITE_APP_BASE_URL_SYSTEM_WOLTECH,
  BASE_URL_PRODUCT: import.meta.env.VITE_APP_BASE_URL_PRODUCT,
  BASE_URL_ENTERPRISE: import.meta.env.VITE_APP_BASE_URL_ENTERPRISE,
  BASE_URL: import.meta.env.VITE_APP_BASE_URL,
  BASE_URL_IMAGE: import.meta.env.VITE_APP_BASE_URL_IMAGE,
  BASE_URL_ENTERPRISE_ADMIN_SITE: import.meta.env.VITE_APP_BASE_URL_ENTERPRISE_ADMIN_SITE,
  BASE_WS: import.meta.env.VITE_APP_BASE_WS,
  SECRET_KEY: import.meta.env.VITE_APP_SECRET_KEY,
  SITE_KEY: import.meta.env.VITE_APP_SITE_KEY,
  GEOLOCATION_URL: import.meta.env.VITE_APP_GEOLOCATION_URL
}

export const BASE_FIREBASE = {
  FIRE_API_KEY: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  FIRE_AUTH_DOMAIN: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  FIRE_PROJECT_ID: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  FIRE_STORAGE_BUCKET: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  FIRE_MESSAGING_SENDER_ID: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  FIRE_APP_ID: import.meta.env.VITE_APP_FIREBASE_APP_ID
}

export const DEPOSIT_MULTIPLE = 100

export const IMAGE_SIZE_MAX = 8192

export const PDF_SIZE_MAX = 5000000

export const IMAGE_LENGTH_MAX = 5

export const LANGUAGES = {
  EN: "en",
  VI: "vi"
}

export const FULL_NAME_LANGUAGES = {
  VIET_NAM: "Vietnam",
  ENGLISH: "English"
}

export const FLAG_LANGUAGES = {
  VIET_NAM: FlagVn,
  ENGLISH: FlagEn
}

export const LANGUAGE_OPTIONS = [
  { label: "English", value: "en", flag: FlagEn },
  { label: "Vietnam", value: "vi", flag: FlagVn }
]

export const DATE_OPTIONS = (t) => [
  { label: t("Week"), value: 1 },
  { label: t("Month"), value: 2 },
  { label: t("Year"), value: 3 }
]

export const DATE = {
  WEEK: 1,
  MONTH: 2,
  YEAR: 3,
  RANGE_DATE: 4
}

export const USER_VERIFIED_ACTION_BY = {
  ADMIN: "ADMIN",
  SYSTEM: "SYSTEM"
}

export const TRANSACTION_VERIFIED_ACTION_BY = {
  ADMIN: "ADMIN",
  SYSTEM: "SYSTEM"
}

export const CHECK_IN_STATUS = {
  ALREADY_CHECKED_IN: "Already checked in",
  NOT_FOUND_USER: "Not found user",
  NOT_FOUND_EVENT: "Not found event",
  NOT_FOUND_USER_EVENT: "Not found user event"
}

export const ENTERPRISE_CONTRACT_TYPE = {
  CONTRACT: "contract",
  CERTIFICATION: "certification"
}

export const CONTRACT_STATUS = {
  REJECTED: "REJECTED",
  PENDING: "PENDING",
  VERIFIED: "VERIFIED"
}
