import { STATUS_ENUM } from "@constants/users-constant"

export const renderUserStatus = (value) => {
  switch (value) {
    case STATUS_ENUM.NOT_VERIFY:
      return "Not verified"
    case STATUS_ENUM.NOT_KYC:
      return "Not KYC"
    case STATUS_ENUM.WAITING_CONFIRMATION:
      return "Waiting confirmation"
    case STATUS_ENUM.REJECT_KYC:
      return "Reject KYC"
    case STATUS_ENUM.ACTIVE:
      return "Active"
    case STATUS_ENUM.BLOCKED:
      return "Blocked"
    case STATUS_ENUM.SUSPEND:
      return "Suspended"
    default:
      return "All"
  }
}

export const renderUserStatusColor = (status) => {
  switch (status) {
    case STATUS_ENUM.NOT_VERIFY:
      return "light-secondary"
    case STATUS_ENUM.NOT_KYC:
      return "light-info"
    case STATUS_ENUM.WAITING_CONFIRMATION:
      return "light-warning"
    case STATUS_ENUM.REJECT_KYC:
    case STATUS_ENUM.BLOCKED:
    case STATUS_ENUM.SUSPEND:
      return "light-danger"
    case STATUS_ENUM.ACTIVE:
      return "light-success"
    default:
      break
  }
}

export const multiplyByNumber = (number1, number2) => {
  const number1List = number1.toString().split('.')
  if (number1List?.[1]) {
    return number1List[0] * number2 + number1List[1] * (number2 / (Math.pow(10, number1List[1].length)))
  } else {
    return number1List[0] * number2
  }
}

export const renderWithdrawLimit = (data, type) => {
  const transferDifference = (+data?.totalTransfer || 0) - (+data?.totalReceivedTransfer || 0)
  const total = +data?.[type] - (transferDifference > 0 ? transferDifference : 0)
  if (type === "withdrawAllowed" && total <= 0) return 0
  return total
}