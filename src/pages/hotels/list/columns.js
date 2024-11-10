// ** Third Party Components
import React from "react"
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { MoreVertical, Edit, Check, X } from "react-feather"
import { Link } from "react-router-dom"
import { convertTimeDate } from "@src/utility/ConvertDate"
import currencyFormat from "@src/utility/UtilityFormat"
import { FiSettings } from "react-icons/fi"

const statusObjColor = (status) => {
  switch (status) {
    case 0:
      return "light-success"
    case 1:
      return "light-warning"
    default:
      break
  }
}

const renderStatus = (row) => {
  switch (row?.delFlg) {
    case 0:
      return "Active"
    case 1:
      return "Inactive"
    default:
      break
  }
}
export const columns = ({ t, handleEditHotel, handleDeleteHotel }) => [
  {
    name: t("No."),
    width: "250px",
    cell: (row, index) => <div className="d-flex justify-content-left align-items-center text-primary">{row?.id}</div>
  },
  {
    name: t("Hotel name"),
    width: "200px",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-truncate-1">{row?.hotelName || "---"}</p>
      </div>
    )
  },
  {
    name: t("Location"),
    width: "150px",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center flex-column">
        <p className="w-100 mb-0 text-wrap">{row?.location || "---"}</p>
      </div>
    )
  },
  {
    name: t("Star rating"),
    minWidth: "200px",
    center: "true",
    selector: (row) => <div>{row?.starRating}</div>
  },
  {
    name: "Price per night (VND)",
    minWidth: "210px",
    selector: (row) => <div className="d-flex justify-content-left align-items-center">{currencyFormat(row.pricePerNight)} VND</div>
  },
  {
    name: t("Address"),
    minWidth: "200px",
    selector: (row) => <div className="text-wrap">{row?.address || "---"}</div>
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
            <DropdownItem className="w-100" onClick={() => handleDeleteHotel({ status: true, id: row?.id })}>
              <X size={16} className="mr-50" />
              <span className="align-middle">{t("Remove")}</span>
            </DropdownItem>
            <DropdownItem className="w-100" onClick={() => handleEditHotel({ status: true, data: row })}>
              <Edit size={16} className="mr-50" />
              <span className="align-middle">{t("Edit")}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </>
    )
  }
]
