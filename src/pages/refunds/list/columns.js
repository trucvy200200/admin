// ** Third Party Components
import React from "react"
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { MoreVertical, Check } from "react-feather"
import { convertTimeDate } from "@src/utility/ConvertDate"
import currencyFormat from "@src/utility/UtilityFormat"
import { FiSettings } from "react-icons/fi"
import { FaRegFileLines } from "react-icons/fa6"
import { PAYMENT_STATUS, ORDER_STATUS } from "@constants/base-constant"

const paymentStatusObjColor = (status) => {
  switch (status) {
    case PAYMENT_STATUS.NEW_REQUEST:
      return "light-info"
    case PAYMENT_STATUS.DEPOSIT_ADVANCE:
      return "light-warning"
    case PAYMENT_STATUS.COMPLETED:
      return "light-success"
    default:
      break
  }
}

const orderStatusObjColor = (status) => {
  switch (status) {
    case ORDER_STATUS.WAITING_CONFIRM:
      return "light-warning"
    case ORDER_STATUS.REFUND_COMPLETED:
    case ORDER_STATUS.COMPLETED:
      return "light-success"
    case ORDER_STATUS.CANCELLED:
    case ORDER_STATUS.CANCELLED_BY_ADMIN:
      return "light-danger"
    default:
      break
  }
}

const renderOrderStatus = (row) => {
  switch (row?.orderStatus) {
    case ORDER_STATUS.WAITING_CONFIRM:
      return "Waiting confirm"
    case ORDER_STATUS.REFUND_COMPLETED:
      return "Refund completed"
    case ORDER_STATUS.CANCELLED:
      return "Cancelled by customer"
    case PAYMENT_STATUS.COMPLETED:
      return "Completed"
    case ORDER_STATUS.CANCELLED_BY_ADMIN:
      return "Cancelled by admin"
    default:
      break
  }
}

export const columns = ({ t, handleCompleteRefund }) => [
  {
    name: t("No."),
    width: "250px",
    cell: (row, index) => <div className="d-flex justify-content-left align-items-center text-primary">{row?.idOder}</div>
  },
  {
    name: "Payment code",
    width: "250px",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1 text-primary">{row?.paymentId && row?.paymentId !== "null" ? row?.paymentId : "---"}</p>
      </div>
    )
  },
  {
    name: "Order status",
    minWidth: "200px",
    center: "true",
    selector: (row) => (
      <Badge className="text-capitalize" color={orderStatusObjColor(row?.orderStatus)} pill>
        {t(renderOrderStatus(row))}
      </Badge>
    )
  },
  {
    name: "Full name",
    minWidth: "150px",
    cell: (row) => row?.fullName || "---"
  },
  {
    name: "Payment account",
    minWidth: "200px",
    selector: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 break-all text-wrap">{row?.paymentAccount && row?.paymentAccount !== "null" ? row?.paymentAccount : "---"}</p>
      </div>
    )
  },
  {
    name: "Refund amount",
    minWidth: "200px",
    selector: (row) => <div className="text-wrap">{currencyFormat(row?.refundAmount)} VND</div>
  },
  {
    name: (
      <div>
        <span className="desktop">{t("Action")}</span>
        <FiSettings size={16} className="mobile" />
      </div>
    ),
    minWidth: "100px",
    center: true,
    cell: (row) => (
      <>
        <UncontrolledDropdown>
          {row?.orderStatus === ORDER_STATUS.CANCELLED ||
            (row?.orderStatus === ORDER_STATUS.CANCELLED_BY_ADMIN && (
              <>
                <DropdownToggle tag="div" className="btn btn-sm">
                  <MoreVertical size={16} className="cursor-pointer" />
                </DropdownToggle>
                <DropdownMenu container="root">
                  <DropdownItem className="w-100" onClick={() => handleCompleteRefund({ status: true, id: row?.idOder })}>
                    <Check size={16} className="mr-50" />
                    <span className="align-middle">Complete</span>
                  </DropdownItem>
                </DropdownMenu>
              </>
            ))}
        </UncontrolledDropdown>
      </>
    )
  }
]
