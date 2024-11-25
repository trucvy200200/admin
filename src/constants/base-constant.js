import FlagVn from "@src/assets/images/icons/flag_vn.svg"
import FlagEn from "@src/assets/images/icons/flag_en.svg"

export const BASE_CONSTANT = {
  BASE_NAME: import.meta.env.VITE_APP_BASENAME,
  BASE_URL: import.meta.env.VITE_APP_BASE_URL,
  SYSTEM_URL: import.meta.env.VITE_APP_SYSTEM_URL
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

export const TRANSPORTATION_TYPE = {
  FLIGHT: "FLIGHT",
  CAR: "CAR"
}

export const PAYMENT_STATUS = {
  NEW_REQUEST: "NEW_REQUEST",
  DEPOSIT_ADVANCE: "DEPOSIT_ADVANCE",
  COMPLETED: "COMPLETED"
}

export const ORDER_STATUS = {
  WAITING_CONFIRM: "WAITING_CONFIRM",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  CANCELLED_BY_ADMIN: "CANCELLED_BY_ADMIN",
  REFUND_COMPLETED: "REFUND_COMPLETED"
}
