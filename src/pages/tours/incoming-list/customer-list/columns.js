// ** Third Party Components
import React from "react"
import { Badge } from "reactstrap"
import { convertDateString } from "@src/utility/ConvertDate"
import { PAYMENT_STATUS } from "@constants/base-constant"

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

const renderPaymentStatus = (row) => {
  switch (row?.paymentStatus) {
    case PAYMENT_STATUS.NEW_REQUEST:
      return "New request"
    case PAYMENT_STATUS.DEPOSIT_ADVANCE:
      return "Deposit advance"
    case PAYMENT_STATUS.COMPLETED:
      return "Completed"
    default:
      break
  }
}

export const columns = ({ t }) => [
  {
    name: t("No."),
    width: "60px",
    cell: (row, index) => <div className="d-flex justify-content-left align-items-center text-primary">{index + 1}</div>
  },
  {
    name: t("Customer name"),
    width: "200px",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1">{row?.name}</p>
      </div>
    )
  },
  {
    name: t("Phone number"),
    width: "120px",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1">{row?.phone || 0}</p>
      </div>
    )
  },
  {
    name: t("Email"),
    minWidth: "120px",
    selector: (row) => row?.limit || 0
  },
  {
    name: "Payment status",
    width: "150px",
    selector: (row) => (
      <Badge className="text-capitalize" color={paymentStatusObjColor(row?.paymentStatus)} pill>
        {t(renderPaymentStatus(row))}
      </Badge>
    )
  },

  {
    name: t("Number of adults"),
    minWidth: "120px",
    selector: (row) => row?.adultTicket || 0
  },
  {
    name: t("Number of children"),
    minWidth: "120px",
    selector: (row) => row?.childTicket || 0
  },
  {
    name: "Payment date",
    width: "200px",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1">{convertDateString(row?.lastPaymentDate)}</p>
      </div>
    )
  }
]