import { PERMISSION_SCREEN_ENUM } from "@constants/permission-screens-constant"

export const NOTIFY_TYPE = {
  NEW_KYC: "NEW_KYC",
  UPDATE_KYC: "UPDATE_KYC",
  NEW_TICKET: "NEW_TICKET",
  COMPLETED_TICKET: "COMPLETED_TICKET",
  CANCELLED_TICKET: "CANCELLED_TICKET",
  PROCESSING_TICKET: "PROCESSING_TICKET",
  NEW_TICKET_USER: "NEW_TICKET_USER",
  NEW_TICKET_COMMENT_ADMIN: "NEW_TICKET_COMMENT_ADMIN",
  NEW_TICKET_COMMENT: "NEW_TICKET_COMMENT",
  ASSIGN_TICKET_USER: "ASSIGN_TICKET_USER",
  COMPLETED_TICKET_USER_BY_USER: "COMPLETED_TICKET_USER_BY_USER",
  NEW_DEPOSIT_USER: "NEW_DEPOSIT_USER",
  NEW_WITHDRAW_USER: "NEW_WITHDRAW_USER",
  REJECTED_TICKET: "REJECTED_TICKET",
  NEW_TICKET_NEED_IT_SUPPORT_APPROVAL: "NEW_TICKET_NEED_IT_SUPPORT_APPROVAL",
  ASSIGN_TICKET: "ASSIGN_TICKET",
  NEW_REQUEST_REJECT_ENTERPRISE: "NEW_REQUEST_REJECT_ENTERPRISE"
}

export const NOTIFY_STATUS = {
  READ: "READ",
  UNREAD: "UNREAD"
}

export const NOTIFY_STATUS_OPTIONS = [
  {
    type: "",
    label: "All",
    color: "success"
  },
  {
    type: "READ",
    label: "Read",
    color: "silver"
  },
  {
    type: "UNREAD",
    label: "Unread",
    color: "primary"
  }
]

export const NOTIFY_TYPE_OPTIONS = [
  {
    type: "",
    label: "All",
    resource: PERMISSION_SCREEN_ENUM.dashboard
  },
  {
    type: NOTIFY_TYPE.NEW_KYC,
    label: "KYC registration",
    resource: PERMISSION_SCREEN_ENUM.customer_approval
  },
  {
    type: NOTIFY_TYPE.UPDATE_KYC,
    label: "Re-submission of KYC registration",
    resource: PERMISSION_SCREEN_ENUM.customer_approval
  },
  {
    type: NOTIFY_TYPE.NEW_REQUEST_REJECT_ENTERPRISE,
    label: "New report from Customer Care Center",
    resource: PERMISSION_SCREEN_ENUM.enterprise_approval
  },
  {
    type: NOTIFY_TYPE.NEW_TICKET,
    label: "New ticket",
    resource: PERMISSION_SCREEN_ENUM.my_ticket_admin
  },
  {
    type: NOTIFY_TYPE.PROCESSING_TICKET,
    label: "Ticket accepted",
    resource: PERMISSION_SCREEN_ENUM.admin
  },
  {
    type: NOTIFY_TYPE.COMPLETED_TICKET,
    label: "Ticket processed",
    resource: PERMISSION_SCREEN_ENUM.admin
  },
  {
    type: NOTIFY_TYPE.CANCELLED_TICKET,
    label: "Ticket cancelled",
    resource: PERMISSION_SCREEN_ENUM.admin
  },
  {
    type: NOTIFY_TYPE.REJECTED_TICKET,
    label: "Ticket rejected",
    resource: PERMISSION_SCREEN_ENUM.admin
  },
  {
    type: NOTIFY_TYPE.NEW_TICKET_USER,
    label: "New support request",
    resource: PERMISSION_SCREEN_ENUM.ticket_user_management
  },
  {
    type: NOTIFY_TYPE.NEW_TICKET_COMMENT_ADMIN,
    label: "New ticket comment",
    resource: PERMISSION_SCREEN_ENUM.ticket_user_management
  },
  {
    type: NOTIFY_TYPE.ASSIGN_TICKET_USER,
    label: "Assign user ticket",
    resource: PERMISSION_SCREEN_ENUM.ticket_user_management
  },
  {
    type: NOTIFY_TYPE.NEW_WITHDRAW_USER,
    label: "New withdrawal order",
    resource: PERMISSION_SCREEN_ENUM.deposit_withdraw_review
  },
  {
    type: NOTIFY_TYPE.NEW_DEPOSIT_USER,
    label: "New deposit order",
    resource: PERMISSION_SCREEN_ENUM.deposit_withdraw_review
  }
]
