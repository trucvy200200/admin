// ** Third Party Components
import React from "react"
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { MoreVertical, Edit, Check, X } from "react-feather"
import { convertDateString } from "@src/utility/ConvertDate"
import { FiSettings } from "react-icons/fi"

const statusObjColor = (status) => {
  switch (status) {
    case 1:
      return "light-success"
    case 0:
      return "light-warning"
    default:
      return "light-warning"
  }
}

const renderStatus = (row) => {
  switch (row?.isApprove) {
    case 1:
      return "Approved"
    case 0:
      return "Pending"
    default:
      return "Pending"
  }
}
export const columns = ({ t, navigate, handleDeleteTour, handleApproveTour }) => [
  {
    name: t("No."),
    width: "250px",
    cell: (row, index) => <div className="d-flex justify-content-left align-items-center text-primary">{row?.id}</div>
  },
  {
    name: t("Tour name"),
    width: "200px",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1">{row?.name}</p>
      </div>
    )
  },
  {
    name: t("Buy slot"),
    width: "120px",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1">{row?.buySlot || 0}</p>
      </div>
    )
  },
  {
    name: t("Slot limit"),
    minWidth: "120px",
    selector: (row) => row?.limit || 0
  },
  {
    name: t("Status"),
    minWidth: "200px",
    center: "true",
    selector: (row) => (
      <Badge className="text-capitalize" color={statusObjColor(row?.isApprove)} pill>
        {t(renderStatus(row))}
      </Badge>
    )
  },
  {
    name: "Departure date",
    width: "200px",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1">{convertDateString(row?.estimatedTime)}</p>
      </div>
    )
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
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={16} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu container="root">
            {(row?.delFlg === 1 || !row?.buySlot) && (
              <DropdownItem
                className="w-100"
                onClick={() => {
                  handleApproveTour({ status: true, id: row?.id })
                }}
              >
                <Check size={16} className="mr-50" />
                <span className="align-middle">{t("Approve")}</span>
              </DropdownItem>
            )}
            <DropdownItem className="w-100" onClick={() => {}}>
              <X size={16} className="mr-50" />
              <span className="align-middle">{t("Reject")}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </>
    )
  }
]