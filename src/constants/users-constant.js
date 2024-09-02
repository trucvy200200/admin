export const ROLE_POSITION = {
  NORMAL: 0,
  SYSTEM_ADMIN: 1,
  IT_SUPPORT: 2,
  SPONSOR: 3
}

export const ROLES = {
  USER: "User",
  ADMIN: "Admin"
}

export const STATUS_FILTER = [
  { value: "", label: "All" },
  { value: -1, label: "Not verify" },
  { value: 0, label: "Not KYC" },
  { value: 1, label: "Waiting confirmation" },
  { value: 2, label: "Active" },
  { value: 3, label: "Blocked" }
]

export const STATUS_ENUM = {
  NOT_VERIFY: -1,
  NOT_KYC: 0,
  WAITING_CONFIRMATION: 1,
  ACTIVE: 2,
  BLOCKED: 3,
  REJECT_KYC: 4,
  SUSPEND: 5
}

export const USER_STATUS = {
  NOT_VERIFY: "NOT VERIFIED",
  NOT_KYC: "NOT KYC",
  WAITING_CONFIRMATION: "WAITING CONFIRMATION",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  BLOCKED: "BLOCKED",
  REJECT_KYC: "REJECT KYC"
}

export const STATUS_USER_FILTER = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "DELETED", label: "Deleted" }
]

export const STATUS_USER = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" }
]

export const STATUS_CONSTANT = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  DELETED: "DELETED"
}

export const LOGIN_TYPE = {
  INCORRECT: -2,
  NOT_FOUND_USER: -3,
  USER_BLOCK: -1
}

export const TICKET_CONSTANT = {
  DEPOSIT: "DEPOSIT",
  UPDATE_USER: "UPDATE_USER",
  SYSTEM_ISSUE: "SYSTEM_ISSUE"
}

export const TICKET_STATUS = {
  NEW_REQUEST: "NEW REQUEST",
  COMPLETED: "COMPLETED",
  PROCESSING: "PROCESSING",
  CANCELLED: "CANCELLED",
  REJECTED: "REJECTED",
  EXPIRED: "EXPIRED",
  SYSTEM_ADMIN_COMPLETED: "SYSTEM_ADMIN_COMPLETED" //for ticket with deposit type
}

export const TICKET_STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "NEW REQUEST", label: "New request" },
  { value: "PROCESSING", label: "In process" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "REJECTED", label: "Rejected" },
  { value: "EXPIRED", label: "Expired" }
]

export const REGISTER_STEP_ENUM = {
  STEP_INFO_REGISTER: "step_1",
  STEP_INFO_PERSONAL: "step_2",
  STEP_ID_CARD_AUTHENTICATION: "step_3",
  STEP_FACE_AUTHENTICATION: "step_4",
  STEP_WAITING_CONFIRMATION: "step_5"
}

export const STEP_INFO_REGISTER = [
  {
    value: "email",
    label: "Email"
  },
  {
    value: "country",
    label: "Country"
  },
  {
    value: "phone",
    label: "Phone number"
  }
]

export const STEP_INFO_PERSONAL = [
  {
    value: "full_name",
    label: "Full name"
  },
  {
    value: "gender",
    label: "Gender"
  },
  {
    value: "birthday",
    label: "Birthday"
  },
  {
    value: "card_id",
    label: "ID Card"
  },
  {
    value: "address",
    label: "Address"
  }
]

export const STEP_ID_CARD_AUTHENTICATION = [
  {
    value: "front_card_url",
    label: "The front of id card"
  },
  {
    value: "back_card_url",
    label: "The back of id card"
  }
]

export const STEP_FACE_AUTHENTICATION = [
  {
    value: "face_url",
    label: "Face portrait authentication"
  }
]

export const REGISTER_KYC_STEPS = [
  {
    value: REGISTER_STEP_ENUM.STEP_INFO_PERSONAL,
    label: "Personal information",
    items: STEP_INFO_PERSONAL
  },
  {
    value: REGISTER_STEP_ENUM.STEP_ID_CARD_AUTHENTICATION,
    label: "ID card authentication",
    items: STEP_ID_CARD_AUTHENTICATION
  },
  {
    value: REGISTER_STEP_ENUM.STEP_FACE_AUTHENTICATION,
    label: "Face portrait authentication",
    items: STEP_FACE_AUTHENTICATION
  }
]

export const REGISTER_STEP = [
  {
    value: REGISTER_STEP_ENUM.STEP_INFO_REGISTER,
    label: "Basic information",
    items: STEP_INFO_REGISTER
  }
]

export const USER_IMAGE_TYPE = {
  FACE_ID: "FACE_ID",
  BACK_CARD: "BACK_CARD",
  FRONT_CARD: "FRONT_CARD"
}

export const UPDATE_TYPE = {
  REJECTED: "REJECTED",
  VERIFIED: "VERIFIED",
  UPDATE_INFO: "UPDATE_INFO",
  BLOCK: "BLOCK",
  UNBLOCK: "UNBLOCK",
  UPDATE_IMAGE_KYC: "UPDATE_IMAGE_KYC",
  SUSPEND_USER: "SUSPEND_USER",
  TURN_OFF_TWO_FACTOR: "TURN_OFF_TWO_FACTOR"
}

export const USER_INFO_KEYWORD = ["user-username", "user-full_name", "user-email"]
export const RECEIVER_INFO_KEYWORD = ["receiver-username", "receiver-full_name", "receiver-email"]

export const TABS_HEADER_INFO = [
  {
    id: "1",
    type: "PERSONAL_INFO",
    label: "Personal info"
  },
  {
    id: "2",
    type: "WALLET_INFO",
    label: "Wallet info"
  },
  {
    id: "3",
    type: "STATISTICAL_INFO",
    label: "Statistical info"
  }
]

export const INFO_TYPE = {
  PERSONAL_INFO: "PERSONAL_INFO",
  WALLET_INFO: "WALLET_INFO",
  STATISTICAL_INFO: "STATISTICAL_INFO"
}

export const STEP_INFO_PERSONAL_ENUM = {
  full_name: "full_name",
  gender: "gender",
  birthday: "birthday",
  card_id: "card_id",
  address: "address"
}

export const STEP_ID_CARD_AUTHENTICATION_ENUM = {
  front_card_url: "front_card_url",
  back_card_url: "back_card_url"
}

export const STEP_FACE_AUTHENTICATION_ENUM = {
  face_url: "face_url"
}

export const APPROVAL_CCC_ERROR = {
  INCORRECT_PIN_CODE: `Incorrect pin code`,
  NOT_FOUND_USER: `User doesn't exist`,
  USER_ALREADY_EXIST: `User is already exist`
}
