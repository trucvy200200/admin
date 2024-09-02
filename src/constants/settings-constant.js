export const TABS_HEADER_TERMS = [
  {
    id: 1,
    type: "REGISTER",
    label: "Register as a user"
  },
  {
    id: 2,
    type: "STARTUP",
    label: "Register a Startup package"
  },
  {
    id: 3,
    type: "COLLABORATOR",
    label: "Become a Collaborator"
  },
  {
    id: 4,
    type: "WITHDRAWAL",
    label: "Withdrawal note"
  }
  /*{
    id: 5,
    type: "REGISTER_ENTERPRISE",
    label: "Enterprise register"
  }*/
]

export const TABS_HEADER_TICKET = [
  {
    id: 1,
    type: "UPDATE_USER",
    label: "Update user"
  },
  {
    id: 2,
    type: "SYSTEM_ISSUE",
    label: "System issue"
  },
  {
    id: 3,
    type: "DEPOSIT",
    label: "Deposit"
  }
]

export const TABS_HEADER_PRODUCT_NOTES = [
  {
    id: 1,
    type: "FOREX_PENDING_DESC",
    label: "Description waiting FX confirmation"
  },
  {
    id: 2,
    type: "FOREX_REGISTER_SUCCESS_DES",
    label: "Description registered FX product"
  },
  {
    id: 3,
    type: "CRYPTO_PENDING_DESC",
    label: "Description waiting CRT confirmation"
  },
  {
    id: 4,
    type: "CRYPTO_REGISTER_SUCCESS_DES",
    label: "Description registered CRT product"
  }
]

export const TERMS_TYPE = {
  REGISTER: "REGISTER",
  STARTUP: "STARTUP",
  COLLABORATOR: "COLLABORATOR",
  WITHDRAWAL: "WITHDRAWAL"
}

export const REASON_TYPE = {
  WITHDRAWAL: "WITHDRAWAL",
  TRANSFER: "TRANSFER",
  CUSTOMER_CARE_PAYMENT: "CUSTOMER_CARE_PAYMENT",
  REJECT_KYC: "REJECT_KYC",
  REJECT_ENTERPRISE: "REJECT_ENTERPRISE",
  REJECT_WITHDRAW: "REJECT_WITHDRAW",
  TICKET_USER: "TICKET_USER",
  REJECT_ENTERPRISE_PRODUCT: "REJECT_ENTERPRISE_PRODUCT",
  DELETE_USER: "DELETE_USER",
  OTHER: "other"
}

export const TABS_HEADER_REASON = [
  {
    id: "1",
    type: REASON_TYPE.WITHDRAWAL,
    label: "Withdraw"
  },
  {
    id: "2",
    type: REASON_TYPE.TRANSFER,
    label: "Transfer"
  },
  {
    id: "3",
    type: REASON_TYPE.REJECT_WITHDRAW,
    label: "Reject withdraw"
  },
  {
    id: "4",
    type: REASON_TYPE.REJECT_KYC,
    label: "Reject KYC"
  },
  {
    id: "5",
    type: REASON_TYPE.TICKET_USER,
    label: "Ticket user"
  },
  {
    id: "6",
    type: REASON_TYPE.DELETE_USER,
    label: "Delete user"
  }
]

export const TABS_HEADER_ENTERPRISE_REASON = [
  {
    id: "1",
    type: "CUSTOMER_CARE_PAYMENT",
    label: "Payment to CC center"
  },
  {
    id: "2",
    type: "REJECT_ENTERPRISE",
    label: "Reject enterprise"
  },
  {
    id: "3",
    type: "REJECT_ENTERPRISE_PRODUCT",
    label: "Reject enterprise product"
  }
]

export const LANG_CONSTANT = {
  en: 1,
  vi: 2
}

export const DEFAULT_REASON = {
  valueVi: null,
  valueEn: null
}

export const DEFAULT_INDUSTRY = {
  valueVi: null,
  valueEn: null
}

export const REVIEW_TYPE = {
  STARS: "STARS",
  OPINION: "OPINION"
}

export const TYPE_STARS = {
  TIME: "TIME",
  FELLING: "FELLING"
}

export const FACE_RECOGNITION_TYPE = {
  COMPULSORY: "COMPULSORY",
  OPTIONAL: "OPTIONAL"
}

export const USER_POINT_MANAGEMENT_SORT_TYPE = [
  {
    label: "Total deposit",
    value: "totalDeposit"
  },
  {
    label: "Total purchase",
    value: "totalPurchase"
  },
  {
    label: "Total profit",
    value: "totalIncome"
  },
  {
    label: "Total withdraw",
    value: "totalWithdraw"
  },
  {
    label: "Total commission",
    value: "totalCommission"
  },
  {
    label: "Total transfer",
    value: "totalTransfer"
  },
  {
    label: "Total received transfer",
    value: "totalReceivedTransfer"
  },
  {
    label: "Total allowed withdraw (original)",
    value: "withdrawOrigin"
  },
  {
    label: "Total allowed withdraw (currently)",
    value: "withdrawAllowed"
  }
]

export const SORT_DIRECTION = [
  {
    label: "Ascending",
    value: "ASC"
  },
  {
    label: "Decrease",
    value: "DESC"
  }
]

export const DEFAULT_WARNING = {
  valueVi: null,
  valueEn: null
}

export const TABS_HEADER_WARNING = [
  {
    id: "1",
    type: "TICKET_USER",
    label: "Ticket user"
  }
]

export const WARNING_TYPE = {
  TICKET_USER: "TICKET_USER"
}

export const COMPLAIN_REASON_TYPE = {
  ENTERPRISE_PRODUCT_ORDER: "ENTERPRISE_PRODUCT_ORDER"
}

export const WITHDRAW_MANAGEMENT_SORT_TYPE = [
  {
    label: "Total allowed withdraw (currently)",
    value: "withdrawAllowed"
  },
  {
    label: "Total allowed withdraw (original)",
    value: "withdrawOrigin"
  }
]

export const COUNTRY_ALLOW_CSKH = {
  ALLOW: "ALLOW",
  DISALLOWANCE: "DISALLOWANCE"
}

export const WALLET_TRANSFER_ENUM = {
  AMOUNT: "AMOUNT",
  AMOUNT_USE_LEVEL: "AMOUNT_USE_LEVEL"
}

export const WALLET_TRANSFER_OPTIONS = [
  { label: "Main wallet", value: WALLET_TRANSFER_ENUM.AMOUNT },
  { label: "Level up wallet", value: WALLET_TRANSFER_ENUM.AMOUNT_USE_LEVEL }
]
